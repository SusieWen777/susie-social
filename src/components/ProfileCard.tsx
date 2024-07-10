import Image from "next/image";

function ProfileCard() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      {/* Background image and avatar image */}
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/19786392/pexels-photo-19786392/free-photo-of-photo-of-pink-flowers-and-a-kitten-on-a-shelf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src="https://images.pexels.com/photos/26613618/pexels-photo-26613618/free-photo-of-a-woman-standing-in-front-of-a-body-of-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          width={48}
          height={48}
          className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 object-cover"
        />
      </div>
      {/* Name and follower */}
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">Tyler Choi</span>
        <div className="flex gap-2">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/26613618/pexels-photo-26613618/free-photo-of-a-woman-standing-in-front-of-a-body-of-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3 object-cover"
            />
            <Image
              src="https://images.pexels.com/photos/26613618/pexels-photo-26613618/free-photo-of-a-woman-standing-in-front-of-a-body-of-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3 object-cover"
            />
            <Image
              src="https://images.pexels.com/photos/26613618/pexels-photo-26613618/free-photo-of-a-woman-standing-in-front-of-a-body-of-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3 object-cover"
            />
          </div>
          <span className="text-xs text-gray">500 Followers</span>
        </div>
        {/* Button */}
        <button className="bg-blue-500 text-white text-xs p-2 rounded-md w-full">
          My Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
