import { useLocation, useParams } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assume you have a Button component
import { CAS, TS_ERA } from "./EventType";
import { HeroSection } from "../Mint/components/HeroSection";

const EventDetail = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const { event } = location.state || {}; 

  console.log("in event details", eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  const handlePurchase = () => {
    alert(`Purchasing tickets for ${event.name}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 10 }}
      className="max-w-4xl mx-auto p-4"
    >
      <HeroSection id={eventId}/>
    </motion.div>
  );
};

export default EventDetail;
