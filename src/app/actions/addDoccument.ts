"use server";

import { addDoc, collection } from "firebase/firestore";

import { revalidatePath } from "next/cache";

import { db, storage } from "@/lib/firebase";

export const addDoccument = async (
  formData: FormData,
  folder: string,
  path: string
): Promise<void> => {
  console.log({ formData });

  try {
    const data = Object.fromEntries(formData) as any;
   

    await addDoc(collection(db, folder), data);

    // Revalidate path
    revalidatePath(path, "page");
  } catch (error) {
    console.error("Error adding document post: ", error);
    throw error;
  }
};
