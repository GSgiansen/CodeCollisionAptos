import { FC } from "react";
import { Link } from "react-router-dom";
import { WalletSelector } from "./WalletSelector";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onClose }) => {
  return (
    <div className="sidebar">
      <button className="sidebar-close-btn" onClick={onClose}>
        ×
      </button>
      <nav className="sidebar-nav">
        <Link className="sidebar-link" to="/my-profile" onClick={onClose}>
          My Profile
        </Link>
        <Link className="sidebar-link" to="/my-collections" onClick={onClose}>
          View Concerts
        </Link>
        <Link className="sidebar-link" to="/marketplace" onClick={onClose}>
          Marketplace
        </Link>

        <Link className="sidebar-link" to="/create-collection" onClick={onClose}>
          Contact Us
        </Link>
        <WalletSelector />
      </nav>
    </div>
  );
};

export default Sidebar;
