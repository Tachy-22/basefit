"use server"


import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const updatePdfLink = async (
  id: string,
  folder: string,
  pdfLink: string,
  path: string
): Promise<void> => {
  try {
    const docRef = doc(db, folder, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const res = await updateDoc(docRef, { pdfLink });
      revalidatePath(path, "page");
      return res;
    } else {
      console.error("Document does not exist.");
      throw new Error("Document does not exist.");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};
