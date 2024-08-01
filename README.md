## **Aptos TicketMaster**

### Presented by **xDraco**

#### Team Members: *Kwoh Jin Yuan, Tan Gian Sen, Kang Yue Hern, Lucius Pua*

## Submission for **Move on Aptos Hackathon: NFTs, Social, Gaming**

GitHub repo link:
https://github.com/GSgiansen/Aptos24

Deployment link:

http://188.166.209.236:3000


## Project details:

Aptos Ticketmaster emulates event ticketing through NFTs and blockchain technology. The primary goal is to elevate security and transparency in ticket sales and event entry verification. With the rise of scams and frauds, we hope to eliminate ticket fraud, streamline ticket transfers, and ensure verifiable ownership. Key features include the creation of unique NFT tickets, secure and transparent ownership records on the blockchain, and a real-time verification system that confirms ticket validity and ownership on entry to the event. This cutting-edge approach promises a seamless, secure, and enjoyable experience for both organisers and attendees.

## Pitch Deck link:

https://docs.google.com/presentation/d/1ZSEmxDKo9P6htgfbCM3N12Npaus8NW7GnRM_nON5Ors/edit?usp=sharing

## Testing Instructions

1. Proceed to our website at http://188.166.209.236:3000
2. Register your wallet of choice using our connect button
3. Browse through our collection of concerts and choose one to purchase by minting that NFT
4. Head to http://188.166.209.236:3000/tickets to view all the tickets you have!

## Setting up locally

1. Fork our repo at https://github.com/GSgiansen/Aptos24
2. To the aptosticketmaster folder add env file of this format

```
PROJECT_NAME=
VITE_APP_NETWORK=
VITE_COLLECTION_CREATOR_ADDRESS=
VITE_MODULE_ADDRESS=
VITE_MASTER_ACCOUNTS=
```

3. Run the commands `npm run move:init` and `npm run move:publish`
4. Run the command `npm run dev` to see Aptos Ticket Master!


## List of tech stack:

TypeScript, Move, Aptos TypeScript SDK, React, PetraWallet, Aptos Wallet Adapter, Vite
