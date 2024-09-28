import { useEffect, useState } from "react";
import TicketCard from "@/pages/Tickets/TicketCard";
import { useWallet, WalletContextState } from "@aptos-labs/wallet-adapter-react";
import { Header } from "@/components/Header";
import { aptosClient } from "@/utils/aptosClient";
import { getEventsAndTickets } from "@/hooks/getEventsAndTickets";
import { Spinner } from "@/components/ui/spinner";
import { UploadSpinner } from "@/components/UploadSpinner";
import { cn } from "@/lib/utils";


export function Tickets() {
  const wallet = useWallet();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  useEffect(() => {
    async function fetchTickets() {
      if (wallet?.account?.address) {
        const data = await getEventsAndTickets(wallet);
        setTickets(data.tickets); // Corrected the data setting
        setLoading(false); // Set loading to false after data is fetched
      }
    }

    fetchTickets();
  }, [wallet, wallet.account?.address]);

  // Show a loading state while the wallet is not ready or the tickets are being fetched
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
    )
  }

  return (
    <>
      <Header />
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
