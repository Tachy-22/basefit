'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[200px] h-12 text-lg shadow-lg shadow-cyan-500/30"
      text="Login"
      withWalletAggregator={true}
    />
  );
}
