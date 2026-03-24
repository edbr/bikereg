export type BikeMetadata = {
  nickname: string;
  brand: string;
  model: string;
  year: number;
  serialNumber: string;
  color: string;
  imageUri?: string;
  registeredAt?: number;
};

export type Bike = BikeMetadata & {
  tokenId: bigint;
  owner: `0x${string}`;
  source: "contract" | "mock";
};

export type BikeFormValues = {
  nickname: string;
  brand: string;
  model: string;
  year: number;
  serialNumber: string;
  color: string;
  imageUri?: string;
};

export type ActivityItem = {
  id: string;
  type: "registered" | "transferred";
  title: string;
  timestamp: string;
};
