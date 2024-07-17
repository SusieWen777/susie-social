import Image from "next/image";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { FaRegThumbsUp, FaRegComments, FaRegShareSquare } from "react-icons/fa";
import LikeButton from "./LikeButton";
import prisma from "@/lib/client";
import CommentList from "./CommentList";

async function Comments({ postId }: { postId: number }) {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { user: true },
  });

  return (
    <div>
      <CommentList comments={comments} postId={postId} />
    </div>
  );
}

export default Comments;
