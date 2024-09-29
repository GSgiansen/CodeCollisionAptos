import { useEffect, useState } from "react";
import TicketCard from "@/pages/Tickets/TicketCard";
import { useWallet, WalletContextState } from "@aptos-labs/wallet-adapter-react";
import { Header } from "@/components/Header";
import { getEventsAndTickets } from "@/hooks/getEventsAndTickets";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function Tickets() {
  const wallet = useWallet();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    async function fetchTickets() {
      if (wallet?.account?.address) {
        const data = await getEventsAndTickets(wallet);
        setTickets(data.tickets); // Set the tickets
        setLoading(false); // Set loading to false after data is fetched
      } else {
        setLoading(false); // Stop loading if no wallet is connected
      }
    }

    fetchTickets();
  }, [wallet, wallet.account?.address]);

  // If the wallet is not connected, show the "Connect your wallet" message
  if (!wallet?.account?.address && !loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please connect your wallet</h1>
          <p className="text-gray-600 mt-2">To view your tickets, please connect your wallet.</p>
          {/* You can add a wallet connect button here if you have one */}
        </div>
      </div>
    );
  }

  // Show a loading state while the tickets are being fetched
  if (loading) {
    return (
      <div
        className={cn(
          "top-0 left-0 fixed w-full h-full bg-gray-500 bg-opacity-30 flex justify-center items-center flex-col transition-all"
        )}
      >
        <p className="display">Loading tickets</p>
        <Spinner size="lg" />
      </div>
    );
  }

  // Display tickets or a message if no tickets are found
  return (
    <>
      <div className="hero-container flex flex-col md:flex-col gap-6 px-4 max-w-screen-xl mx-auto w-full">
        {tickets.length > 0 ? (
          tickets.map((ticket) => <TicketCard key={ticket.id} {...ticket} />)
        ) : (
          <div>No tickets found</div>
        )}
      </div>
    </>
  );
}

export type Ticket = {
  event_id: string;
  event_name: string;
  id: string;
  owner: string;
  uri: string;
};
