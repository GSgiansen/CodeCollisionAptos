import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { Ticket } from "@/hooks/getEventsAndTickets";

// QR Code generation function
const verifyTicket = (ticketID: string, metadata: string | null, wallet: ReturnType<typeof useWallet>) => {
  const walletAddress = wallet.account?.address || "";

  // Combine the data into a single string for QR code
  const qrData = JSON.stringify({
    metadata,
    ticketID,
    walletAddress,
  });

  return qrData;
};

// TicketCard Component
const TicketCard = (ticket: Ticket) => {
  const [metadata, setMetadata] = useState<TicketMetadata | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null); // State for QR code data
  const wallet = useWallet();

  interface TicketMetadata {
    image: string;
    external_url: string;
    attributes: { trait_type: string; value: string }[];
  }

  // Fetch metadata when the component mounts or when the ticket URI changes
  useEffect(() => {
    const fetchMetadata = async () => {
      if (!ticket.uri) return; // Handle empty URIs
      try {
        const response = await fetch(ticket.uri);
        const data: TicketMetadata = await response.json();
        setMetadata(data); // Set the fetched metadata
      } catch (error) {
        console.error('Error fetching ticket metadata:', error);
      }
    };

    fetchMetadata();
  }, [ticket.uri]);

  // Safely find the "date" attribute from the metadata
  const dateAttribute = metadata?.attributes?.find(attribute => attribute.trait_type === "date");
  const dateValue = dateAttribute ? dateAttribute.value : "No date available";

  // Handle the verification and generate the QR code data
  const handleVerifyClick = () => {
    if (!metadata) {
      console.error("Metadata is missing");
      return;
    }
    const qrData = verifyTicket(ticket.id, dateValue, wallet);
    setQrCodeData(qrData); // Set the QR code data
  };

  return (
    <Card>
      <CardHeader> 
        <CardTitle>{ticket.event_name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <img
          src={metadata?.image || ""} // Safely access image
          alt={ticket.event_name}
          className="w-64 h-64 object-cover rounded-lg p-4"
        />
        <div>
          <p>Date: {dateValue}</p> {/* Display the date */}
        </div>
        <Button className="m-4" onClick={handleVerifyClick}>
          Verify Ticket
        </Button>

        {/* Show QR code if data is available */}
        {qrCodeData && (
          <div className="mt-4">
            <QRCode value={qrCodeData} size={256} /> {/* QR code size can be adjusted */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketCard;
