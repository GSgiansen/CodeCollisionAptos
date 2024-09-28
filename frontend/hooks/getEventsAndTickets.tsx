// @ts-nocheck
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";
import { WalletContextState } from "@aptos-labs/wallet-adapter-react";

/**
 * A function to fetch events and tickets related to the specific events.
 * Fetches events first, then filters tickets based on the events.
 */
export async function getEventsAndTickets(wallet: WalletContextState) {
  try {
    // Fetch the contract registry address
    const registry = await getRegistry();

    // Fetch collection objects created under that contract registry address
    const objects = await getObjects(registry);

    // Get each collection object data (events)
    const events = await getEvents(objects);

    // Fetch tickets only for the events presented
    const tickets = await getTicketsForEvents(events, wallet);

    return { events, tickets }; // Return both events and filtered tickets
  } catch (error) {
    console.error("Error fetching events and tickets:", error);
    return { events: [], tickets: [] }; // Return empty arrays in case of error
  }
}

// Helper function to fetch the registry data
const getRegistry = async () => {
  try {
    const registry = await aptosClient().view<[[{ inner: string }]]>({
      payload: {
        function: `${AccountAddress.from(import.meta.env.VITE_MODULE_ADDRESS)}::launchpad::get_registry`,
      },
    });
    return registry[0]; // Return the first registry
  } catch (error) {
    console.error("Error fetching registry:", error);
    throw error;
  }
};

// Helper function to fetch objects based on the registry
const getObjects = async (registry: [{ inner: string }]) => {
  try {
    const objects = await Promise.all(
      registry.map(async (register: { inner: string }) => {
        const formattedRegistry = AccountAddress.from(register.inner).toString();
        const object = await aptosClient().getObjectDataByObjectAddress({
          objectAddress: formattedRegistry,
        });

        return object.owner_address;
      })
    );
    return objects;
  } catch (error) {
    console.error("Error fetching objects:", error);
    throw error;
  }
};

// Helper function to fetch event data based on objects
const getEvents = async (objects: Array<string>) => {
  try {
    const events = await Promise.all(
      objects.map(async (object: string) => {
        const formattedObjectAddress = AccountAddress.from(object).toString();
        const collection = await aptosClient().getCollectionDataByCreatorAddress({
          creatorAddress: formattedObjectAddress,
        });

        const event: Event = {
          name: collection.collection_name,
          description: collection.description,
          id: collection.collection_id,
          image_uri: collection.cdn_asset_uris?.cdn_animation_uri || "",
          creator_addr: collection.creator_address,
          current_supply: collection.current_supply,
          max_supply: collection.max_supply,
          creator_address: collection.creator_address,
          collection_id: collection.collection_id,
          collection_name: collection.collection_name,
          cdn_asset_uris: collection.cdn_asset_uris || {},
        };

        return event;
      })
    );
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Helper function to fetch tickets based on events
const getTicketsForEvents = async (events: Event[], wallet: WalletContextState) => {
  const account = wallet?.account;

  if (!account || !account.address) {
    console.error("Wallet is not connected or account is unavailable.");
    return [];
  }

  try {
    // Fetch all tokens owned by the wallet address
    const tokens = await aptosClient().getOwnedDigitalAssets({
      ownerAddress: account.address,
    });

    // Extract the event IDs from the events
    const eventIds = events.map(event => event.id);

    // Filter tickets based on event IDs
    const filteredTokens = tokens.filter(token => eventIds.includes(token.current_token_data!.collection_id));

    // Map the filtered tokens into Ticket objects
    const tickets = filteredTokens.map((token) => {
      return {
        event_id: token.current_token_data!.collection_id,
        event_name: token.current_token_data!.current_collection!.collection_name,
        id: token.token_data_id,
        owner: token.owner_address,
        uri: token.current_token_data!.token_uri,
      };
    });

    return tickets;
  } catch (error) {
    console.error("Error fetching tickets for events:", error);
    throw error;
  }
};

export type Ticket = {
  event_id: string;
  event_name: string;
  id: string;
  owner: string;
  uri: string;
};

export type Event = {
  name: string;
  description: string;
  id: string;
  uri: string;
  creator_addr: string;
  current_supply: number;
  max_supply: number;
  creator_address: string;
  collection_id: string;
  collection_name: string;
  cdn_asset_uris: {
    cdn_animation_uri: string;
    cdn_image_uri: string;
  };
};
