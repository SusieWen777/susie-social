import Link from "next/link";
import ProfileCard from "./ProfileCard";
import { IoMdImages, IoMdSettings } from "react-icons/io";
import Ad from "../Ad";

function LeftMenu({ type }: { type: "home" | "profile" }) {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
        {/* Posts */}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <IoMdImages size={20} color="#6C946F" />
          <span>My Posts</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center" />
        {/* Activities */}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <IoMdImages size={20} color="#FFD35A" />
          <span>Activities</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center" />
        {/* Marketplace */}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <IoMdImages size={20} color="#DC0083" />
          <span>Marketplace</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center" />
        {/* Settings */}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <IoMdSettings size={20} color="rgb(59 130 246)" />
          <span>Settings</span>
        </Link>
        <hr className="border-t-1 border-gray-100 w-36 self-center" />
      </div>
      <Ad size="sm" />
    </div>
  );
}

export default LeftMenu;
