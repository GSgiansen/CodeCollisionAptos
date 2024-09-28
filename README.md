## **Aptos TicketMaster**

### Presented by **xDraco**

#### Team Members: *Kwoh Jin Yuan, Tan Gian Sen, Kang Yue Hern, Lucius Pua*

## Submission for **Code Collision Hackathon: NFTs, Social, Gaming**

GitHub repo link:
https://github.com/GSgiansen/CodeCollisionAptos

Deployment link:
https://aptosticketmaster.netlify.app/


## Project details:

Aptos Ticketmaster emulates event ticketing through NFTs and blockchain technology. The primary goal is to elevate **security** and **transparency** in ticket sales and event entry verification. With the rise of scams and frauds, we hope to eliminate ticket fraud, streamline ticket transfers, and ensure **verifiable ownership**. We hope to make the on board process for individuals or companies seamless so as to reduce barrier of entry for the usage of NFTs, thereby promoting the change and swap to web3. Key features include the creation of unique NFT tickets, secure and transparent ownership records on the blockchain, and a real-time verification system that confirms ticket validity and ownership on entry to the event. This cutting-edge approach promises a seamless, secure, and enjoyable experience for both organisers and attendees.

## Pitch Deck link:

https://docs.google.com/presentation/d/1ZSEmxDKo9P6htgfbCM3N12Npaus8NW7GnRM_nON5Ors/edit?usp=sharing

## Testing Instructions

1. Proceed to our website at https://aptosticketmaster.netlify.app
2. Register your wallet of choice using our connect button (Petra preferred!)
3. Browse through our collection of concerts by viewing the latest concerts available .
4. Proceed to mint the cocnert of your chopice with the category of tickets you wish to purchase!
5. Head to https://aptosticketmaster.netlify.app/tickets to view all the tickets you have!

## Setting up locally

1. Fork our repo at https://github.com/GSgiansen/CodeCollisionAptos
2. To the root of the folder add the following information to the env file

```
PROJECT_NAME=
VITE_APP_NETWORK=
VITE_COLLECTION_CREATOR_ADDRESS=
VITE_MODULE_ADDRESS=
VITE_MASTER_ACCOUNTS=
```

3. Run the commands `npm run move:init` and `npm run move:publish` to publish the master collection to the Aptos blockchain!
4. Run the command `npm run dev` to see Aptos Ticket Master!


## List of tech stack:

TypeScript, Move, Aptos TypeScript SDK, React, PetraWallet, Aptos Wallet Adapter, Vite, Supabase
