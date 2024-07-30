// @ts-nocheck
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { useState, useEffect } from "react";
import { aptosClient } from "@/utils/aptosClient";
import { WalletContextState } from "@aptos-labs/wallet-adapter-react";
/**
 * A react hook to get all events created by main account.
 *
 * This call can be pretty expensive when fetching a big number of collections,
 * therefore it is not recommended to use it in production
 *
 */
export async function getEventsAndTickets(wallet: WalletContextState) {
  // const [events, setEvents] = useState<Array<Event>>([]);
  // const [tickets, setTickets] = useState<Array<Ticket>>([]);

  // useEffect(() => {
    // async function run() {
      // fetch the contract registry address
      const registry = await getRegistry();
      // fetch collections objects created under that contract registry address
      const objects = await getObjects(registry);
      // get each collection object data
      const events = await getEvents(objects);
      // setEvents(events);

      const tickets = await getTickets(events, wallet);
      // setTickets(tickets)
    // }

  //   run();
  // }, []);

  return {events, tickets};
}

const getRegistry = async () => {
  const registry = await aptosClient().view<[[{ inner: string }]]>({
    payload: {
      function: `${AccountAddress.from(import.meta.env.VITE_MODULE_ADDRESS)}::launchpad::get_registry`,
    },
  });
  return registry[0];
};

const getObjects = async (registry: [{ inner: string }]) => {
  const objects = await Promise.all(
    registry.map(async (register: { inner: string }) => {
      const formattedRegistry = AccountAddress.from(register.inner).toString();
      const object = await aptosClient().getObjectDataByObjectAddress({
        objectAddress: formattedRegistry,
      });

      return object.owner_address;
    }),
  );
  return objects;
};

const getEvents = async (objects: Array<string>) => {
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
        image_uri: collection.cdn_asset_uris!.cdn_animation_uri!,
        creator_addr: collection.creator_address,
        current_supply: collection.current_supply,
        max_supply: collection.max_supply,
      };

      return event;
    }),
  );
  
  return events;
};

const getTickets = async (events: Event[], wallet: WalletContextState) => {
  const tokens = await aptosClient().getOwnedDigitalAssets({
    ownerAddress: wallet.account!.address,
  });
  const events_id = events.map((event) => event.id);
  const filteredTokens = tokens.filter((token) => events_id.includes(token.current_token_data!.collection_id));
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
}

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