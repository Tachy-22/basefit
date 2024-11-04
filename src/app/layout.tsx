import type { Metadata } from "next";
//import { NEXT_PUBLIC_URL } from "../config";

import "./global.css";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import dynamic from "next/dynamic";
import AppNavbar from "src/components/Navbar";
import NextProviders from "./NextProviders";
import StoreProvider from "./ReduxProvider";
import WalletConnectionProvider from "./WalletConnectionProvider";

const OnchainProviders = dynamic(
  () => import("src/components/OnchainProviders"),
  {
    ssr: false,
  }
);

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center scrollbar-hide bg-cyan-950 overflow-y-auto hide bar max-h-screen">
        <StoreProvider>
          {" "}
          <NextProviders>
            {" "}
            <OnchainProviders>
              <WalletConnectionProvider>
                {" "}
                <AppNavbar />
                {children}
              </WalletConnectionProvider>
            </OnchainProviders>
          </NextProviders>
        </StoreProvider>
      </body>
    </html>
  );
}
