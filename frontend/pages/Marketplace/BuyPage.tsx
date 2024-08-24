import React, { useEffect, useState } from 'react';
import ListingCard from './components/ListingCard';
import supabase from './../../main';
import { Account, AccountAddress, Aptos, AptosConfig, Ed25519PrivateKey, SimpleTransaction } from '@aptos-labs/ts-sdk';
import { NETWORK, PRIVATEKEY } from '@/constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { aptosClient } from '@/utils/aptosClient';

function BuyPage() {
    const [listings, setListings] = useState([]);
    const wallet = useWallet();

    useEffect(() => {
        getListings();
    }, [listings]);

    const getListings = async () => {
        const { data, error } = await supabase
            .from('Listings')
            .select('*')
            .eq('sold', false);

        if (error) {
            console.error('Error fetching listings:', error);
        } else {
            setListings(data);
        }
    };

    // const aptos = new Aptos(new AptosConfig({network: NETWORK.TESTNET}));


    const sendNFT = async () => {
        
        const sender = Account.fromPrivateKey({
            privateKey: new Ed25519PrivateKey(PRIVATEKEY),
            // address: '0x1fca470880ba5d6d0d4b52dc0a7516c347db68561f13572ea2b0b15b249bc951',
            address: '0xb6f87b1760730a8d23c6115eb6c407166f22f5c7a9c070ee6255e2659baf66c1',
        })
        // console.log(sender)
        const tranx: Promise<SimpleTransaction> = aptosClient().transferDigitalAssetTransaction({
            sender: sender,
            digitalAssetAddress: '0xa8ea6b768303b2eafe8ab7e4d63aa377bbd10d57a556d7702a8f58ec5681f9e3',
            recipient: AccountAddress.fromString("0x9c4032bac151c80a73b0550a05eb9a6feb78f011470a18c280f3bc8f9694ace7"),
        })
        const transaction = await tranx;
        console.log(transaction)
        aptosClient().signAndSubmitTransaction({signer: sender, transaction})
    
        if (tranx) {
            console.log(tranx)
        }
    }

    const sendCoins = async () => {
        // console.log("private key", PRIVATEKEY)
        
        const sender = Account.fromPrivateKey({
            
            privateKey: new Ed25519PrivateKey(PRIVATEKEY),
            // address: '0x1fca470880ba5d6d0d4b52dc0a7516c347db68561f13572ea2b0b15b249bc951',
            address: '0xb6f87b1760730a8d23c6115eb6c407166f22f5c7a9c070ee6255e2659baf66c1',
        })
        // console.log(sender)
        const tranx: Promise<SimpleTransaction> = aptosClient().transferCoinTransaction({
            sender: '0xb6f87b1760730a8d23c6115eb6c407166f22f5c7a9c070ee6255e2659baf66c1',
            amount: 10000000,
            // digitalAssetAddress: '0xa8ea6b768303b2eafe8ab7e4d63aa377bbd10d57a556d7702a8f58ec5681f9e3',
            recipient: "0x9c4032bac151c80a73b0550a05eb9a6feb78f011470a18c280f3bc8f9694ace7",

        })
        const transaction = await tranx;
        console.log(transaction)
        aptosClient().signAndSubmitTransaction({signer: sender, transaction})
    
        if (tranx) {
            console.log(tranx)
        }
    }


    return (
        <div>
            <div>
                {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
            <button onClick={sendNFT}>send nft to jy</button>
            <br/>
            <button onClick={sendCoins}>send coins to jy </button>
        </div>
    )
}

export default BuyPage;