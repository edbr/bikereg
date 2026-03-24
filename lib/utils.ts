import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address?: string, size = 4) {
  if (!address) return "Not connected";
  return `${address.slice(0, 2 + size)}...${address.slice(-size)}`;
}

export function formatTokenId(tokenId: bigint | number | string) {
  return `#${tokenId.toString()}`;
}

export function formatTimestamp(timestamp?: number) {
  if (!timestamp) return "Unavailable";
  return new Date(timestamp * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getBikeDisplayName(brand: string, model: string, nickname?: string) {
  return nickname ? `${nickname} · ${brand} ${model}` : `${brand} ${model}`;
}
