"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { setWallet } from "src/lib/redux/walletSlice";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "src/lib/firebase";
import { checkWaitlist, connectWallet } from "src/actions/user";

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

  useEffect(() => {
    const checkUserAndSetWallet = async () => {
      if (address && isConnected) {
        document.cookie = "wallet-connection=TRUE; path=/;";
        try {
          // Check if wallet is on waitlist
          const isOnWaitlist = await checkWaitlist(address);
          console.log({ isOnWaitlist });
          if (!isOnWaitlist) {
            router.push("/waitlist");
            setIsLoading(false);
            return;
          }

          // Fetch user data from Firebase
          const userData = await connectWallet(address);
          console.log("userData from firebase : ", userData);
          //push to dashboard
       //   router.push(`/user/${userData.id}/dashboard`);
          // Update Redux store with wallet data
          dispatch(setWallet(userData as unknown as TWalletData));
        } catch (error) {
          console.error("Error connecting wallet:", error);
          // Handle the error appropriately - maybe show a notification to the user
        } finally {
          setIsLoading(false);
        }
      } else {
        router.push(`/`);
        document.cookie = "wallet-connection=FALSE; path=/;";
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
  return <>{children}</>;
};

export default WalletConnectionProvider;
