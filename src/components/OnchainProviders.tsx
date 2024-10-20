"use client";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { base } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { NEXT_PUBLIC_CDP_API_KEY } from "../config";
import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended Wallet",
      wallets: [coinbaseWallet],
    },
    {
      groupName: "Other Wallets",
      wallets: [rainbowWallet, metaMaskWallet],
    },
  ],
  {
    appName: "onchainkit",
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  }
);

const wagmiConfig = getDefaultConfig({
  appName: "onchainkit",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  chains: [base],
  ssr: true, // If your dApp uses server side rendering (SSR)
 // connectors, // Include connectors here to avoid errors
});

function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={NEXT_PUBLIC_CDP_API_KEY} chain={base}>
          <div className=" max-w-screen w-screen h-full ">
            <RainbowKitProvider modalSize="wide" >
              {children}
            </RainbowKitProvider>
          </div>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
