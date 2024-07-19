import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FaGift } from "react-icons/fa6";
import FollowingList from "./FollowingList";

async function Followings() {
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;

  const followings = await prisma.follower.findMany({
    where: { followerId: currentUserId },
    include: { following: true },
    take: 3,
  });

  const followingUsers: User[] = followings.map((f) => f.following);

  let recommendUsers: User[] = [];

  if (!followingUsers.length) {
    recommendUsers = await prisma.user.findMany({
      where: { NOT: { id: currentUserId } },
      take: 3,
    });
  }

  const displayUsers =
    followingUsers.length === 0 ? recommendUsers : followingUsers;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Title */}
      <div className="font-medium justify-between flex">
        <span className="text-gray-500">
          {followingUsers.length === 0 ? "Explore Users" : "Followings"}
        </span>
        <Link
          href={`/users/${
            followingUsers.length === 0 ? "explore" : "following"
          }`}
          className="text-blue-500 text-sx"
        >
          See all
        </Link>
      </div>

      <FollowingList followings={displayUsers} />

      {/* Upcoming birthdays */}
      {/* <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
        <FaGift size={24} color="#BB9AB1" />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">
            See other 16 have upcoming birthdays
          </span>
        </Link>
      </div> */}
    </div>
  );
}

export default Followings;
