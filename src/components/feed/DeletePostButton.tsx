"use client";

import { deletePost } from "@/lib/actions";

function DeletePostButton({ postId }: { postId: number }) {
  return <button onClick={() => deletePost(postId)}>Delete</button>;
}

export default DeletePostButton;
