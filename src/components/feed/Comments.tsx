import Image from "next/image";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { FaRegThumbsUp, FaRegComments, FaRegShareSquare } from "react-icons/fa";
import LikeButton from "./LikeButton";

function Comments() {
  return (
    <div>
      {/* Write Comments */}
      <div className="flex item-center gap-4">
        <Image
          src="https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex items-center justify-between bg-slate-100 rounded-xl text-sm px-4 py-2 w-full">
          <input
            type="text"
            placeholder="write a comment..."
            className="bg-transparent outline-none"
          />
          <MdEmojiEmotions
            className="cursor-pointer"
            size={24}
            color="#f7d27e"
          />
        </div>
      </div>
      {/* Review Comments */}
      <div>
        {/* Comment */}
        <div className="flex gap-4 justify-between mt-6">
          {/* Avatar */}
          <div className="">
            <Image
              src="https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          {/* Description */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium text-sm">Marshall Gallagher</span>
            <p className="text-sm">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </p>
            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <LikeButton
                likes={123}
                size={12}
                className={"flex items-center gap-2 cursor-pointer"}
              />
              {/* <div className="flex items-center gap-2 cursor-pointer">
                <FaRegThumbsUp
                  size={12}
                  color="#0F67B1"
                  className="cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">
                  123<span className="hidden md:inline"> Likes</span>
                </span>
              </div> */}
              <div className="cursor-pointer">Reply</div>
            </div>
          </div>
          {/* Icon */}
          <IoMdMore size={24} color="gray" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Comments;
