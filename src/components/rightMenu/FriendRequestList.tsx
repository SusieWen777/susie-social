"use client";

import { acceptFollowRequest, rejectFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type RequestsWithUser = FollowRequest & {
  sender: User;
};

function FriendRequestList({ requests }: { requests: RequestsWithUser[] }) {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(requestId, userId);
      setRequestState((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (error) {}
  };

  const reject = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await rejectFollowRequest(requestId, userId);
      setRequestState((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (error) {}
  };

  const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: number) => {
      return state.filter((request) => request.id !== value);
    }
  );

  return (
    <div>
      {optimisticRequests.map((request) => (
        <div
          key={request.id}
          className="flex items-center justify-between gap-4"
        >
          {/* User image and name */}
          <div className="flex gap-2 items-center">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          {/* Actions */}
          <div className="flex gap-2 items-center">
            <form action={() => accept(request.id, request.senderId)}>
              <button>
                <FaCheckCircle
                  color="rgb(59 130 246)"
                  size={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={() => reject(request.id, request.senderId)}>
              <button>
                <FaTimesCircle
                  color="gray"
                  size={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendRequestList;
