import { baseSepolia, hardhat, sepolia } from "viem/chains";

import { env } from "@/lib/env";

export const frameProofChain =
  env.chain === "localhost" ? hardhat : env.chain === "base-sepolia" ? baseSepolia : sepolia;

export const frameProofRpcUrl =
  env.chain === "localhost"
    ? env.localhostRpcUrl
    : env.chain === "base-sepolia"
      ? env.baseSepoliaRpcUrl
      : env.sepoliaRpcUrl;

export const frameProofNetworkLabel =
  env.chain === "localhost" ? "localhost" : env.chain === "base-sepolia" ? "Base Sepolia" : "Sepolia";
