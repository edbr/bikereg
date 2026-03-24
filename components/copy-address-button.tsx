"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function CopyAddressButton({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success("Address copied");
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Button variant="ghost" size="icon" onClick={onCopy} aria-label="Copy address">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}
