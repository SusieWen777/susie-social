import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[max(calc(100vh-96px),700px)] flex items-center justify-center">
      <SignUp />
    </div>
  );
}
