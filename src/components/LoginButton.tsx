'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[90px] w-full lg:w-fit"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}
