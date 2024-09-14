import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import QRCode from "qrcode.react"; // Import QR code component
import { useEffect, useState } from "react";
import { Ticket } from "@/hooks/getEventsAndTickets";

const verifyTicket = (ticketID, metadata, wallet: ReturnType<typeof useWallet>) => {
  // Assuming wallet and ticket contain necessary information
  const walletAddress = wallet.account?.address || "";

  // Combine the data into a single string
  const qrData = JSON.stringify({
    metadata,
    ticketID,
    walletAddress,
  });

  // Here, we would display the QR code with the combined data.
  // This could be done by setting the state to show the QR code.
  return qrData;
};

const TicketCard = (ticket: Ticket) => {
  const [metadata, setMetadata] = useState<TicketMetadata | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null); // State to hold QR data
  const wallet = useWallet();
  
  interface TicketMetadata {
    image: string;
    external_url: string;
    attributes: { trait_type: string; value: string }[];
  }

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(ticket.uri);
        const data: TicketMetadata = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching ticket metadata:', error);
      }
    };

    fetchMetadata();
  }, [ticket.uri]);

  const dateAttribute = metadata.attributes.find(attribute => attribute.trait_type === "date");
  const dateValue = dateAttribute ? dateAttribute.value : null;

  const handleVerifyClick = () => {
    const qrData = verifyTicket(ticket.id, dateValue, wallet);
    setQrCodeData(qrData); // Set the QR code data when button is clicked
  };

  return (
    <Card>
      <CardHeader> 
        <CardTitle>{ticket.event_name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <img src={metadata?.image || "" } alt={ticket.event_name} className="w-64 h-64 object-cover rounded-lg p-4"/>
        <Button className="m-4" onClick={handleVerifyClick}>Verify Ticket</Button>

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
