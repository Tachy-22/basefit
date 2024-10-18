"use server";

// lib/firebaseUpload.ts

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

// Function to upload a file to Firebase Storage
export const uploadFile = async (
  formData: FormData,
  folder: string
): Promise<string> => {
  const { file } = Object.fromEntries(formData);
  try {
    const files = file as File;
    // Create a storage reference
    const fileRef = ref(storage, `${folder}/${files.name}`);

    // Upload the file
    const snapshot = await uploadBytes(fileRef, files);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};
