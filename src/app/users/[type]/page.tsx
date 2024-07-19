import ExploreUsers from "@/components/exploreUsers/ExploreUsers";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";

function page({ params }: { params: { type: string } }) {
  const type = params.type;

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <ExploreUsers type={type} />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu followings={false} />
      </div>
    </div>
  );
}

export default page;
