import Image from "next/image";
import { IoMdMore } from "react-icons/io";

function Ad({ size }: { size: "sm" | "md" | "lg" }) {
  const text =
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.";

  const displayedText =
    size === "sm"
      ? text.slice(0, 50)
      : size === "md"
      ? text.slice(0, 100)
      : text.slice(0, 200);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* Title */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Sponsored Ads</span>
        <IoMdMore size={24} color="gray" className="cursor-pointer" />
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
        <button className="bg-gray-200 rounded-md px-4 py-2 text-center text-gray-500">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default Ad;
