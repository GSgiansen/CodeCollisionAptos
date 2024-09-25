import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DataTable } from "./listingTable/data-table";
import { columns, MarketplaceTicket } from "./listingTable/columns";
import { useGetCollectionData } from "@/hooks/useGetCollectionData";
import { useGetCollections } from "@/hooks/useGetCollections";
import { GetCollectionDataResponse } from "@aptos-labs/ts-sdk";

type Concert = {
  name: string;
  description: string;
  startsDateTime: string; // You might also use `Date` if you prefer working with Date objects
  endDateTime: string; // Same as above, `Date` is also an option
  imageUrl: string;
};

function convertToUnixTime(dateString: string): number {
  if (!dateString) {
    return 0;
  }
  // Remove ordinal suffix (st, nd, rd, th) from the day part of the date
  const formattedDateString = dateString.replace(/(\d{1,2})(st|nd|rd|th)/, '$1');
  
  // Try to parse the date using the Date constructor
  const date = new Date(formattedDateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Return the Unix timestamp in seconds
  return Math.floor(date.getTime() / 1000);
}


const Marketplace = () => {
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["1", "2", "3", "4", "5"];

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category],
    );
  };
  const collections: Array<GetCollectionDataResponse> = useGetCollections();

  // Example concerts data
  const concerts: Concert[] = collections.map((collection) => ({
    id: collection.collection_id,
    name: collection.collection_name,
    imageUrl: collection.cdn_asset_uris.cdn_image_uri,
    description: collection?.description ?? config.defaultCollection?.description,
    datetime: (collection.description ?? "").split('\n').filter(line => line.trim() !== '')[2],
    eventUnixTime: convertToUnixTime((collection.description ?? "").split('\n').filter(line => line.trim() !== '')[2]),
    startsDateTime: (collection.description ?? "").split('\n').filter(line => line.trim() !== '')[2],
  }));

  const tickets: MarketplaceTicket[] = [
    {
      id: "1",
      price: 50.0,
      date: Math.floor(new Date("2024-09-15T19:00:00").getTime() / 1000), // Unix timestamp for 7 PM
      category: 1,
    },
    {
      id: "2",
      price: 100.0,
      date: Math.floor(new Date("2024-09-15T19:00:00").getTime() / 1000),
      category: 2,
    },
    {
      id: "3",
      price: 40.0,
      date: Math.floor(new Date("2024-09-22T19:00:00").getTime() / 1000),
      category: 1,
    },
    {
      id: "4",
      price: 80.0,
      date: Math.floor(new Date("2024-09-22T19:00:00").getTime() / 1000),
      category: 3,
    },
    {
      id: "5",
      price: 60.0,
      date: Math.floor(new Date("2024-10-05T19:00:00").getTime() / 1000),
      category: 2,
    },
    {
      id: "6",
      price: 120.0,
      date: Math.floor(new Date("2024-10-05T19:00:00").getTime() / 1000),
      category: 4,
    },
    {
      id: "7",
      price: 70.0,
      date: Math.floor(new Date("2024-10-12T19:00:00").getTime() / 1000),
      category: 1,
    },
    {
      id: "8",
      price: 140.0,
      date: Math.floor(new Date("2024-10-12T19:00:00").getTime() / 1000),
      category: 5,
    },
    {
      id: "9",
      price: 55.0,
      date: Math.floor(new Date("2024-10-20T19:00:00").getTime() / 1000),
      category: 3,
    },
    {
      id: "10",
      price: 110.0,
      date: Math.floor(new Date("2024-10-20T19:00:00").getTime() / 1000),
      category: 4,
    },
  ];

  const filteredConcerts = concerts.filter((concert) => concert.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredTickets = useMemo(() => {
    if (selectedCategories.length === 0) return tickets;
    return tickets.filter((ticket) => selectedCategories.includes(ticket.category.toString()));
  }, [selectedCategories, tickets]);

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4">
        {selectedConcert ? (
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden mx-auto w-3/4 max-w-md">
            <div className="flex justify-center p-4">
              {" "}
              {/* Center the image container */}
              <div className="w-64 h-40 overflow-hidden rounded-lg border border-gray-300">
                <img src={selectedConcert.imageUrl} alt={selectedConcert.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedConcert.name}</h2>
              {selectedConcert.description.split('\n').map((line, index) => (
  <p key={index} className="text-gray-700 mb-2">
    {line}
  </p>
))}


              <div className="text-gray-500">
                <p className="text-sm">
                  Starts: {new Date(selectedConcert.startsDateTime).toLocaleDateString()} at{" "}
                  {new Date(selectedConcert.startsDateTime).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No concert selected</p>
        )}

        <Dialog>
          <DialogTrigger>
            <Button>Select Concert</Button>
          </DialogTrigger>
          <DialogContent className="h-auto">
            <DialogHeader>
              <DialogTitle>Upcoming Concerts</DialogTitle>
              <br />
              <DialogDescription>
                <Input
                  type="text"
                  placeholder="Search for concerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <br />
                {/* Scrollable container */}
                <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                  {filteredConcerts.map((concert) => (
                    <div
                      key={concert.name}
                      className="border border-gray-300 rounded-lg p-4 flex flex-row gap-4 items-center"
                    >
                      <img className="w-24 object-cover rounded-lg" src={concert.imageUrl} alt={concert.name} />
                      <div>
                        <h2 className="font-bold text-2xl text-black">{concert.name}</h2>
                        <p>{concert.description}</p>
                      </div>
                      <DialogClose asChild>
                        <Button type="button" onClick={() => setSelectedConcert(concert)}>
                          Select
                        </Button>
                      </DialogClose>
                    </div>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div>
          <div className="border border-gray-300 rounded-lg p-4">
            <p>Filters</p>
            <div className="flex flex-wrap gap-2">
              <h3 className="font-bold text-2xl">Categories</h3>
              {categories.map((category) => (
                <Button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`${
                    selectedCategories.includes(category) ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  } px-4 py-2 rounded-lg`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <DataTable columns={columns} data={filteredTickets} />
        </div>
      </div>
    </>
  );
};

export default Marketplace;
