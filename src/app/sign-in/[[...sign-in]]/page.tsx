import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[max(calc(100vh-96px),560px)] flex items-center justify-center">
      <SignIn />
    </div>
  );
}
