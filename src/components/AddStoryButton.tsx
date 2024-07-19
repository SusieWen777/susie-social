"use client";

import { useFormStatus } from "react-dom";
import { RxCrossCircled } from "react-icons/rx";
import { handleDeleteImage } from "@/lib/removeImg";

function AddStoryButton({
  newStoryImg,
  setNewStoryImg,
}: {
  newStoryImg: any;
  setNewStoryImg: any;
}) {
  const status = useFormStatus();
  return (
    <>
      <button
        disabled={status.pending}
        className="text-xs bg-blue-500 p-1 px-2 rounded-md text-white disabled:bg-gray-500"
      >
        Send
      </button>
      {/* deleted the chosen image */}
      {!status.pending && (
        <div className="bg-gray-100 absolute w-5 h-5 flex items-center justify-center rounded-full -top-1 -right-1">
          <RxCrossCircled
            size={16}
            color="gray"
            className="cursor-pointer"
            onClick={() => {
              handleDeleteImage(newStoryImg.secure_url);
              setNewStoryImg(null);
            }}
          />
        </div>
      )}
    </>
  );
}

export default AddStoryButton;
