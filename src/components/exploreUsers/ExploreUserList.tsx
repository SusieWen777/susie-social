"use client";

import { User } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function ExploreUserList({ users }: { users: User[] }) {
  const take = 10;
  const [displayUsers, setDisplayUsers] = useState<User[]>(
    users.slice(0, take)
  );

  const changeDisplayUsers = () => {
    const totalUsers = users.length;
    const offset = Math.floor(Math.random() * totalUsers);
    console.log(totalUsers, offset);
    setDisplayUsers(users.slice(offset, offset + take));
  };

  return (
    <div className="flex flex-col gap-6">
      {displayUsers.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-4">
          {/* User image and name */}
          <div className="flex gap-4 items-center">
            <Image
              src={user.avatar || "noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="font-medium">
                {user.name && user.surname
                  ? user.name + " " + user.surname
                  : user.username}
              </p>
              <p className="text-xs text-gray-500">
                {user.description
                  ? user.description
                  : "This is a mysterious user."}
              </p>
            </div>
          </div>

          {/* Profile Page Jump Button */}
          <Link
            href={`/profile/${user.username}`}
            className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md"
          >
            <button className="min-w-[60px]">View Profile</button>
          </Link>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white text-xs p-2 rounded-md text-center w-fit mt-4"
        onClick={changeDisplayUsers}
      >
        See More
      </button>
    </div>
  );
}

export default ExploreUserList;
