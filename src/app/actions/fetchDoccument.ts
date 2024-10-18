"use server";

import { db, storage } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchDoccument = async (folder: string, doccument: string) => {
  try {
    const docRef = doc(db, folder, doccument);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as any;
    } else {
      console.error("Doccument not found");
    }
  } catch (error) {
    console.error("Error fetching Doccument: ", error);
    throw error;
  }
};
