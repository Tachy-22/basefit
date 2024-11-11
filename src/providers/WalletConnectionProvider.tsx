"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
import { setWallet } from "src/lib/redux/walletSlice";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { checkWaitlist, connectWallet } from "src/actions/user";
import { testNetworkConnection } from "src/actions/networkTest";

interface WalletConnectionProviderProps {
  children: React.ReactNode;
}

const WalletConnectionProvider: React.FC<WalletConnectionProviderProps> = ({
  children,
}) => {
  const { address, isConnected, isReconnecting } = useAccount();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUserAndSetWallet = async () => {
      try {
        const isInternetConnection = await testNetworkConnection();

        // Check if wallet is connected and internet connection is available
        if (address && isConnected && isInternetConnection && !isReconnecting) {
          document.cookie = "wallet-connection=TRUE; path=/;";

          // Check if the wallet address is on the waitlist
          const isOnWaitlist = await checkWaitlist(address);
          if (!isOnWaitlist) {
            toast.info("Your wallet is not on the waitlist. Redirecting...");
            router.push("/waitlist");
            return;
          }

          // If on the waitlist, proceed to connect the wallet
          const userData = await connectWallet(address);
          toast.success("Wallet connected successfully!");
          toast.success("Redirecting to Dashboard...");

          router.push(`/user/${userData.id}/dashboard`);
          dispatch(setWallet(userData as unknown as TWalletData));
        } else {
          // Handle scenario when wallet is not connected or internet is unavailable
          document.cookie = "wallet-connection=FALSE; path=/;";
          router.push(`/`);
          toast.warn("Wallet is not connected. Redirecting to homepage.");

          if (!isInternetConnection) {
            toast.warn("Please check your internet connection.");
          }
        }
      } catch (error) {
        // Catch any error during the network or wallet connection process
        console.error("Error connecting wallet:", error);
        toast.error("Failed to connect wallet. Please try again.");
      }
    };

    checkUserAndSetWallet();
  }, [address, isConnected, dispatch, router, pathname]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {children}
    </>
  );
};

export default WalletConnectionProvider;
