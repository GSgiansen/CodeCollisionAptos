import React, { useEffect, useState } from 'react';
import ListingCard from './components/ListingCard';
import supabase from './../../main';

function BuyPage() {
    const [listings, setListings] = useState([]);

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

    return (
        <div>
            <div>
                {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    )
}

export default BuyPage;