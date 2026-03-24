import hardhat from "hardhat";
import { formatEther } from "ethers";

const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);

  console.log("Deploying FrameProofRegistry with:", deployer.address);
  console.log("Deployer balance (ETH):", formatEther(balance));

  const registryFactory = await ethers.getContractFactory("FrameProofRegistry");
  const registry = await registryFactory.deploy();

  await registry.waitForDeployment();

  const address = await registry.getAddress();

  console.log("FrameProofRegistry deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
