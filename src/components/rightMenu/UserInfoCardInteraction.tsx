"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

function UserInfoCardInteraction({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followRequestSent: isFollowingSent,
    followSending: false,
    blockSending: false,
  });

  const follow = async () => {
    switchOptimisticUserState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followRequestSent:
          !prev.following && !prev.followRequestSent ? true : false,
      }));
    } catch (error) {}
  };

  const block = async () => {
    switchOptimisticUserState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {}
  };

  const [optimisticUserState, switchOptimisticUserState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followRequestSent:
              !state.following && !state.followRequestSent ? true : false,
            followSending: true,
          }
        : {
            ...state,
            blocked: !state.blocked,
            blockSending: true,
          }
  );

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white rounded-md py-2">
          {optimisticUserState.following
            ? "Following"
            : optimisticUserState.followRequestSent
            ? "Friend Request Sent"
            : "Follow"}
          {optimisticUserState.followSending && " ..."}
        </button>
      </form>
      <form action={block} className="self-end">
        <button className="text-red-400 text-xs cursor-pointer ">
          {optimisticUserState.blocked ? "Unblock User" : "Block User"}
          {optimisticUserState.blockSending && " ..."}
        </button>
      </form>
    </>
  );
}

export default UserInfoCardInteraction;
