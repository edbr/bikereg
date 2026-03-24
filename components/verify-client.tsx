"use client";

import { CheckCircle2, LoaderCircle, SearchX } from "lucide-react";
import { useEffect, useState } from "react";

import { CopyAddressButton } from "@/components/copy-address-button";
import { EmptyState } from "@/components/empty-state";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBikeById } from "@/lib/frameproof";
import { Bike } from "@/lib/types";
import { formatTimestamp, formatTokenId, truncateAddress } from "@/lib/utils";

export function VerifyClient({ id }: { id: string }) {
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
          <CardContent className="flex min-h-72 items-center justify-center">
            <LoaderCircle className="h-6 w-6 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container-shell py-16">
        <EmptyState
          icon={SearchX}
          title="No verification record found"
          description="This token ID is not available from the configured contract or the fallback data set."
        />
      </div>
    );
  }

  return (
    <div className="container-shell py-12">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-primary">Public verification</p>
              <CardTitle className="text-3xl">{bike.nickname}</CardTitle>
            </div>
            <StatusBadge status={bike.source === "contract" ? "verified" : "mock"} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-200">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4" />
              Ownership verified
            </div>
            <p className="text-sm text-emerald-100/80">
              Token {formatTokenId(bike.tokenId)} resolves to an active FrameProof bicycle record.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <DataRow label="Brand" value={bike.brand} />
            <DataRow label="Model" value={bike.model} />
            <DataRow label="Year" value={bike.year.toString()} />
            <DataRow label="Color" value={bike.color} />
            <DataRow label="Serial number" value={bike.serialNumber} mono />
            <DataRow label="Registered" value={formatTimestamp(bike.registeredAt)} />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-muted-foreground">Current owner</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="font-mono text-sm">{truncateAddress(bike.owner, 6)}</p>
              <CopyAddressButton address={bike.owner} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DataRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={mono ? "mt-2 font-mono text-sm" : "mt-2"}>{value}</p>
    </div>
  );
}
