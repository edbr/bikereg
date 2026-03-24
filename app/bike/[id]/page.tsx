import { BikeDetailClient } from "@/components/bike-detail-client";

export default async function BikePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BikeDetailClient id={id} />;
}
