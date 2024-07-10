import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { IoSchoolSharp, IoBagAddSharp, IoLink } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

function UserInfoCard({ userId }: { userId: string }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Title */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-sx">
          See all
        </Link>
      </div>
      {/* Detailed info */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">Bufan Wen</span>
          <span className="text-sm">@susiewen</span>
        </div>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <div className="flex gap-2 items-center">
          <FaLocationDot color="gray" size={16} />
          <span>
            Living in <b>Canberra</b>
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <IoSchoolSharp color="gray" size={16} />
          <span>
            Went to <b>Australian National University</b>
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <IoBagAddSharp color="gray" size={16} />
          <span>
            Work at <b>Susie Dev</b>
          </span>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2 items-center">
            <IoLink color="gray" size={16} />
            <Link
              href="https://bufanwen.netlify.app/"
              className="text-blue-500 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Susie Portfolio
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <FaCalendarAlt color="gray" size={16} />
            <span>Joined July 2024</span>
          </div>
        </div>
      </div>
      {/* Button */}
      <button className="bg-blue-500 text-white rounded-md py-2">
        Following
      </button>
      <p className="text-red-400 text-xs cursor-pointer self-end">Block User</p>
    </div>
  );
}

export default UserInfoCard;
