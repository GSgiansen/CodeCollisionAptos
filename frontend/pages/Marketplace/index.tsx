import { useState } from "react";
import BuyPage from "./BuyPage";
import SellPage from "./SellPage";

function Marketplace() {
    const [isBuying, setIsBuying] = useState(true);

    return (
        <div>
            <h1>Marketplace</h1>
            <button onClick={() => setIsBuying(true)}>Buy</button>
            <br />
            <button onClick={() => setIsBuying(false)}>Sell</button>
            {isBuying
            ? <BuyPage /> 
            : <SellPage />}
        </div>
    )
}

export default Marketplace;