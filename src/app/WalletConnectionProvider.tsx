"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { connectWallet } from "./actions/user";
import { setWallet } from "src/lib/redux/walletSlice";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "src/lib/firebase";

interface WalletConnectionProviderProps {
  children: React.ReactNode;
}

const WalletConnectionProvider: React.FC<WalletConnectionProviderProps> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const checkWaitlist = async (walletAddress: string) => {
    const q = query(
      collection(db, "Waitlist"),
      where("Wallet", "==", walletAddress)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  useEffect(() => {
    const checkUserAndSetWallet = async () => {
      if (address && isConnected) {
        try {
          // Check if wallet is on waitlist
          const isOnWaitlist = await checkWaitlist(address);
          
          if (!isOnWaitlist) {
            router.push("/waitlist");
            setIsLoading(false);
            return;
          }

          // Fetch user data from Firebase
          const userData = await connectWallet(address);
          console.log("userData from firebase : ", userData);
          // Update Redux store with wallet data
          dispatch(setWallet(userData as unknown as TWalletData));
          
          // Navigate to home if on waitlist
          // if (pathname === "/waitlist") {
          //   router.push("/");
          // }

        } catch (error) {
          console.error("Error connecting wallet:", error);
          // Handle the error appropriately - maybe show a notification to the user
        } finally {
          setIsLoading(false);
        }
      } else if (pathname !== "/" && pathname !== "/waitlist") {
        // Redirect to homepage if not connected and not on homepage or waitlist
        router.push("/");
      } else {
        // If on homepage or waitlist, allow loading without connection
        setIsLoading(false);
      }
    };

    checkUserAndSetWallet();
  }, [address, isConnected, dispatch, router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  // Render children if connected or on homepage or waitlist
  return isConnected || pathname === "/" || pathname === "/waitlist" ? (
    <>{children}</>
  ) : null;
};

export default WalletConnectionProvider;
