"use client";

import Image from "next/image";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { FaRegThumbsUp } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { Comment, User } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";
import { addPostComment, deletePostComment } from "@/lib/actions";

type CommentWithUser = Comment & { user: User };

function CommentList({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  const [optimisticComments, addOptimisticComments] = useOptimistic(
    commentState,
    (state, value: CommentWithUser | number) => {
      if (typeof value === "number") {
        return state.filter((comment) => comment.id !== value);
      }
      return [...state, value];
    }
  );

  const addComment = async () => {
    if (!user || !desc) return;
    addOptimisticComments({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId,
      user: {
        id: user.id,
        username: "Sending ... Please wait",
        avatar: user.imageUrl || "noAvatar.png",
        name: "",
        surname: "",
        cover: "",
        description: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addPostComment(postId, desc);
      setCommentState((prev) => [...prev, createdComment]);
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId: number) => {
    addOptimisticComments(commentId);
    try {
      await deletePostComment(commentId);
      setCommentState((prev) =>
        prev.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Write Comments */}
      {user && (
        <div className="flex item-center gap-4">
          <Image
            src={user.imageUrl || "noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <form
            action={addComment}
            className="flex items-center justify-between bg-slate-100 rounded-xl text-sm px-4 py-2 w-full"
          >
            <input
              type="text"
              placeholder="write a comment..."
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <MdEmojiEmotions
              className="cursor-pointer"
              size={24}
              color="#f7d27e"
            />
          </form>
        </div>
      )}

      {/* Review Comments */}
      <div>
        {/* Comment */}
        {optimisticComments.map((comment) => (
          <div key={comment.id} className="flex gap-4 justify-between mt-6">
            {/* Avatar */}
            <div className="">
              <Image
                src={comment.user.avatar || "/noAvatar.png"}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium text-sm">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p className="text-sm">{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                {/* <LikeButton
                likes={123}
                size={12}
                className={"flex items-center gap-2 cursor-pointer"}
              /> */}
                <div className="flex items-center gap-2 cursor-pointer">
                  <FaRegThumbsUp size={12} color="#0F67B1" />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">
                    123<span className="hidden md:inline"> Likes</span>
                  </span>
                </div>
                <div className="cursor-pointer">Reply</div>
              </div>
            </div>
            {/* Icon */}
            {/* <IoMdMore size={24} color="gray" className="cursor-pointer" /> */}
            <div className="group relative">
              <IoMdMore size={24} color="gray" className="cursor-pointer" />
              {user?.id === comment.user.id && (
                <div className="absolute right-0 bg-slate-50 p-2 text-xs text-gray-500 rounded-md z-50 gap-2 items-center font-medium hidden group-hover:flex">
                  <FiTrash2 size={14} color="#0F67B1" />
                  {/* <DeleteCommentButton commentId={comment.id} /> */}
                  <button onClick={() => deleteComment(comment.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CommentList;
