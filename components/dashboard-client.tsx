"use client";

import Link from "next/link";
import { LoaderCircle, Wallet, PlusCircle, Activity, Bike as BikeGlyph } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { BikeGrid } from "@/components/bike-grid";
import { EmptyState } from "@/components/empty-state";
import { RegisterBikeForm } from "@/components/register-bike-form";
import { SectionHeader } from "@/components/section-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBikesForOwner } from "@/lib/frameproof";
import { mockActivity } from "@/lib/mock-data";
import { Bike } from "@/lib/types";
import { truncateAddress } from "@/lib/utils";

export function DashboardClient() {
  const { address, isConnected } = useAccount();
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!address) {
        setBikes([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const ownedBikes = await getBikesForOwner(address);
      if (active) {
        setBikes(ownedBikes);
        setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [address]);

  return (
    <div className="container-shell space-y-12 py-12">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="grid-pattern">
          <CardHeader>
            <CardTitle>My Bikes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="max-w-xl text-muted-foreground">
              Review the bicycles held by your connected wallet, inspect ownership, and manage transfers from one clean dashboard.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={bikes.some((bike) => bike.source === "contract") ? "verified" : "mock"} />
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm">
                {truncateAddress(address)}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild variant="outline">
              <Link href="#register">
                <PlusCircle className="h-4 w-4" />
                Register a bike
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/verify/1">
                <BikeGlyph className="h-4 w-4" />
                Open verify page
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader title="Owned bicycles" description="Your inventory updates from onchain data when the contract is configured, then falls back to mock data for a polished demo experience." />
        {!isConnected ? (
          <EmptyState
            icon={Wallet}
            title="Connect a wallet to view your bikes"
            description="FrameProof shows ownership records for the connected address and unlocks minting and transfer flows."
          />
        ) : loading ? (
          <Card>
            <CardContent className="flex min-h-52 items-center justify-center">
              <LoaderCircle className="h-6 w-6 animate-spin text-primary" />
            </CardContent>
          </Card>
        ) : bikes.length === 0 ? (
          <EmptyState
            icon={BikeGlyph}
            title="No bikes found for this wallet"
            description="Register your first bicycle to mint an ownership record and start building a verifiable history."
          />
        ) : (
          <BikeGrid bikes={bikes} />
        )}
      </section>

      <section id="register">
        <SectionHeader title="Register bicycle" description="Create a new FrameProof NFT with structured metadata stored directly in the registry contract." />
        <div className="mt-6">
          <RegisterBikeForm />
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="Recent activity" description="A lightweight activity stream helps the MVP feel alive while event indexing remains out of scope." />
        <div className="grid gap-4 md:grid-cols-3">
          {mockActivity.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex h-full items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
