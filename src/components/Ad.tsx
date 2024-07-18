"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdMore } from "react-icons/io";
import { BiHide } from "react-icons/bi";
import { useState } from "react";

function Ad({ size }: { size: "sm" | "md" | "lg" }) {
  const [isHide, setIsHide] = useState(false);
  const text =
    "SusieFood is your trusted partner for delicious and convenient food delivery. Whether you're craving traditional tastes or modern twists, SusieFood delivers the best meals right to your doorstep, making every meal special.";

  const displayedText =
    size === "sm"
      ? text.slice(0, 50)
      : size === "md"
      ? text.slice(0, 100)
      : text.slice(0, 200);

  if (isHide) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* Title */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Sponsored Ads</span>

        <div className="group relative">
          <IoMdMore size={24} color="gray" className="cursor-pointer" />
          <div
            className="absolute right-0 bg-slate-50 p-2 text-xs text-gray-500 rounded-md z-50 gap-2 items-center font-medium hidden group-hover:flex cursor-pointer"
            onClick={() => setIsHide(true)}
          >
            <BiHide size={14} color="#0F67B1" />
            <p>Hide</p>
          </div>
        </div>
      </div>
      {/* Ad */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">Susie Food</span>
        </div>
        <p className={`${size === "sm" ? "text-xs" : "text-sm"}`}>
          {displayedText}
          {displayedText.length < text.length && "..."}
        </p>
        <Link
          href="https://susie-food-frontend.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-200 rounded-md px-4 py-2 text-center text-gray-500 hover:bg-blue-500 hover:text-white"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default Ad;
