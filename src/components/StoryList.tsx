"use client";

import { Story, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { addStory, deleteStory } from "@/lib/actions";

type StoryWithUser = Story & { user: User };

function StoryList({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) {
  const [storyList, setStoryList] = useState(stories);
  const [newStoryImg, setNewStoryImg] = useState<any>();

  const addStorySubmit = async () => {
    if (!newStoryImg.secure_url) return;
    addOrDeleteOptimisticStory({
      id: Math.random(),
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      img: newStoryImg.secure_url,
      userId,
      user: {
        id: userId,
        username: "Sending ... Please wait",
        avatar: "noAvatar.png",
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
      const createdStory = await addStory(newStoryImg.secure_url);
      setStoryList((prev) => [...prev, createdStory]);
      setNewStoryImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStorySubmit = async (storyId: number) => {
    addOrDeleteOptimisticStory(storyId);
    try {
      await deleteStory(storyId);
      setStoryList((prev) => prev.filter((story) => story.id !== storyId));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticStories, addOrDeleteOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser | number) => {
      if (typeof value === "number") {
        return state.filter((story) => story.id !== value);
      }
      return [...state, value];
    }
  );

  return (
    <>
      {/* Add a new story (image) */}
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result) => {
          console.log(result.info);
          setNewStoryImg(result.info);
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              {newStoryImg?.secure_url ? (
                <Image
                  src={newStoryImg?.secure_url}
                  alt=""
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full ring-2 object-cover"
                />
              ) : (
                <IoIosAddCircleOutline
                  size={80}
                  color="gray"
                  onClick={() => open()}
                />
              )}
              {newStoryImg?.secure_url ? (
                <form action={addStorySubmit}>
                  <button className="text-xs bg-blue-500 p-1 px-2 rounded-md text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add Story</span>
              )}
            </div>
          );
        }}
      </CldUploadWidget>

      {/* All the stories */}
      {optimisticStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-2 relative"
        >
          <Image
            src={story.img}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">
            {story.user.name && story.user.surname
              ? story.user.name + " " + story.user.surname
              : story.user.username}
          </span>

          {/* Delete the story */}
          {story.user.id === userId && (
            <div className="bg-gray-100 absolute w-5 h-5 flex items-center justify-center rounded-full -top-1 -right-1">
              <RxCrossCircled
                size={16}
                color="gray"
                className="cursor-pointer"
                onClick={() => deleteStorySubmit(story.id)}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default StoryList;
