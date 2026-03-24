export const env = {
  chain: process.env.NEXT_PUBLIC_FRAMEPROOF_CHAIN || "sepolia",
  allowLocalDevSigner: process.env.NEXT_PUBLIC_ALLOW_LOCAL_DEV_SIGNER === "true",
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-walletconnect-project-id",
  sepoliaRpcUrl:
    process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com",
  baseSepoliaRpcUrl:
    process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
  localhostRpcUrl: process.env.NEXT_PUBLIC_LOCALHOST_RPC_URL || "http://127.0.0.1:8545",
  contractAddress: process.env.NEXT_PUBLIC_FRAMEPROOF_CONTRACT_ADDRESS as
    | `0x${string}`
    | undefined,
};
