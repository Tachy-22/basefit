"use client";
import {
  Avatar,
  Identity,
  Name,
  Badge,
  Address,
} from "@coinbase/onchainkit/identity";
import { base } from "viem/chains";

import { useAccount } from "wagmi";

import React from "react";

const UserAvatar = () => {
  const {
    address,
    isConnecting,
    isDisconnected,
    isReconnecting,
    isConnected,
    status,
  } = useAccount();
  
  return (
    <Identity
      address={address}
      chain={base}
      schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
      className="!bg-transparent text-white"
    >
      <Avatar />
      <Name className="text-white">
        <Badge />
      </Name>
      <Address className="text-white" />
    </Identity>
  );
};

export default UserAvatar;
