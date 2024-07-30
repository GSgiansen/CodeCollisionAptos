import { Ticket } from "./getEventsAndTickets"
import { useWallet } from "@aptos-labs/wallet-adapter-react"


export const verifyTicket = (ticket: Ticket, wallet) => {
    const isOwner = (ticket: Ticket) => {
      return wallet.account?.address === ticket.owner
    }

    if (!isOwner(ticket)) {
      alert("You are not the owner of this ticket")
    }
    else {
      alert("Ticket Verified");
    }
  }