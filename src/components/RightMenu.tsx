import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";

function RightMenu({ userId }: { userId?: string }) {
  //using userId to differentiate the homepage and profile page
  return (
    <div className="flex flex-col gap-6">
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
}

export default RightMenu;
