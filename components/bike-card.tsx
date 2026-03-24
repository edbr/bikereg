import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bike as BikeGlyph } from "lucide-react";

import { CopyAddressButton } from "@/components/copy-address-button";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike } from "@/lib/types";
import { formatTokenId, truncateAddress } from "@/lib/utils";

export function BikeCard({ bike }: { bike: Bike }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 border-b border-white/10 bg-gradient-to-br from-white/10 to-transparent">
        {bike.imageUri ? (
          <Image src={bike.imageUri} alt={bike.nickname} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <BikeGlyph className="h-10 w-10 text-primary" />
            </div>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{bike.nickname}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {bike.brand} {bike.model} · {bike.year}
            </p>
          </div>
          <StatusBadge status={bike.source === "contract" ? "verified" : "mock"} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="font-mono text-muted-foreground">{formatTokenId(bike.tokenId)}</span>
          <span>{bike.color}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="font-mono text-muted-foreground">{truncateAddress(bike.owner)}</span>
          <CopyAddressButton address={bike.owner} />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/bike/${bike.tokenId.toString()}`}>
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
