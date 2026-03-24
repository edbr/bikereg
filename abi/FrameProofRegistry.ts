export const frameProofRegistryAbi = [
  {
    type: "event",
    name: "BikeRegistered",
    inputs: [
      { indexed: true, name: "tokenId", type: "uint256" },
      { indexed: true, name: "owner", type: "address" },
      { indexed: false, name: "serialNumber", type: "string" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BikeTransferred",
    inputs: [
      { indexed: true, name: "tokenId", type: "uint256" },
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
    ],
    anonymous: false,
  },
  {
    type: "function",
    name: "registerBike",
    stateMutability: "nonpayable",
    inputs: [
      { name: "nickname", type: "string" },
      { name: "brand", type: "string" },
      { name: "model", type: "string" },
      { name: "year", type: "uint16" },
      { name: "serialNumber", type: "string" },
      { name: "color", type: "string" },
      { name: "imageUri", type: "string" },
    ],
    outputs: [{ name: "tokenId", type: "uint256" }],
  },
  {
    type: "function",
    name: "getBike",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "nickname", type: "string" },
          { name: "brand", type: "string" },
          { name: "model", type: "string" },
          { name: "year", type: "uint16" },
          { name: "serialNumber", type: "string" },
          { name: "color", type: "string" },
          { name: "imageUri", type: "string" },
          { name: "registeredAt", type: "uint256" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "ownerOf",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "tokensOfOwner",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "uint256[]" }],
  },
  {
    type: "function",
    name: "safeTransferFrom",
    stateMutability: "nonpayable",
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    outputs: [],
  },
] as const;
