"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { baseSepolia, hardhat, sepolia } from "wagmi/chains";

import { env } from "@/lib/env";

const activeChain =
  env.chain === "localhost" ? hardhat : env.chain === "base-sepolia" ? baseSepolia : sepolia;
const activeRpcUrl =
  env.chain === "localhost"
    ? env.localhostRpcUrl
    : env.chain === "base-sepolia"
      ? env.baseSepoliaRpcUrl
      : env.sepoliaRpcUrl;

export const wagmiConfig = getDefaultConfig({
  appName: "FrameProof",
  projectId: env.walletConnectProjectId,
  chains: [activeChain],
  transports: {
    [activeChain.id]: http(activeRpcUrl),
  },
  ssr: true,
});
