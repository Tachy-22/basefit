'use client';
import WalletWrapper from './WalletWrapper';

export default function SignupButton() {
  return (
    <WalletWrapper
      className="ockConnectWallet_Container w-full bg-slate-200 !text-[#030712] hover:bg-slate-300 min-w-full lg:w-fit"
      text="Sign up"
    />
  );
}
