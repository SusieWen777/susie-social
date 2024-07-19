"use client";

import { FaRegThumbsUp } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { Comment, User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";
import { switchCommentLike } from "@/lib/actions";

type CommentWithUser = Comment & { user: User } & {
  likes: { userId: string }[];
};

function CommentInteraction({ comment }: { comment: CommentWithUser }) {
  const likes = comment.likes.map((like) => like.userId);
  const formattedDate = comment.createdAt.toLocaleString("en-AU", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
      await switchCommentLike(comment.id);
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
    <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
      <div
        className={`flex items-center gap-2 cursor-pointer p-2 rounded-xl ${
          optimisticLikeState.isLiked ? "bg-blue-50" : "bg-slate-50"
        }`}
      >
        <form action={likeAction}>
          <button className="flex items-center">
            {optimisticLikeState.isLiked ? (
              <AiFillLike size={12} color="#0F67B1" />
            ) : (
              <FaRegThumbsUp size={12} color="#0F67B1" />
            )}
          </button>
        </form>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500">
          {optimisticLikeState.likeCount}
          <span className="hidden md:inline"> Likes</span>
        </span>
      </div>
      <div className="cursor-pointer">{formattedDate}</div>
    </div>
  );
}

export default CommentInteraction;
