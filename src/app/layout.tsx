import type { Metadata } from "next";
//import { NEXT_PUBLIC_URL } from "../config";

import "./global.css";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import NextProviders from "../providers/NextProviders";
import StoreProvider from "../providers/ReduxProvider";
import WalletConnectionProvider from "../providers/WalletConnectionProvider";
import OnchainProviders from "../providers/OnchainProviders";
import { testNetworkConnection } from "src/actions/networkTest";

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "BaseFit",
  description: "A Decentralized Fitness platform",
  openGraph: {
    title: "BaseFit",
    description: "A Decentralized Fitness platform",
    images: [`metaimg.png`],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className="scrollbar-hide bg-red-400 h-screen max-h-screen overflow-y-hidden"
    >
      <body className="flex items-center justify-center  bg-cyan-950 overflow-y-auto min-h-full scrollbar-hide">
        <StoreProvider>
          {" "}
          <NextProviders>
            {" "}
            <OnchainProviders>
              <WalletConnectionProvider> {children}</WalletConnectionProvider>
            </OnchainProviders>
          </NextProviders>
        </StoreProvider>
      </body>
    </html>
  );
}
