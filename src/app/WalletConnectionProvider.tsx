"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { connectWallet } from "./actions/user";
import { setWallet } from "src/lib/redux/walletSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface WalletConnectionProviderProps {
  children: React.ReactNode;
}

const WalletConnectionProvider: React.FC<WalletConnectionProviderProps> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const checkUserAndSetWallet = async () => {
      if (address && isConnected) {
        // Fetch user data from Firebase
        const userData = await connectWallet(address);
        console.log("userData from firebase : ", userData);
        // Update Redux store with wallet data
        dispatch(setWallet(userData as unknown as TWalletData));
      } else {
        // Show message when navigation is done and wallet is not connected
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000); // Hide message after 5 seconds
      }
    };

    checkUserAndSetWallet();
  }, [address, isConnected, dispatch]);

  // Render children components and message
  return (
    <>
      {showMessage && !isConnected && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#f0f0f0',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          Please connect your wallet to access all features.
        </div>
      )}
      {children}
    </>
  );
};

export default WalletConnectionProvider;
