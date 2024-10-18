"use server";

import { db } from "src/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import { revalidatePath } from "next/cache";

export const deleteDoccument = async (
  id: string,
  folder: string,
  path: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, folder, id));

    revalidatePath(path, "page");
  } catch (error) {
    console.error("Error deleting item: ", error);
    throw error;
  }
};
