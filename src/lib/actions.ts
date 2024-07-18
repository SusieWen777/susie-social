"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    // check if already following
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      // check if follow request already sent
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        // create new follow request
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong switching follow!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });
    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong switching block!");
  }
};

export const acceptFollowRequest = async (
  requestId: number,
  userId: string
) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    await prisma.followRequest.delete({
      where: {
        id: requestId,
      },
    });

    await prisma.follower.create({
      data: {
        followerId: userId,
        followingId: currentUserId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong accepting request!");
  }
};

export const rejectFollowRequest = async (
  requestId: number,
  userId: string
) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    await prisma.followRequest.delete({
      where: {
        id: requestId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong rejecting request!");
  }
};

export const updateProfile = async (formData: FormData, cover: string) => {
  formData.append("cover", cover);

  const fields = Object.fromEntries(formData);

  Object.keys(fields).forEach((key) => {
    if (fields[key] === "") {
      delete fields[key];
    }
  });

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(5).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(255).optional(),
  });

  const validatedFields = Profile.safeParse(fields);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    throw new Error("Invalid fields!");
  }

  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: validatedFields.data,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong updating user profile!");
  }
};

export const switchPostLike = async (postId: number) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: currentUserId,
        postId,
      },
    });
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: currentUserId,
          postId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong switching post like!");
  }
};

export const addPostComment = async (postId: number, desc: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        postId,
        userId: currentUserId,
      },
      include: {
        user: true,
      },
    });
    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong adding post comment!");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;
  const Desc = z.string().min(1).max(255);
  const validateDesc = Desc.safeParse(desc);
  if (!validateDesc.success) {
    console.log(validateDesc.error.flatten().fieldErrors);
    throw new Error("Description required!");
  }

  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    const createdPost = await prisma.post.create({
      data: {
        desc: validateDesc.data,
        img,
        userId: currentUserId,
      },
      include: {
        user: true,
      },
    });

    revalidatePath("/");
    return createdPost;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong adding post!");
  }
};

export const deletePost = async (postId: number) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong deleting post!");
  }
};

export const deletePostComment = async (commentId: number) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong deleting comment!");
  }
};

export const addStory = async (img: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    // a user can only have one story at a time, try to remove the existing one first
    await prisma.story.deleteMany({
      where: {
        userId: currentUserId,
      },
    });

    const createdStory = await prisma.story.create({
      data: {
        img,
        userId: currentUserId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });
    return createdStory;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong adding story!");
  }
};

export const deleteStory = async (storyId: number) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    await prisma.story.delete({
      where: {
        id: storyId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong deleting story!");
  }
};

export const switchCommentLike = async (commentId: number) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: currentUserId,
        commentId,
      },
    });
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: currentUserId,
          commentId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong switching comment like!");
  }
};
