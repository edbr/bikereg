import { pageMetadata } from "@/lib/site";

export const metadata = {
  ...pageMetadata("/dashboard", "Bicycle Registry Dashboard | FrameProof", "Connect a wallet to register bicycles and manage ownership transfers in the FrameProof prototype."),
  robots: { index: false, follow: true },
};

import { DashboardClient } from "@/components/dashboard-client";

export default function DashboardPage() {
  return <DashboardClient />;
}
