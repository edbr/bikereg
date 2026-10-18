import { pageMetadata } from "@/lib/site";

import { BikeDetailClient } from "@/components/bike-detail-client";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const validId = /^\d+$/.test(id);
  const label = validId ? ` #${id}` : "";
  return {
    ...pageMetadata(
      `/bike/${encodeURIComponent(id)}`,
      `Bicycle Record${label} | FrameProof`,
      `Explore the FrameProof bicycle ownership registry and inspect bicycle record${label}. A Web3 product design project by Eduardo Belluti.`,
    ),
    ...(!validId ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function BikePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BikeDetailClient id={id} />;
}
