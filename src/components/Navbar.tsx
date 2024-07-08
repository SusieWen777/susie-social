import Link from "next/link";
import MobileMenu from "./MobileMenu";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoAddCircleOutline,
} from "react-icons/io5";

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
      <div className="hidden md:flex w-[50%] text-sm">
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
      </div>
      {/* Right part */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <MobileMenu />
      </div>
    </div>
  );
}

export default Navbar;
