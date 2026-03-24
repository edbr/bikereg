"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";

import { frameProofChain, frameProofRpcUrl } from "@/lib/frameproof-network";

export const wagmiConfig = getDefaultConfig({
  appName: "FrameProof",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-walletconnect-project-id",
  chains: [frameProofChain],
  transports: {
    [frameProofChain.id]: http(frameProofRpcUrl),
  },
  ssr: true,
});
