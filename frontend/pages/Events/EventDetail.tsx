import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assume you have a Button component
import { CAS, TS_ERA } from "./EventType";
import { HeroSection } from "../Mint/components/HeroSection";

const EventDetail = () => {
  const { eventId } = useParams();

  const events = [
    CAS, TS_ERA
  ];

  console.log(eventId)

  const event = events.find((e) => e.id === eventId);

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
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      className="max-w-4xl mx-auto p-4"
    >
      {/* <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <img src={event.image_uri} alt={event.name} className="w-full h-100 object-cover rounded pb-10" />
      <p className="text-2xl mb-2 font-bold">Date: {format(new Date(event.eventUnixTime * 1000), "MMM dd, yyyy")}</p>
      <p className="text-2xl  mb-2 font-bold">Time: {format(new Date(event.eventUnixTime * 1000), "HH:mm")}</p>
      <p className="text-2xl  mb-2 font-bold">  Total Number of Tickets: {event.max_supply}</p>
      <Button onClick={handlePurchase} className="text-lg  mb-2 font-bold mt-4">
        Purchase Tickets
      </Button>
      <div className="mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 border rounded shadow"
        >
          <p className="text-2xl  mb-2 font-bold">
            {event.description}
          </p>
        </motion.div>
      </div> */}
      <HeroSection page={eventId}/>
    </motion.div>
  );
};

export default EventDetail;
