import { useState } from "react";
import { Link } from "react-router-dom";
import { WalletSelector } from "./WalletSelector";
import { IS_DEV } from "@/constants";
import Sidebar from "./Sidebar";

export function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="bg-techno-header">
        <div className="header-container flex items-center px-4 py-2 max-w-screen-xl mx-auto w-full">
          <button
            className="header-sidebar-btn"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className="display flex-grow mx-4">
            <Link to="/">Aptos Ticket Master</Link>
          </h1>
        </div>
      </div>
      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
    </>
  );
}
