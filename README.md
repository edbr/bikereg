# FrameProof

FrameProof is a production-ready MVP for registering and verifying bicycle ownership onchain. Each bicycle is minted as an ERC-721 NFT and includes structured metadata stored in the registry contract.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- wagmi
- viem
- RainbowKit
- Hardhat
- OpenZeppelin

## Environment setup

1. Copy deployment env:

```bash
cp .env.example .env
```

2. Copy frontend env:

```bash
cp .env.local.example .env.local
```

3. Fill in these values:

- `.env`
  - `SEPOLIA_RPC_URL`
  - `PRIVATE_KEY`
- `.env.local`
  - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
  - `NEXT_PUBLIC_SEPOLIA_RPC_URL`
  - `NEXT_PUBLIC_FRAMEPROOF_CONTRACT_ADDRESS`

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Compile the contract

```bash
npm run compile
```

## Deploy to localhost

Start a local node in one terminal:

```bash
npx hardhat node
```

Deploy in another:

```bash
npm run deploy:local
```

After deploy, copy the contract address into `.env.local` as `NEXT_PUBLIC_FRAMEPROOF_CONTRACT_ADDRESS`.

## Deploy to Sepolia

```bash
npm run deploy:sepolia
```

After deploy, update `.env.local` with the deployed Sepolia address and restart the Next.js dev server.

## Notes

- If contract reads fail or the contract address is not configured, the UI falls back to mock bike data.
- Transfer and registration actions require a connected wallet and a valid deployed contract address.
- The ABI file in `abi/FrameProofRegistry.ts` mirrors the included Solidity contract for frontend integration.
