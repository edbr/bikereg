import Link from "next/link";
import { ArrowRight, Fingerprint, Wallet, ShieldCheck } from "lucide-react";

import { HeroSection } from "@/components/hero-section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featureCards = [
  {
    icon: Fingerprint,
    title: "Immutable bike identity",
    copy: "Store the key frame details directly in your registry contract for a clean MVP proof model.",
  },
  {
    icon: Wallet,
    title: "Wallet-native ownership",
    copy: "Riders connect a wallet, register bikes, and manage transfers without custom accounts.",
  },
  {
    icon: ShieldCheck,
    title: "Simple verification",
    copy: "Anyone can verify a token's owner and metadata from a public URL by token ID.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="container-shell space-y-8 pb-20">
        <SectionHeader
          eyebrow="Why FrameProof"
          title="A production-shaped MVP for bicycle ownership"
          description="Built with Next.js 15, shadcn-style UI, wagmi, RainbowKit, viem, and a straightforward ERC-721 registry contract."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map((card) => (
            <Card key={card.title}>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="pt-4">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{card.copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Launch dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
