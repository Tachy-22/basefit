"use server";

import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { revalidatePath } from "next/cache";
import { uploadFile } from "./addFile";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";


export const updateDoccument = async (
  id: string,
  folder: string,
  formData: FormData,
  path: string,
  field?: string
): Promise<void> => {
  try {
    const docRef = doc(db, folder, id);
    const docSnap = await getDoc(docRef);

    const { file, htmlMarkUp, ...data } = Object.fromEntries(formData) as any;
    if (file) {
      const imageUrl = await uploadFile(formData, "images");
      data.image = imageUrl;
    }
    if (htmlMarkUp) {
      // Upload htmlMarkUp to Firebase Storage as plain text
      console.log({ htmlMarkUp });
      const htmlMarkUpRef = ref(storage, `reportMKUs/report_${Date.now()}.html`);
      await uploadString(htmlMarkUpRef, compressToUTF16(htmlMarkUp), "raw", {
        contentType: "text/html",
      });
      const htmlMarkUpUrl = await getDownloadURL(htmlMarkUpRef);
      data.htmlMarkUpUrl = htmlMarkUpUrl;
      delete data.htmlMarkUp; // Remove htmlMarkUp from the data to be stored in Firestore
    }
    if (docSnap.exists()) {
      const res = field
        ? await updateDoc(docRef, { [field]: { data } })
        : await updateDoc(docRef, data);

      revalidatePath(path, "page");
      return res;
    } else {
      const res = field
        ? await setDoc(docRef, { [field]: { data } })
        : await setDoc(docRef, data);
      revalidatePath(path, "page");
      return res;
    }
  } catch (error) {
    console.error("Error updating doccument: ", error);
    throw error;
  }
};
