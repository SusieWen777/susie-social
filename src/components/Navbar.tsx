import Link from "next/link";
import MobileMenu from "./MobileMenu";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoAddCircleOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineMessage } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

function Navbar() {
  return (
    <div className="flex items-center justify-between h-24">
      {/* Left part */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          SUSIESOCIAL
        </Link>
      </div>
      {/* Center part */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        {/* Links */}
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex gap-2 items-center">
            <IoHomeOutline size={16} color="rgb(59 130 246)" />
            <span>Homepage</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <IoPeopleOutline size={16} color="rgb(59 130 246)" />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <IoAddCircleOutline size={16} color="rgb(59 130 246)" />
            <span>Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <FiSearch size={14} color="gray" />
        </div>
      </div>
      {/* Right part */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer hidden sm:block">
              <GrGroup size={20} color="gray" />
            </div>
            <div className="cursor-pointer hidden sm:block">
              <AiOutlineMessage size={20} color="gray" />
            </div>
            <div className="cursor-pointer hidden sm:block">
              <IoNotificationsOutline size={20} color="gray" />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="cursor-pointer flex items-center gap-2 text-sm">
              <RxAvatar size={20} color="rgb(59 130 246)" />
              <Link href="/sign-in">Login</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
}

export default Navbar;
