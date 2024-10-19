"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { connectWallet } from "./actions/user";
import { setWallet } from "src/lib/redux/walletSlice";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

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
        // Fetch user data from Firebase
        const userData = await connectWallet(address);
        console.log("userData from firebase : ", userData);
        // Update Redux store with wallet data
        dispatch(setWallet(userData as unknown as TWalletData));
        setIsLoading(false);
      } else if (pathname !== "/") {
        // Redirect to homepage if not connected and not already on homepage
        router.push('/');
      } else {
        // If on homepage, allow loading without connection
        setIsLoading(false);
      }
    };

    checkUserAndSetWallet();
  }, [address, isConnected, dispatch, router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  // Render children if connected or on homepage
  return (isConnected || pathname === "/") ? <>{children}</> : null;
};

export default WalletConnectionProvider;
