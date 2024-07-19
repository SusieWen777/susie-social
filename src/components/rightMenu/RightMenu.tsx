import { User } from "@prisma/client";
import Ad from "../Ad";
import Followings from "./Followings";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";

function RightMenu({ user, followings }: { user?: User; followings: boolean }) {
  //using userId to differentiate the homepage and profile page
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      {followings && <Followings />}
      <Ad size="md" />
    </div>
  );
}

export default RightMenu;
