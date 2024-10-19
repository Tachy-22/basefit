"use client";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { connectWallet } from "./actions/user";
import { setWallet } from "src/lib/redux/walletSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

interface WalletConnectionProviderProps {
  children: React.ReactNode;
}

const WalletConnectionProvider: React.FC<WalletConnectionProviderProps> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkUserAndSetCookie = async () => {
      if (address && isConnected) {
        // Fetch user data from Firebase
        const userData = await connectWallet(address);
        console.log("userData from firebase : ", userData);
        // Update Redux store with wallet data
        dispatch(setWallet(userData as unknown as TWalletData));
        // Set a cookie to indicate wallet connection
        Cookies.set('wallet_token', 'connected', { expires: 7 }); // Expires in 7 days
      } else {
        // Remove the cookie if wallet is disconnected
        Cookies.remove('wallet_token');
      }
    };

    checkUserAndSetCookie();
  }, [address, isConnected, dispatch]);

  // Render children components
  return <>{children}</>;
};

export default WalletConnectionProvider;
