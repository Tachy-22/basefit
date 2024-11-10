"use server";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "src/lib/firebase";

interface User {
  [x: string]: any;
  walletAddress: string;
  name?: string;
  tokenBalance: number;
  fitnessTrackerConnected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function validateWalletAddress(walletAddress: string): boolean {
  // Basic Ethereum address validation
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(walletAddress);
}

function validateUser(userData: User): boolean {
  if (!validateWalletAddress(userData.walletAddress)) return false;
  if (userData.tokenBalance < 0) return false;
  if (typeof userData.fitnessTrackerConnected !== "boolean") return false;
  if (!(userData.createdAt instanceof Date)) return false;
  if (!(userData.updatedAt instanceof Date)) return false;
  return true;
}

export async function getUserByWalletAddress(walletAddress: string) {
  try {
    if (!validateWalletAddress(walletAddress)) {
      throw new Error("Invalid wallet address format");
    }

    const q = query(
      collection(db, "users"),
      where("walletAddress", "==", walletAddress)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const userData = doc.data();
      const user: User = {
        id: doc.id,
        ...userData,
        createdAt: userData.createdAt.toDate(),
        updatedAt: userData.updatedAt.toDate(),
      } as unknown as User;

      if (!validateUser(user)) {
        throw new Error("Invalid user data format");
      }

      return user;
    }

    console.log("No matching documents.");
    return null;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return null;
  }
}

export async function createUserWithWallet(walletAddress: string) {
  try {
    if (!validateWalletAddress(walletAddress)) {
      throw new Error("Invalid wallet address format");
    }

    const existingUser = await getUserByWalletAddress(walletAddress);
    if (existingUser) {
      console.log("User already exists");
      return existingUser;
    }

    const userData: User = {
      walletAddress,
      name: "New User",
      tokenBalance: 0,
      fitnessTrackerConnected: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!validateUser(userData)) {
      throw new Error("Invalid user data format");
    }

    const docRef = await addDoc(collection(db, "users"), userData);

    console.log("User added with ID: ", docRef.id);

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
    if (!validateWalletAddress(walletAddress)) {
      throw new Error("Invalid wallet address format");
    }

    const existingUser = await getUserByWalletAddress(walletAddress);

    if (existingUser) {
      console.log({ existingUser });
      return existingUser;
    } else {
      const newUser = await createUserWithWallet(walletAddress);
      console.log({ newUser });
      return newUser;
    }
  } catch (e) {
    console.error("Error connecting wallet: ", e);
    throw e;
  }
}

export const checkWaitlist = async (walletAddress: string) => {
  const q = query(
    collection(db, "Waitlist"),
    where("Wallet", "==", walletAddress)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
