import { ActivityItem, Bike } from "@/lib/types";

export const mockBikes: Bike[] = [
  {
    tokenId: BigInt(1),
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    nickname: "City Sprint",
    brand: "Specialized",
    model: "Sirrus X",
    year: 2023,
    serialNumber: "SPX-9A23-7781",
    color: "Matte Black",
    imageUri: "",
    registeredAt: 1716998400,
    source: "mock",
  },
  {
    tokenId: BigInt(2),
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    nickname: "Weekend Gravel",
    brand: "Trek",
    model: "Checkpoint ALR",
    year: 2022,
    serialNumber: "TRK-GRVL-2219",
    color: "Slate Green",
    imageUri: "",
    registeredAt: 1718812800,
    source: "mock",
  },
  {
    tokenId: BigInt(3),
    owner: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    nickname: "Commuter One",
    brand: "Cannondale",
    model: "Quick 3",
    year: 2021,
    serialNumber: "CND-QUK-3102",
    color: "Pearl White",
    imageUri: "",
    registeredAt: 1721174400,
    source: "mock",
  },
];

export const mockActivity: ActivityItem[] = [
  {
    id: "activity-1",
    type: "registered",
    title: "Bike #1 registered onchain",
    timestamp: "2 hours ago",
  },
  {
    id: "activity-2",
    type: "transferred",
    title: "Bike #8 transferred to a new wallet",
    timestamp: "Yesterday",
  },
  {
    id: "activity-3",
    type: "registered",
    title: "Bike #12 verified publicly",
    timestamp: "3 days ago",
  },
];
