import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Waypoints } from "lucide-react";

import { WalletConnectButton } from "@/components/wallet-connect-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Proof of ownership",
    copy: "Mint each bike as an ERC-721 so ownership history is transparent and portable.",
  },
  {
    icon: Waypoints,
    title: "Transfer-ready",
    copy: "Move bikes between wallets with safe transfer flows designed for real riders and marketplaces.",
  },
  {
    icon: CheckCircle2,
    title: "Public verification",
    copy: "Verify authenticity and current ownership from a simple public token page.",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
            Live-ready Sepolia MVP
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Register and verify bicycle ownership onchain
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              A simple registry for proving bike ownership, tracking transfers, and verifying authenticity.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center">
              <WalletConnectButton />
            </div>
          </div>
        </div>
        <Card className="grid-pattern overflow-hidden">
          <CardContent className="space-y-6 p-8">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <feature.icon className="mb-4 h-5 w-5 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.copy}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
