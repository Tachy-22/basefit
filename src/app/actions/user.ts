"use server";
import {
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "src/lib/firebase";

interface User {
  walletAddress: string;
  name?: string;
  tokenBalance: number;
  fitnessTrackerConnected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getUserByWalletAddress(walletAddress: string) {
  try {
    const q = query(
      collection(db, "users"),
      where("walletAddress", "==", walletAddress)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      for (const doc of querySnapshot.docs) {
        console.log(doc.id, " => ", doc.data());
        const user: User = {
          id: doc.id,
          ...doc.data(),
        } as unknown as User;
        return user;
      }
    } else {
      console.log("No matching documents.");
      return null;
    }
  } catch (e) {
    console.error("Error getting documents: ", e);
    return null;
  }
}

export async function createUserWithWallet(walletAddress: string) {
  try {
    // User data to be created
    const userData: User = {
      walletAddress,
      name: "New User", // Placeholder, update this if needed
      tokenBalance: 0, // Initial token balance
      fitnessTrackerConnected: false, // Initial state
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Create the user document in Firestore
    const docRef = await addDoc(collection(db, "users"), userData);

    console.log("User added with ID: ", docRef.id);

    // Return the user data
    return {
      id: docRef.id,
      ...userData,
    };
  } catch (e) {
    console.error("Error adding user: ", e);
    throw e;
  }
}

export async function connectWallet(walletAddress: string) {
  try {
    // Check if a user with the provided wallet address already exists
    const existingUser = await getUserByWalletAddress(walletAddress);

    if (existingUser) {
      // Return existing user data
      return existingUser;
    } else {
      // Create a new user with the wallet address
      const newUser = await createUserWithWallet(walletAddress);
      return newUser;
    }
  } catch (e) {
    console.error("Error connecting wallet: ", e);
    throw e;
  }
}
