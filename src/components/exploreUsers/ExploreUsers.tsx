import prisma from "@/lib/client";
import ExploreUserList from "./ExploreUserList";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

async function ExploreUsers({ type }: { type: string }) {
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;

  let users: User[] = [];

  if (type === "explore") {
    users = await prisma.user.findMany({
      where: { NOT: { id: currentUserId } },
      take: 100,
    });
    if (!users) return "No users found! Please wait others to join.";
  }

  if (type === "following") {
    const followings = await prisma.follower.findMany({
      where: { followerId: currentUserId },
      include: { following: true },
    });
    users = followings.map((f) => f.following);

    if (!users) return "No followers found! Please wait others to follow.";
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col g-12">
      <ExploreUserList users={users} />
    </div>
  );
}

export default ExploreUsers;
