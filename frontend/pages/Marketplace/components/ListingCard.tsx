import supabase from "@/main";

function ListingCard({ listing }) {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            margin: '8px',
            backgroundColor: '#fff'}}>
            <h2>{listing.name}</h2>
            <p>{listing.token_id}</p>
            <p>Price: {listing.price}</p>
            <button onClick={async () => await BuyNFT(listing)}>Buy</button>
        </div>
    );
}

const BuyNFT = async (listing) => {
    const { error } = await supabase
        .from('Listings')
        .update({'sold': true})
        .eq('id', listing.id)
}


export default ListingCard;
