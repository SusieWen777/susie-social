import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Image from "next/image";

function ProfilePage() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* User Profile */}
          <div className="flex flex-col items-center justify-center">
            {/* Avatar */}
            <div className="w-full h-64 relative">
              <Image
                src="https://images.pexels.com/photos/22857371/pexels-photo-22857371/free-photo-of-hauserzeile.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                fill
                className="object-cover rounded-md"
              />
              <Image
                src="https://images.pexels.com/photos/26954635/pexels-photo-26954635/free-photo-of-a-black-and-white-photo-of-a-woman-sitting-on-a-stool.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                width={128}
                height={128}
                className="object-cover w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white"
              />
            </div>
            {/* Name */}
            <h1 className="mt-20 mb-4 text-2xl font-medium">Bufan Wen</h1>
            {/* Data */}
            <div className="flex gap-12 items-center justify-center mb-4">
              <div className="flex flex-col items-center">
                <b>142</b>
                <p className="text-sm">Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <b>1.2K</b>
                <p className="text-sm">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <b>1.4K</b>
                <p className="text-sm">Following</p>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu userId="test" />
      </div>
    </div>
  );
}

export default ProfilePage;
