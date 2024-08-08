import supabase from '@/main';
import { aptosClient } from '@/utils/aptosClient';
import { Account, Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { useWallet, WalletContextState } from '@aptos-labs/wallet-adapter-react';
import { useEffect, useState } from 'react';

function SellPage() {
    const wallet = useWallet();
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        async function fetchTickets() {
          if (wallet) {
            const tickets = await getTickets(wallet);
            setTickets(tickets);
          }
        }
    
        fetchTickets();
      }, [wallet]);

    return (
        <div>
            {tickets.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} {...wallet} />
            ))}
        </div>
    );
}

export default SellPage;

type Ticket = {
    id: string;
    name: string;
    // price: string;
};

type Event = {
    id: string;
    name: string;
}

function TicketCard(ticket: Ticket, wallet: WalletContextState) {
    return (
            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    maxWidth: '300px',
                    margin: '16px',
                    textAlign: 'center',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                }}
            >
                <h2>{ticket.name}</h2>
                <h3>{ticket.id}</h3>
                <button
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '16px',
                    }}
                    onClick={async () => await sellTicket(ticket, wallet)}
                >
                    View Ticket
                </button>
            </div>
        );
}

const getTickets = async (wallet: WalletContextState) => {
    const tokens = await aptosClient().getOwnedDigitalAssets({
        ownerAddress: wallet.account!.address,
    });

    const events_id = (await getEvents()).map((event) => event.id);
    const tickets = tokens.filter((token) => events_id.includes(token.current_token_data!.collection_id))
                        .map((token) => ({ id: token.token_data_id, 
                                        name: token.current_token_data!.current_collection!.collection_name }));

    return tickets;
}

const getEvents = async () => {
    const { data, error } = await supabase
        .from('Events')
        .select('*')
        .eq('finished', false);

    if (error) {
        console.error('Error fetching listings:', error);
    } else {
        return data.map((event) => ({
            id: event.collection_id,
            name: event.name
        }));
    }

    return data
}

const sellTicket = async (ticket: Ticket, wallet: WalletContextState) => {
    const { error } = await supabase
        .from('Listings')
        .insert(
            {
                name: ticket.name,
                price: 1,
                token_addr: ticket.id,
                sender_addr: "",
                sender_acc: ""
            }
        )

    if (error) {
        console.error('Error inserting listing:', error);
    }
}