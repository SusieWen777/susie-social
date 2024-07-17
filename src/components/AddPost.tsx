"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useActionState, useState } from "react";
import {
  MdEmojiEmotions,
  MdAddPhotoAlternate,
  MdVideoCall,
  MdOutlineEmojiEvents,
  MdPoll,
} from "react-icons/md";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

function AddPost() {
  const { user, isLoaded } = useUser();
  const [img, setImg] = useState<any>();

  const handleAddPost = async (
    prevState: { success: boolean; error: string },
    payload: { formData: FormData; img: string }
  ) => {
    try {
      await addPost(payload.formData, payload.img);
      return { success: true, error: "" };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return { success: false, error: error.message };
      } else {
        return { success: false, error: "An unknown error occurred" };
      }
    }
  };

  const [addPostState, addPostFormAction] = useActionState(handleAddPost, {
    success: false,
    error: "",
  });

  if (!isLoaded) return "Loading ...";

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* Avatar */}
      <div className="min-w-avatar">
        <Image
          src={user?.imageUrl || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>
      {/* Post */}
      <div className="flex-1">
        {/* Text Input */}
        <form
          action={(formData) =>
            addPostFormAction({ formData, img: img?.secure_url || "" })
          }
          className="flex gap-4"
        >
          <textarea
            placeholder="What's on your mind"
            className="bg-slate-100 rounded-lg flex-1 p-2"
            name="desc"
          ></textarea>
          <div>
            <MdEmojiEmotions
              className="cursor-pointer self-end"
              size={30}
              color="#FFB200"
            />
            <AddPostButton />
          </div>
        </form>
        {addPostState.error && (
          <p className="text-red-500">{addPostState.error}</p>
        )}
        {/* Post options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400  flex-wrap">
          {/* Upload post image */}
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result) => {
              setImg(result.info);
            }}
          >
            {({ open }) => {
              return (
                <button onClick={() => open()}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <MdAddPhotoAlternate
                      className="cursor-pointer self-end"
                      size={20}
                      color="#6C946F"
                    />
                    Photo
                  </div>
                </button>
              );
            }}
          </CldUploadWidget>

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
