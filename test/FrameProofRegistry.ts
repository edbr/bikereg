import { expect } from "chai";
import { ethers } from "hardhat";

describe("FrameProofRegistry", function () {
  async function deployRegistry() {
    const registryFactory = await ethers.getContractFactory("FrameProofRegistry");
    const registry = await registryFactory.deploy();
    await registry.waitForDeployment();
    return registry;
  }

  async function registerBike(serialNumber = "SERIAL-001") {
    const registry = await deployRegistry();
    const tx = await registry.registerBike(
      "City Sprint",
      "Specialized",
      "Sirrus X",
      2024,
      serialNumber,
      "Black",
      "https://example.com/bike.jpg",
    );
    await tx.wait();
    return registry;
  }

  it("mints a bike with structured metadata", async function () {
    const [owner] = await ethers.getSigners();
    const registry = await registerBike();

    expect(await registry.ownerOf(1n)).to.equal(owner.address);

    const bike = await registry.getBike(1n);
    expect(bike.nickname).to.equal("City Sprint");
    expect(bike.serialNumber).to.equal("SERIAL-001");
    expect(await (registry as any).serialNumberRegistered("SERIAL-001")).to.equal(true);
  });

  it("rejects duplicate serial numbers", async function () {
    const registry = await registerBike("DUPLICATE-001");

    await expect(
      registry.registerBike("Roadster", "Trek", "FX 3", 2024, "DUPLICATE-001", "Blue", ""),
    ).to.be.revertedWith("Serial already registered");
  });

  it("lists minted token ids for the owner", async function () {
    const registry = await deployRegistry();

    await (await registry.registerBike("Bike One", "Surly", "Bridge Club", 2023, "OWNER-001", "Green", "")).wait();
    await (await registry.registerBike("Bike Two", "Cannondale", "Quick", 2022, "OWNER-002", "Silver", "")).wait();

    const tokenIds = await registry.tokensOfOwner((await ethers.getSigners())[0].address);
    expect(tokenIds).to.deep.equal([1n, 2n]);
  });

  it("emits a transfer event when ownership changes", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const registry = await registerBike("TRANSFER-001");

    await expect(registry["safeTransferFrom(address,address,uint256)"](owner.address, recipient.address, 1n))
      .to.emit(registry, "BikeTransferred")
      .withArgs(1n, owner.address, recipient.address);
  });
});
