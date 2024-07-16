import { notFound } from "next/navigation";

function NotFound() {
  return (
    <div className="text-gray-600 text-xl font-semibold h-[calc(100vh-96px)] flex justify-center items-center">
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

export default NotFound;
