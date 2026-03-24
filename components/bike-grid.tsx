import { BikeCard } from "@/components/bike-card";
import { Bike } from "@/lib/types";

export function BikeGrid({ bikes }: { bikes: Bike[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {bikes.map((bike) => (
        <BikeCard key={bike.tokenId.toString()} bike={bike} />
      ))}
    </div>
  );
}
