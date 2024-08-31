import React from "react";
import Marquee from "../magicui/marquee";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const reviews = [
  {
    img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-02/pig0924%20horizontal.jpg?w=248&fit=crop&auto=format",
  },
  {
    img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-08/Featured%20Events%20Banner%20-%20436%20x%20326_1.png?w=248&fit=crop&auto=format",
  },
  {
    img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-06/RELEASE%201%20-%20436x326%20-%20SISTIC%20-%20TKK150%20-%20resize.jpg?w=248&fit=crop&auto=format",
  },
  {
    img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-08/Jane-MBS19-SISTIC-landscape-436x326.jpg?w=248&fit=crop&auto=format",
  },
  {
    img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-06/evan1024_V1-436x326.jpg?w=248&fit=crop&auto=format",
  },
  {
    img: "https://static.sistic.com.sg/sistic/docroot/sites/default/files/2024-08/436x326%20resized.png?w=248&fit=crop&auto=format",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

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
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
