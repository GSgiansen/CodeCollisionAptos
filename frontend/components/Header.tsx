import { useState } from "react";
import { Link } from "react-router-dom";
import { WalletSelector } from "./WalletSelector";
import { IS_DEV } from "@/constants";

export function Header() {
  return (
    <>
      <div className="bg-techno-header">
        <div className="header-container flex items-center px-4 py-2 max-w-screen-xl mx-auto w-full">
          <h1 className="display flex-grow mx-4">
            <Link to="/">Aptos Ticket Master</Link>
          </h1>
          <div className="flex gap-2 items-center ml-auto">
             (
              <>
                <Link className="header-link" to="/my-collections">
                  View Concerts
                </Link>
                <Link className="header-link" to="/marketplace">
                  Marketplace
                </Link>
                <Link className="header-link" to="/create-collection">
                  Contact Us
                </Link>
              </>
            )
            <WalletSelector />
          </div>
        </div>
      </div>
    </>
  );
}
