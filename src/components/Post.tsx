import Image from "next/image";
import { IoMdMore } from "react-icons/io";
import { FaRegThumbsUp, FaRegComments, FaRegShareSquare } from "react-icons/fa";
import Comments from "./Comments";
import LikeButton from "./LikeButton";

function Post() {
  return (
    <div className="flex flex-col gap-4 my-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Britt Franklin</span>
        </div>
        <IoMdMore size={24} color="gray" className="cursor-pointer" />
      </div>
      {/* Description */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://images.pexels.com/photos/101667/pexels-photo-101667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      {/* Interaction */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <LikeButton
            likes={123}
            size={16}
            className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl"
          />
          {/* <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
            <FaRegThumbsUp
              size={16}
              color="#0F67B1"
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Likes</span>
            </span>
          </div> */}
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
            <FaRegComments
              size={20}
              color="#0F67B1"
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              789<span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
            <FaRegShareSquare
              size={16}
              color="#0F67B1"
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              789<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      {/* Comments */}
      <Comments />
    </div>
  );
}

export default Post;
