import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { addDays, format, isAfter, isBefore } from "date-fns";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Header } from "@/components/Header";
import { CAS, TS_ERA } from "./EventType";
import { ConnectWalletAlert } from "../Mint/components/ConnectWalletAlert";
import { BannerSection } from "../Mint/components/BannerSection";
import { FAQSection } from "../Mint/components/FAQSection";
import { HeroSection } from "../Mint/components/HeroSection";
import { HowToMintSection } from "../Mint/components/HowToMintSection";
import { OurStorySection } from "../Mint/components/OurStorySection";
import { OurTeamSection } from "../Mint/components/OurTeamSection";
import { StatsSection } from "../Mint/components/StatsSection";
import { MarqueeDemo } from "../../components/HomePage/marquee";

import { Link, useNavigate } from "react-router-dom";
import { GetCollectionDataResponse } from "@aptos-labs/ts-sdk";
// Internal components
// Internal hooks
import { useGetCollections } from "@/hooks/useGetCollections";
// Internal constants
import { NETWORK, COLLECTION_ADDRESS } from "@/constants";

export function Events() {
  const collections: Array<GetCollectionDataResponse> = useGetCollections();

  // If we are on Production mode, redierct to the mint page
  const navigate = useNavigate();
  if (import.meta.env.PROD) navigate("/", { replace: true });

  const handleCollectionClick = (collectionId: string) => {
    // Here you set the collection address in your env file
    localStorage.setItem(COLLECTION_ADDRESS, collectionId);

    // Navigate to the explorer URL with a full page reload
    window.location.href = "/";
  };

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [filter, setFilter] = useState<string>("");

  // const events = [
  //   CAS, TS_ERA
  // ];
  // convert events page to use the collections from the collections

  const events = collections.map((collection) => {
    return {
      id: collection.collection_id,
      name: collection.collection_name,
      image_uri: collection.cdn_asset_uris.cdn_image_uri,
      eventUnixTime: 1723099309,
    };
  });
  const reviews = [
    {
      title: "Pig",
      img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-02/pig0924%20horizontal.jpg?w=248&fit=crop&auto=format",
    },
    {
      title: "Jane",
      img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-08/Featured%20Events%20Banner%20-%20436%20x%20326_1.png?w=248&fit=crop&auto=format",
    },
    {
      title: "Tom",
      img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-06/RELEASE%201%20-%20436x326%20-%20SISTIC%20-%20TKK150%20-%20resize.jpg?w=248&fit=crop&auto=format",
    },
    {
      title: "Spongebob",
      img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-08/Jane-MBS19-SISTIC-landscape-436x326.jpg?w=248&fit=crop&auto=format",
    },
    {
      title: "Inside Out",
      img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-06/evan1024_V1-436x326.jpg?w=248&fit=crop&auto=format",
    },
    {
      title: "Haha",
      img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-08/436x326%20resized.png?w=248&fit=crop&auto=format",
    },
  ];
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.eventUnixTime * 1000);
    const isWithinDateRange =
      date?.from && date?.to ? isAfter(eventDate, date.from) && isBefore(eventDate, date.to) : true;
    const matchesFilter = event.name.toLowerCase().includes(filter.toLowerCase());
    return isWithinDateRange && matchesFilter;
  });
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-between px-4 max-w-screen-xl mx-auto w-full flex-wrap">
      <Header />
      <MarqueeDemo />
      <div className="bg-blue-500 p-8 w-full">
        <h1 className="text-2xl font-bold text-white">Upcoming Concerts</h1>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {reviews.map((card) => (
            <div key={card.title} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <img src={card.img} alt={card.title} className="h-32 w-32 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-medium text-center">{card.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center p-4">
        <input
          type="text"
          placeholder="Search for event name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <DatePickerWithRange date={date} setDate={setDate} className="p-4" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4"
      >
        {filteredEvents.map((event) => (
          <motion.div key={event.id} variants={itemVariants}>
            <Link
              to={`events/${event.id}`}
              state={{ event }} // Pass event data via state
              className="block p-4"
            >
              <Card className="flex flex-row gap-4 p-4 items-center hover:bg-gray-100 transition-colors duration-200">
                <img src={event.image_uri} alt={event.name} className="w-64 h-64 object-cover rounded-lg" />
                <div className="text-4xl font-bold text-gray-700">
                  {format(new Date(event.eventUnixTime * 1000), "MMM dd, yyyy")}
                  <div className="text-lg font-normal">{format(new Date(event.eventUnixTime * 1000), "HH:mm")}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{event.name}</div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
