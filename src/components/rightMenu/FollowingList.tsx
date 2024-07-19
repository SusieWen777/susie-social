"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

function FollowingList({ followings }: { followings: User[] }) {
  return (
    <>
      {followings.map((user) => (
        <div className="flex items-center justify-between gap-4">
          {/* User image and name */}
          <div className="flex gap-2 items-center">
            <Image
              src={user.avatar || "noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {user.name && user.surname
                ? user.name + " " + user.surname
                : user.username}
            </span>
          </div>
          {/* Profile Page Jump Button */}
          <div>
            <Link
              href={`/profile/${user.username}`}
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md"
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default FollowingList;
