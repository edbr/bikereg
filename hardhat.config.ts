import { config as loadEnv } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

loadEnv();

const rawPrivateKey = process.env.PRIVATE_KEY?.trim();
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const normalizedPrivateKey =
  rawPrivateKey && rawPrivateKey.startsWith("0x") ? rawPrivateKey : rawPrivateKey ? `0x${rawPrivateKey}` : undefined;
const hasValidPrivateKey = Boolean(normalizedPrivateKey && /^0x[a-fA-F0-9]{64}$/.test(normalizedPrivateKey));

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: SEPOLIA_RPC_URL || "",
      // Ignore placeholder or malformed keys so local Hardhat commands still work.
      accounts: hasValidPrivateKey && normalizedPrivateKey ? [normalizedPrivateKey] : [],
    },
  },
};

export default config;
