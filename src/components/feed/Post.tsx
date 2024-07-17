import Image from "next/image";
import { IoMdMore } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import Comments from "./Comments";
import { Post as PostModel, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import { auth } from "@clerk/nextjs/server";
import DeletePostButton from "./DeletePostButton";

type PostType = PostModel & { user: User } & { likes: [{ userId: string }] } & {
  _count: { comments: number };
};

function Post({ post }: { post: PostType }) {
  const { userId: currentUserId } = auth();

  return (
    <div className="flex flex-col gap-4 mt-4 mb-8">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        <div className="group relative">
          <IoMdMore size={24} color="gray" className="cursor-pointer" />
          {currentUserId === post.userId && (
            <div className="absolute right-0 bg-slate-50 p-2 text-xs text-gray-500 rounded-md z-50 gap-2 items-center font-medium hidden group-hover:flex">
              <FiTrash2 size={14} color="#0F67B1" />
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </div>
      </div>

      {/* Image and Description */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>

      {/* Interaction */}
      <PostInteraction
        postId={post.id}
        likes={post.likes.map((like) => like.userId)}
        commentNumber={post._count.comments}
      />

      {/* Comments */}
      <Comments postId={post.id} />
    </div>
  );
}

export default Post;
