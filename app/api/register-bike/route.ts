import { NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http, isAddress } from "viem";
import { hardhat, sepolia } from "viem/chains";
import { z } from "zod";

import { frameProofRegistryAbi } from "@/abi/FrameProofRegistry";

const requestSchema = z.object({
  nickname: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1900).max(9999),
  serialNumber: z.string().min(1),
  color: z.string().min(1),
  imageUri: z.string().optional(),
});

export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_FRAMEPROOF_CHAIN !== "localhost") {
    return NextResponse.json({ error: "Local dev signer only runs on localhost mode." }, { status: 400 });
  }

  if (process.env.NEXT_PUBLIC_ALLOW_LOCAL_DEV_SIGNER !== "true") {
    return NextResponse.json({ error: "Local dev signer is disabled." }, { status: 400 });
  }

  const privateKey = process.env.LOCAL_DEV_PRIVATE_KEY;
  const contractAddress = process.env.NEXT_PUBLIC_FRAMEPROOF_CONTRACT_ADDRESS;
  const rpcUrl = process.env.NEXT_PUBLIC_LOCALHOST_RPC_URL || "http://127.0.0.1:8545";

  if (!privateKey) {
    return NextResponse.json({ error: "Missing LOCAL_DEV_PRIVATE_KEY." }, { status: 500 });
  }

  if (!contractAddress || !isAddress(contractAddress)) {
    return NextResponse.json({ error: "Missing valid contract address." }, { status: 500 });
  }

  const payload = requestSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  try {
    const account = privateKeyToAccount(privateKey as `0x${string}`);
    const walletClient = createWalletClient({
      account,
      chain: process.env.NEXT_PUBLIC_FRAMEPROOF_CHAIN === "localhost" ? hardhat : sepolia,
      transport: http(rpcUrl),
    });

    const hash = await walletClient.writeContract({
      address: contractAddress,
      abi: frameProofRegistryAbi,
      functionName: "registerBike",
      args: [
        payload.data.nickname,
        payload.data.brand,
        payload.data.model,
        payload.data.year,
        payload.data.serialNumber,
        payload.data.color,
        payload.data.imageUri || "",
      ],
    });

    return NextResponse.json({ hash });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
