import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function FriendRequests() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Title */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-sx">
          See all
        </Link>
      </div>
      {/* Friend Request */}
      <div className="flex items-center justify-between gap-4">
        {/* User image and name */}
        <div className="flex gap-2 items-center">
          <Image
            src="https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Wendell Valenzuela</span>
        </div>
        {/* Actions */}
        <div className="flex gap-2 items-center">
          <FaCheckCircle
            color="rgb(59 130 246)"
            size={20}
            className="cursor-pointer"
          />
          <FaTimesCircle color="gray" size={20} className="cursor-pointer" />
        </div>
      </div>
      {/* Friend Request */}
      <div className="flex items-center justify-between gap-4">
        {/* User image and name */}
        <div className="flex gap-2 items-center">
          <Image
            src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Casey Galloway</span>
        </div>
        {/* Actions */}
        <div className="flex gap-2 items-center">
          <FaCheckCircle
            color="rgb(59 130 246)"
            size={20}
            className="cursor-pointer"
          />
          <FaTimesCircle color="gray" size={20} className="cursor-pointer" />
        </div>
      </div>
      {/* Friend Request */}
      <div className="flex items-center justify-between gap-4">
        {/* User image and name */}
        <div className="flex gap-2 items-center">
          <Image
            src="https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Earlene Wong</span>
        </div>
        {/* Actions */}
        <div className="flex gap-2 items-center">
          <FaCheckCircle
            color="rgb(59 130 246)"
            size={20}
            className="cursor-pointer"
          />
          <FaTimesCircle color="gray" size={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default FriendRequests;
