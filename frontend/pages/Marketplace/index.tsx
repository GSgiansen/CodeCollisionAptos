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

type Concert = {
  name: string;
  description: string;
  startsDateTime: string; // You might also use `Date` if you prefer working with Date objects
  endDateTime: string; // Same as above, `Date` is also an option
  imageUrl: string;
};

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

  // Example concerts data
  const concerts: Concert[] = [
    {
      name: "Rock the Night",
      description: "Join us for an electrifying night of rock music with the best bands in town.",
      startsDateTime: "2024-09-15T20:00:00",
      endDateTime: "2024-09-17T20:00:00",
      imageUrl:
        "https://dynamicmedia.livenationinternational.com/p/d/i/b5f28577-e2d2-476b-b578-b5a2f30d0525.jpeg?format=webp&width=230",
    },
    {
      name: "Jazz & Blues Festival",
      description: "Experience the smooth sounds of jazz and blues in an outdoor setting.",
      startsDateTime: "2024-09-22T18:00:00",
      endDateTime: "2024-09-24T20:00:00",
      imageUrl: "https://dynamicmedia.livenationinternational.com/y/o/w/65307632-ccaf-491b-b673-a08eaa72eebe.png",
    },
    {
      name: "Pop Extravaganza",
      description: "A night filled with the latest pop hits and vibrant performances.",
      startsDateTime: "2024-10-05T19:30:00",
      endDateTime: "2024-10-10T20:00:00",
      imageUrl:
        "https://dynamicmedia.livenationinternational.com/p/d/t/0e9585ab-fc01-4926-895f-d7b2b56848c9.jpg?format=webp&width=230",
    },
    {
      name: "Classical Nights",
      description: "An elegant evening of classical music performed by world-renowned orchestras.",
      startsDateTime: "2024-10-12T19:00:00",
      endDateTime: "2024-10-15T20:00:00",
      imageUrl:
        "https://dynamicmedia.livenationinternational.com/h/k/m/bfc22489-98da-4b7b-bde5-2bb84d586222.jpg?format=webp&width=230",
    },
    {
      name: "Country Roads Festival",
      description: "Get ready for a day of country music, food, and fun in the sun.",
      startsDateTime: "2024-10-20T16:00:00",
      endDateTime: "2024-10-30T20:00:00",
      imageUrl:
        "https://dynamicmedia.livenationinternational.com/u/n/i/8bbea948-03fc-453e-817a-fb8809685f61.jpg?format=webp&width=230",
    },
  ];
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
              <p className="text-gray-700 mb-4">{selectedConcert.description}</p>
              <div className="text-gray-500">
                <p className="text-sm">
                  Starts: {new Date(selectedConcert.startsDateTime).toLocaleDateString()} at{" "}
                  {new Date(selectedConcert.startsDateTime).toLocaleTimeString()}
                </p>
                <p className="text-sm">
                  Ends: {new Date(selectedConcert.endDateTime).toLocaleDateString()} at{" "}
                  {new Date(selectedConcert.endDateTime).toLocaleTimeString()}
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
