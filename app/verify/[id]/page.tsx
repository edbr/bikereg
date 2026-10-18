import { pageMetadata } from "@/lib/site";

import { VerifyClient } from "@/components/verify-client";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const validId = /^\d+$/.test(id);
  const label = validId ? ` #${id}` : "";
  return {
    ...pageMetadata(
      `/verify/${encodeURIComponent(id)}`,
      `Verify Bicycle Ownership${label} | FrameProof`,
      `Explore the FrameProof bicycle ownership registry and inspect bicycle record${label}. A Web3 product design project by Eduardo Belluti.`,
    ),
    ...(!validId ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VerifyClient id={id} />;
}
