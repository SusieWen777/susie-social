"use client";

import { useFormStatus } from "react-dom";

function UpdateButton() {
  const status = useFormStatus();
  return (
    <button
      disabled={status.pending}
      className={`${
        status.pending ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
      } p-2 mt-4 rounded-md text-white`}
    >
      {status.pending ? "Update..." : "Update"}
    </button>
  );
}

export default UpdateButton;
