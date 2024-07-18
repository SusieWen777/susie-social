import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import StoryList from "./StoryList";

async function Stories() {
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;

  const following = await prisma.follower.findMany({
    where: {
      followerId: currentUserId,
    },
    select: {
      followingId: true,
    },
  });

  const followingIds = following.map((f) => f.followingId);
  const allIds = [...followingIds, currentUserId];

  const stories = await prisma.story.findMany({
    where: {
      userId: {
        in: allIds,
      },
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-sm scrollbar-hidden">
      <div className="flex gap-8 w-max">
        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
}

export default Stories;
