import { createPublicClient, http, isAddress } from "viem";

import { frameProofRegistryAbi } from "@/abi/FrameProofRegistry";
import { env } from "@/lib/env";
import { frameProofChain, frameProofRpcUrl } from "@/lib/frameproof-network";
import { mockBikes } from "@/lib/mock-data";
import { Bike, BikeFormValues } from "@/lib/types";

const publicClient = createPublicClient({
  chain: frameProofChain,
  transport: http(frameProofRpcUrl),
});

export function hasUsableContractConfig() {
  return Boolean(env.contractAddress && isAddress(env.contractAddress));
}

function mapBikeResult(
  tokenId: bigint,
  owner: `0x${string}`,
  bike: {
    nickname: string;
    brand: string;
    model: string;
    year: number;
    serialNumber: string;
    color: string;
    imageUri: string;
    registeredAt: bigint;
  },
): Bike {
  return {
    tokenId,
    owner,
    nickname: bike.nickname,
    brand: bike.brand,
    model: bike.model,
    year: Number(bike.year),
    serialNumber: bike.serialNumber,
    color: bike.color,
    imageUri: bike.imageUri,
    registeredAt: Number(bike.registeredAt),
    source: "contract",
  };
}

export async function getBikeById(tokenId: bigint): Promise<Bike | null> {
  if (!hasUsableContractConfig() || !env.contractAddress) {
    return mockBikes.find((bike) => bike.tokenId === tokenId) ?? null;
  }

  try {
    const [bike, owner] = await Promise.all([
      publicClient.readContract({
        address: env.contractAddress,
        abi: frameProofRegistryAbi,
        functionName: "getBike",
        args: [tokenId],
      }),
      publicClient.readContract({
        address: env.contractAddress,
        abi: frameProofRegistryAbi,
        functionName: "ownerOf",
        args: [tokenId],
      }),
    ]);

    return mapBikeResult(tokenId, owner, bike);
  } catch {
    return mockBikes.find((item) => item.tokenId === tokenId) ?? null;
  }
}

export async function getBikesForOwner(owner: `0x${string}`): Promise<Bike[]> {
  if (!hasUsableContractConfig() || !env.contractAddress) {
    return mockBikes.filter((bike) => bike.owner.toLowerCase() === owner.toLowerCase());
  }

  try {
    const tokenIds = await publicClient.readContract({
      address: env.contractAddress,
      abi: frameProofRegistryAbi,
      functionName: "tokensOfOwner",
      args: [owner],
    });

    const bikes = await Promise.all(tokenIds.map((tokenId) => getBikeById(tokenId)));

    return bikes.filter((bike): bike is Bike => bike !== null);
  } catch {
    return mockBikes.filter((bike) => bike.owner.toLowerCase() === owner.toLowerCase());
  }
}

export function getRegisterBikeArgs(values: BikeFormValues) {
  return [
    values.nickname,
    values.brand,
    values.model,
    Number(values.year),
    values.serialNumber,
    values.color,
    values.imageUri || "",
  ] as const;
}
