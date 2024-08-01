import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { WalletSelector } from "@/components/WalletSelector";
import { buttonVariants } from "@/components/ui/button";
import Sidebar from "./Sidebar";

interface LaunchpadHeaderProps {
  title: string;
}

export const LaunchpadHeader: FC<LaunchpadHeaderProps> = ({ title }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="bg-techno-header">
        <div className="header-container flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
          <button
            className="header-sidebar-btn"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className="display flex-grow mx-4">
            {title}
          </h1>
          <div className="flex gap-2 items-center flex-wrap">
            <Link className="header-link" to={"/"}>
              Home
            </Link>
            {location.pathname === "/create-collection" ? (
              <Link className="header-link" to={"/my-collections"}>
                My Concerts
              </Link>
            ) : (
            <Link className="header-link" to={"/create-collection"}>
              Create Concert
            </Link>
          )}
            <WalletSelector />
          </div>
        </div>
      </div>
      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
    </>
  );
};
