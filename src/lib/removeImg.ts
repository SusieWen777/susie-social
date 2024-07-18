"use server";

import crypto from "crypto";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";

const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

const getPublicIdFromUrl = (url: string) => {
  const match = url.match(regex);
  return match ? match[1] : null;
};

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string | undefined) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const handleDeleteImage = async (secureUrl: string) => {
  const publicId = getPublicIdFromUrl(secureUrl);

  if (!publicId) throw new Error("Invalid image URL");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const timestamp = new Date().getTime();
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("Unauthorized user!");

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });
  } catch (error) {
    console.error(error);
  }
};
