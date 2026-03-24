import Link from "next/link";
import { Bike, ShieldCheck } from "lucide-react";

import { WalletConnectButton } from "@/components/wallet-connect-button";
import { env } from "@/lib/env";

export function Navbar() {
  const networkLabel =
    env.chain === "localhost" ? "Localhost mode" : env.chain === "base-sepolia" ? "Base Sepolia" : "Sepolia ready";

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Bike className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold">FrameProof</p>
            <p className="text-xs text-muted-foreground">Bicycle registry onchain</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/verify/1" className="hover:text-foreground">
            Verify
          </Link>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            {networkLabel}
          </span>
        </nav>
        <WalletConnectButton />
      </div>
    </header>
  );
}
