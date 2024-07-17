"use client";

import { useFormStatus } from "react-dom";

function AddPostButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md p-1 px-2 text-white text-xs mt-2"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

export default AddPostButton;
