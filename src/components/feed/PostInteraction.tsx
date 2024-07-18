"use client";

import { FaRegThumbsUp, FaRegComments, FaRegShareSquare } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

import { useAuth } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";
import { switchPostLike } from "@/lib/actions";

function PostInteraction({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) {
  const { isLoaded, userId: currentUserId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: currentUserId ? likes.includes(currentUserId) : false,
  });

  const [optimisticLikeState, setOptimisticLikeState] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    setOptimisticLikeState("");
    try {
      await switchPostLike(postId);
      setLikeState((state) => {
        return {
          likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
          isLiked: !state.isLiked,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div
          className={`flex items-center gap-2 ${
            optimisticLikeState.isLiked ? "bg-blue-50" : "bg-slate-50"
          }  p-2 rounded-xl cursor-pointer`}
        >
          <form action={likeAction}>
            <button className="flex items-center">
              {optimisticLikeState.isLiked ? (
                <AiFillLike size={16} color="#0F67B1" />
              ) : (
                <FaRegThumbsUp size={16} color="#0F67B1" />
              )}
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLikeState.likeCount}
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
          <FaRegComments size={20} color="#0F67B1" />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentNumber} <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl cursor-pointer">
          <FaRegShareSquare size={16} color="#0F67B1" />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 hidden md:inline">Share</span>
        </div>
      </div>
    </div>
  );
}

export default PostInteraction;
