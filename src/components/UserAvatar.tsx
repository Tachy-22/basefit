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

export default function UserAvatar() {
  return (
    <div className="flex lg:justify-end pl-3 lg:pl-0 w-full">
      <Wallet>
        <ConnectWallet className="!bg-transparent border text-white flex flex-col  items-end justify-end gap-3">
          {/* <Avatar className="h-6 w-6 text-white "  /> */}
          <Name className="text-white" />
          <EthBalance className="text-gray-200" />
        </ConnectWallet>
        <WalletDropdown className="">
          <Identity className="px-4 pt-3 pb-2 w-full " hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address className={color.foregroundMuted} />
            <EthBalance />
          </Identity>
          <WalletDropdownBasename />
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
