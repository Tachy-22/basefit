"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import SignupButton from "./SignupButton";
import LoginButton from "./LoginButton";

const AppNavbar = () => {
  const { address } = useAccount();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const connectWallet = () => {
    console.log("Wallet connected!");
  };

  return (
    <Navbar isBordered maxWidth="2xl">
      <NavbarContent justify="start">
        <NavbarBrand className="w-full">
          <Link href="/" className="text-2xl font-bold ">
            BaseFit
          </Link>
        </NavbarBrand>
        <NavbarContent
          justify="end"
          className="hidden md:flex gap-6  w-full min-w-full mx-auto  justify-center text-white"
        >
          <NavbarItem>
            <Link href="/dashboard" color="foreground">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/challenges" color="foreground">
              Challenges
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/marketplace" color="foreground">
              Marketplace
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/charity" color="foreground">
              Charity
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/profile" color="foreground">
              Profile
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        {/* <Button onClick={connectWallet} color="primary">
          Connect Wallet
        </Button> */}
        {/* {address ? (
          <TransactionWrapper address={address} />
        ) : (
          <WalletWrapper
            className="w-[450px] max-w-full"
            text="Sign in to transact"
          />
        )} */}
        <div className="flex items-center gap-3">
          <SignupButton />
          {!address && <LoginButton />}
        </div>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarContent className="md:hidden">
        <Button onClick={toggleMenu}>{isOpen ? "Close" : "Menu"}</Button>
      </NavbarContent>

      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="absolute w-full bg-white shadow-md md:hidden"
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link href="/dashboard" onClick={toggleMenu}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/challenges" onClick={toggleMenu}>
                Challenges
              </Link>
            </li>
            <li>
              <Link href="/marketplace" onClick={toggleMenu}>
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="/charity" onClick={toggleMenu}>
                Charity
              </Link>
            </li>
            <li>
              <Link href="/profile" onClick={toggleMenu}>
                Profile
              </Link>
            </li>
            <li>
              <Button
                onClick={() => {
                  connectWallet();
                  toggleMenu();
                }}
                color="primary"
              >
                Connect Wallet
              </Button>
            </li>
          </ul>
        </motion.div>
      )}
    </Navbar>
  );
};

export default AppNavbar;
