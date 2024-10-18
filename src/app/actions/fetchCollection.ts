import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface FetchCollectionParams {
  folder: string;
  filters?: { [key: string]: any }; // Optional filters for key-value pairs
  fields?: string[]; // Optional fields to extract
  stakeholderEmail?: string; // Optional email to filter stakeholders
}

const fetchCollection = async ({
  folder,
  filters,
  fields,
  stakeholderEmail,
}: FetchCollectionParams): Promise<any[]> => {
  try {
    // Define the base collection reference
    let collectionRef = collection(db, folder);

    // Apply filters if provided
    if (filters) {
      const queries = Object.entries(filters).map(([key, value]) =>
        where(key, "==", value)
      );
      const filteredQuery = query(collectionRef, ...queries);
      collectionRef = filteredQuery as any;
    }

    const docSnapshot = await getDocs(collectionRef);
    let docList = docSnapshot.docs.map((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      } as any;
      return data;
    });

    // Filter based on stakeholderEmail if provided
    if (stakeholderEmail) {
      docList = docList.filter((doc) => {
        try {
          const stakeholders = JSON.parse(doc.stakeholders);
          return stakeholders.includes(stakeholderEmail);
        } catch (error) {
          console.error("Error parsing stakeholders: ", error);
          return false;
        }
      });
    }

    if (fields) {
      docList = docList.map((data) =>
        fields.reduce((result, field) => {
          if (data[field] !== undefined) {
            result[field] = data[field];
          }
          return result;
        }, {} as { [key: string]: any })
      );
    }

    return docList;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};

export default fetchCollection;
