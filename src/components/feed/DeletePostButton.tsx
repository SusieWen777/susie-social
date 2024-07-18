"use client";

import { deletePost } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import { FiTrash2 } from "react-icons/fi";

function Button() {
  const status = useFormStatus();

  return (
    <>
      <p className="absolute w-40 text-red-500 right-8 top-1 text-medium text-sm">
        {status.pending ? "Deleting the post ..." : ""}
      </p>
      <div className="absolute right-0 bg-slate-50 p-2 text-xs text-gray-500 rounded-md z-50 gap-2 items-center font-medium hidden group-hover:flex hover:text-red-500">
        <FiTrash2 size={14} color="#0F67B1" />
        <button disabled={status.pending} className="disabled:text-gray-500">
          Delete
        </button>
      </div>
    </>
  );
}

function DeletePostButton({ postId }: { postId: number }) {
  return (
    <form
      action={() => {
        deletePost(postId);
      }}
    >
      <Button />
    </form>
  );
}

export default DeletePostButton;
