import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { IoSchoolSharp, IoBagAddSharp, IoLink } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

async function UserInfoCard({ user }: { user: User }) {
  const createdAtDate = new Date(user.createAt);
  const formattedDate = createdAtDate.toLocaleString("en-AU", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });
    isUserBlocked = blockRes ? true : false;

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });
    isFollowing = followRes ? true : false;

    const followSentRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });
    isFollowingSent = followSentRes ? true : false;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Title */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === user.id && <UpdateUser user={user} />}
      </div>
      {/* Detailed info */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
        {user.city && (
          <div className="flex gap-2 items-center">
            <FaLocationDot color="gray" size={16} />
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}
        {user.school && (
          <div className="flex gap-2 items-center">
            <IoSchoolSharp color="gray" size={16} />
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex gap-2 items-center">
            <IoBagAddSharp color="gray" size={16} />
            <span>
              Work at <b>{user.work}</b>
            </span>
          </div>
        )}
        <div className="flex gap-2 justify-between items-center">
          {user.website && (
            <div className="flex gap-2 items-center">
              <IoLink color="gray" size={16} />
              <Link
                href={user.website}
                className="text-blue-500 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </Link>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <FaCalendarAlt color="gray" size={16} />
            <span>{formattedDate}</span>
          </div>
        </div>
        {/* Button */}
        {currentUserId && currentUserId !== user.id && (
          <UserInfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  );
}

export default UserInfoCard;
