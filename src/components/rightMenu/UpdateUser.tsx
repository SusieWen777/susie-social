"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect, useActionState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import UpdateButton from "./UpdateButton";

function UpdateUser({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  const [cover, setCover] = useState<any>();

  const [updateSuccessMsg, setUpdateSuccessMsg] = useState("");
  const [updateErrorMsg, setUpdateErrorMsg] = useState("");

  const handleUpdate = async (
    prevState: { success: boolean; error: boolean },
    payload: { formData: FormData; coverUrl: string }
  ) => {
    try {
      await updateProfile(payload.formData, payload.coverUrl);
      setUpdateSuccessMsg("Profile has been updated!");
      setUpdateErrorMsg("");
      return { success: true, error: false };
    } catch (error) {
      console.log(error);
      setUpdateSuccessMsg("");
      setUpdateErrorMsg("Something went wrong! Please try again.");

      return { success: false, error: true };
    }
  };

  const [profileUpdateState, profileUpdateFormAction] = useActionState(
    handleUpdate,
    {
      success: false,
      error: false,
    }
  );

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setUpdateSuccessMsg("");
    setUpdateErrorMsg("");
    profileUpdateState.success && router.refresh();
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  return (
    <div>
      <span
        className="text-blue-500 text-sx cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            // action={(formData) => handleUpdate(formData, cover?.secure_url)}
            action={(formData) =>
              profileUpdateFormAction({
                formData,
                coverUrl: cover?.secure_url || "",
              })
            }
            className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 2xl:w-2/5 relative"
          >
            {/* Title */}
            <div
              className="cursor-pointer absolute top-6 right-6"
              onClick={handleClose}
            >
              <RxCross2 size={20} />
            </div>
            <h1 className="text-lg">Update Profile</h1>
            <p className="mt-4 text-xs text-gray-500">
              Please use the <b className="text-blue-500">navbar profile</b> to
              change the avatar or username.
            </p>

            {/* To change cover picture using Cloudinary widget*/}
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    onClick={() => open()}
                    className="flex flex-col gap-4 my-4"
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={user.cover || "/noCover.png"}
                        alt=""
                        width={48}
                        height={32}
                        className="w-12 h-8 rounded-md object-cover"
                      />
                      <span className="text-xs underline text-grey-600">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* To change other user information */}
            <div className="grid grid-cols-2 justify-between gap-4 xl:gap-6">
              {/* First name */}
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 rounded-md p-3 text-sm"
                />
              </div>
              {/* Last Name */}
              <div className="flex flex-col gap-4">
                <label htmlFor="surname" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  name="surname"
                  id="surname"
                  type="text"
                  placeholder={user.surname || "Snow"}
                  className="ring-1 ring-gray-300 rounded-md p-3 text-sm"
                />
              </div>
              {/*  Description */}
              <div className="flex flex-col gap-4">
                <label htmlFor="description" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  name="description"
                  id="description"
                  type="text"
                  placeholder={
                    user.description || "Lorem ipsum dolor sit amet..."
                  }
                  className="ring-1 ring-gray-300 rounded-md p-3 text-sm"
                />
              </div>
              {/*  City */}
              <div className="flex flex-col gap-4">
                <label htmlFor="city" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  name="city"
                  id="city"
                  type="text"
                  placeholder={user.city || "Canberra"}
                  className="ring-1 ring-gray-300 rounded-md p-3 text-sm"
                />
              </div>
              {/*  School */}
              <div className="flex flex-col gap-4">
                <label htmlFor="school" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  name="school"
                  id="school"
                  type="text"
                  placeholder={user.school || "Australian National University"}
                  className="ring-1 ring-gray-300 rounded-md p-3 text-sm"
                />
              </div>
              {/*  Work */}
              <div className="flex flex-col gap-4">
                <label htmlFor="work" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  name="work"
                  id="work"
                  type="text"
                  placeholder={user.work || "Susie Dev"}
                  className="ring-1 ring-gray-300 rounded-md p-3 text-sm"
                />
              </div>
              {/*  Website */}
              <div className="flex flex-col gap-4">
                <label htmlFor="website" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  name="website"
                  id="website"
                  type="text"
                  placeholder={user.website || "https://bufanwen.netlify.app/"}
                  className="ring-1 ring-gray-300 rounded-md p-3 text-sm"
                />
              </div>
            </div>

            {/* Update button */}
            <UpdateButton />

            {/* Interact with the update state */}
            {updateSuccessMsg && (
              <span className="text-green-500">{updateSuccessMsg}</span>
            )}
            {updateErrorMsg && (
              <span className="text-red-500">{updateErrorMsg}</span>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateUser;
