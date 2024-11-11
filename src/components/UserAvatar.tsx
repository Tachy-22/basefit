"use client";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function UserAvatar() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      console.log("Wallet disconnected");
     // seting cookies for middleware
      document.cookie = "wallet-connection=FALSE; path=/;";
      //
     // router.push(`/`);
    }
  }, [isConnected]);

  return (
    <div className="flex lg:justify-end pl-3 lg:pl-0 w-full">
      <Wallet className="">
        {/* <ConnectWallet className=" !   flex flex-col  items-end justify-end gap-3">
          <Avatar className="h-6 w-6 !bg-transparen !text- accent-white" />
          <Name className="bg-transparen !text" />
          {/* <EthBalance className="" />
        </ConnectWallet> */}
        <WalletDropdown className=" !text">
          <Identity
            className="px-4 pt-3 pb-2 w-full  !text"
            hasCopyAddressOnClick
          >
            <Avatar className="" />
            <Name className="" />
            <Address
              className=""
              // className={color.foregroundMuted}
            />
            <EthBalance className="" />
          </Identity>
          <WalletDropdownBasename
            className=""
            //  text="#ffffff "
          />
          <WalletDropdownDisconnect
            className=""
            //  text="#ffffff "
          />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
