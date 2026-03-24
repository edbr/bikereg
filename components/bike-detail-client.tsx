"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LoaderCircle, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { CopyAddressButton } from "@/components/copy-address-button";
import { EmptyState } from "@/components/empty-state";
import { StatusBadge } from "@/components/status-badge";
import { TransferBikeDialog } from "@/components/transfer-bike-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBikeById } from "@/lib/frameproof";
import { Bike } from "@/lib/types";
import { formatTimestamp, formatTokenId, truncateAddress } from "@/lib/utils";

export function BikeDetailClient({ id }: { id: string }) {
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      let tokenId: bigint;

      try {
        tokenId = BigInt(id);
      } catch {
        if (active) {
          setBike(null);
          setLoading(false);
        }
        return;
      }

      const result = await getBikeById(tokenId);
      if (active) {
        setBike(result);
        setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container-shell py-16">
        <Card>
          <CardContent className="flex min-h-80 items-center justify-center">
            <LoaderCircle className="h-6 w-6 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container-shell py-16">
        <EmptyState icon={ShieldCheck} title="Bike not found" description="This token ID does not exist in the configured contract or fallback registry." />
      </div>
    );
  }

  return (
    <div className="container-shell space-y-8 py-12">
      <Button asChild variant="ghost">
        <Link href="/dashboard">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </Button>
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <Card className="overflow-hidden">
          <div className="relative h-80 border-b border-white/10 bg-gradient-to-br from-white/10 to-transparent">
            {bike.imageUri ? (
              <Image src={bike.imageUri} alt={bike.nickname} fill className="object-cover" />
            ) : (
              <div className="grid h-full place-items-center">
                <div className="rounded-full border border-white/10 bg-white/5 p-8">
                  <ShieldCheck className="h-16 w-16 text-primary" />
                </div>
              </div>
            )}
          </div>
          <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
            <DetailItem label="Token ID" value={formatTokenId(bike.tokenId)} mono />
            <DetailItem label="Status" render={<StatusBadge status={bike.source === "contract" ? "verified" : "mock"} />} />
            <DetailItem label="Brand" value={bike.brand} />
            <DetailItem label="Model" value={bike.model} />
            <DetailItem label="Year" value={bike.year.toString()} />
            <DetailItem label="Color" value={bike.color} />
            <DetailItem label="Serial number" value={bike.serialNumber} mono />
            <DetailItem label="Registered" value={formatTimestamp(bike.registeredAt)} />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl">{bike.nickname}</CardTitle>
                  <p className="mt-2 text-muted-foreground">Current owner and transfer controls</p>
                </div>
                <StatusBadge status={bike.source === "contract" ? "verified" : "mock"} />
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <UserRound className="h-4 w-4" />
                  Wallet owner
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-sm">{truncateAddress(bike.owner, 6)}</p>
                  <CopyAddressButton address={bike.owner} />
                </div>
              </div>
              <TransferBikeDialog bike={bike} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Public verification</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href={`/verify/${bike.tokenId.toString()}`}>Open public verify page</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  mono,
  render,
}: {
  label: string;
  value?: string;
  mono?: boolean;
  render?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      {render ? <div className="mt-2">{render}</div> : <p className={mono ? "mt-2 font-mono text-sm" : "mt-2"}>{value}</p>}
    </div>
  );
}
