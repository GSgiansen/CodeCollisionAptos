import { useEffect, useState } from "react";
import { getEventsAndTickets, Ticket } from "@/hooks/getEventsAndTickets";
import TicketCard from "@/pages/Tickets/TicketCard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function Tickets() {
  const wallet = useWallet(); // Ensure this is directly within the functional component
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    async function fetchTickets() {
      if (wallet) {
        const data = await getEventsAndTickets(wallet);
        setTickets(data.tickets);
      }
    }

    fetchTickets();
  }, [wallet]);

  return (
    <div className="hero-container flex flex-col md:flex-col gap-6 px-4 max-w-screen-xl mx-auto w-full">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} {...ticket} />
      ))}
    </div>
  );
}