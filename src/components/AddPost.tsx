import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import {
  MdEmojiEmotions,
  MdAddPhotoAlternate,
  MdVideoCall,
  MdOutlineEmojiEvents,
  MdPoll,
} from "react-icons/md";

function AddPost() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* Avatar */}
      <div className="min-w-avatar">
        <Image
          src="https://images.pexels.com/photos/367191/pexels-photo-367191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>
      {/* Post */}
      <div className="flex-1">
        {/* Text Input */}
        <form action="" className="flex gap-4">
          <textarea
            placeholder="What's on your mind"
            className="bg-slate-100 rounded-lg flex-1 p-2"
            name="desc"
          ></textarea>
          <MdEmojiEmotions
            className="cursor-pointer self-end"
            size={30}
            color="#FFB200"
          />
          <button>Send</button>
        </form>
        {/* Post options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400  flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <MdAddPhotoAlternate
              className="cursor-pointer self-end"
              size={20}
              color="#6C946F"
            />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <MdVideoCall
              className="cursor-pointer self-end"
              size={24}
              color="#FFD35A"
            />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <MdOutlineEmojiEvents
              className="cursor-pointer self-end"
              size={20}
              color="#FFA823"
            />
            Event
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <MdPoll
              className="cursor-pointer self-end"
              size={20}
              color="#DC0083"
            />
            Poll
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
