import React, { useEffect, useState } from "react";
import Marquee from "../magicui/marquee";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GetCollectionDataResponse } from "@aptos-labs/ts-sdk";
import { useGetCollections } from "@/hooks/useGetCollections";
import bear1 from "@/assets/placeholders/bear-1.png";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 h-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "flex flex-col justify-end",
      )}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    ></figure>
  );
};

export function MarqueeDemo() {
  const [collections, setCollections] = useState<GetCollectionDataResponse[] | null>(null);
  const data = useGetCollections();

  useEffect(() => {
    if (data) {
      setCollections(data);
    }
  }, [data]);

  if (!collections) {
    return <div>Loading...</div>; // or any loading indicator
  }

  const firstRow = collections.slice(0, collections.length / 2);
  const secondRow = collections.slice(collections.length / 2);

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard img={review?.cdn_asset_uris?.cdn_image_uri || bear1} key={review.collection_id} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard img={review?.cdn_asset_uris?.cdn_image_uri || bear1} key={review.collection_id} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
