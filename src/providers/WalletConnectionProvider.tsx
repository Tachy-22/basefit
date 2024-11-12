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

  console.log({ address, isConnected, isReconnecting });

  useEffect(() => {
    const checkUserAndSetWallet = async () => {
      try {
        const isInternetConnection = await testNetworkConnection();

        if (!isReconnecting) {
          if (address && isConnected && isInternetConnection) {
            document.cookie = "wallet-connection=TRUE; path=/;";

            const isOnWaitlist = await checkWaitlist(address);
            if (!isOnWaitlist) {
              toast.info("Your wallet is not on the waitlist. Redirecting...");
              router.push("/waitlist");
              return;
            }

            const userData = await connectWallet(address);
            const dashboardPath = `/user/${userData?.id}/dashboard`;

            // Only show toasts and redirect if the current path is not the dashboard
            if (pathname?.split("/")[0] !== "user") {
              toast.success("Wallet connected successfully!");
              toast.success("Redirecting to Dashboard...");
              router.push(dashboardPath);
            }

            dispatch(setWallet(userData as unknown as TWalletData));
          } else {
            document.cookie = "wallet-connection=FALSE; path=/;";
            if (pathname !== "/") {
              router.push(`/`);
              toast.warn("Wallet is not connected. Redirecting to homepage.");
            }

            if (!isInternetConnection) {
              toast.warn("Please check your internet connection.");
            }
          }
        }
      } catch (error) {
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
