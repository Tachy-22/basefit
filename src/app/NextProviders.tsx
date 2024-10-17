"use client";
import { NextUIProvider } from "@nextui-org/react";

import React, { ReactNode } from "react";

function NextProviders({ children }: { children: ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default NextProviders;
