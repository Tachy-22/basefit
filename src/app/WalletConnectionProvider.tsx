"use client";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { connectWallet } from "./actions/user";
import { setWallet } from "src/lib/redux/walletSlice";
import { useDispatch } from "react-redux";

const WalletConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    address,
    isConnecting,
    isDisconnected,
    isReconnecting,
    isConnected,
    status,
  } = useAccount();
  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      const checkUser = async () => {
        const userData = await connectWallet(address);
        console.log("userData from firebase : ", userData);
        dispatch(setWallet(userData as unknown as TWalletData));
      };
      checkUser();
    } else {
    }
  }, []);

  return <div>{children}</div>;
};

export default WalletConnectionProvider;
