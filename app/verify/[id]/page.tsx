import { VerifyClient } from "@/components/verify-client";

export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VerifyClient id={id} />;
}
