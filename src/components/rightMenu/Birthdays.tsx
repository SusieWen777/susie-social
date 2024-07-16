import Image from "next/image";
import Link from "next/link";
import { FaGift } from "react-icons/fa6";

function Birthdays() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Title */}
      <div className="font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        {/* User image and name */}
        <div className="flex gap-2 items-center">
          <Image
            src="https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Guadalupe Eaton</span>
        </div>
        {/* Celebrate button */}
        <div>
          <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
            Celebrate
          </button>
        </div>
      </div>
      {/* Upcoming birthdays */}
      <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
        <FaGift size={24} color="#BB9AB1" />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">
            See other 16 have upcoming birthdays
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Birthdays;
