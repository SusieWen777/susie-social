import Image from "next/image";
import { IoMdMore } from "react-icons/io";

import Comments from "./Comments";
import { Post as PostModel, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";

type PostType = PostModel & { user: User } & { likes: [{ userId: string }] } & {
  _count: { comments: number };
};

function Post({ post }: { post: PostType }) {
  return (
    <div className="flex flex-col gap-4 my-4">
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
        <IoMdMore size={24} color="gray" className="cursor-pointer" />
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
