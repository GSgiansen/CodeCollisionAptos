"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MarketplaceTicket = {
  id: string;
  price: number;
  category: number;
  date: number;
};
function unixToReadable(unixTimestamp) {
  // Convert Unix timestamp (seconds) to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Format date to a readable format
  return date.toLocaleString(); // Returns date and time in the default locale format
}

export const columns: ColumnDef<MarketplaceTicket>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <div>{unixToReadable(row.getValue("date"))}</div>;
    },
  },
  {
    accessorKey: "category",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("category")}</div>;
    },
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <div>Category</div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("price")}</div>;
    },
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
