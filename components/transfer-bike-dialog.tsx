"use client";

import { LoaderCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { isAddress } from "viem";
import { toast } from "sonner";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { frameProofRegistryAbi } from "@/abi/FrameProofRegistry";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { env } from "@/lib/env";
import { hasUsableContractConfig } from "@/lib/frameproof";
import { Bike } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

export function TransferBikeDialog({ bike }: { bike: Bike }) {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [open, setOpen] = useState(false);
  const contractReady = hasUsableContractConfig() && Boolean(env.contractAddress);
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const normalizedRecipient = recipient.trim().toLowerCase();
  const normalizedSender = address?.toLowerCase();
  const invalidAddress = recipient.length > 0 && !isAddress(recipient);
  const transferToSelf = normalizedRecipient.length > 0 && normalizedRecipient === normalizedSender;

  useEffect(() => {
    if (receipt.isSuccess) {
      toast.success("Bike transferred successfully");
      setRecipient("");
      setOpen(false);
    }
  }, [receipt.isSuccess]);

  useEffect(() => {
    if (!error) return;
    const message = error.message.toLowerCase().includes("user rejected")
      ? "Transaction rejected"
      : "Transfer failed";
    toast.error(message);
  }, [error]);

  function onTransfer() {
    if (!address) {
      toast.error("Connect your wallet first");
      return;
    }

    if (!contractReady || !env.contractAddress) {
      toast.info("Set a deployed contract address to enable transfers");
      return;
    }

    if (invalidAddress) {
      toast.error("Enter a valid wallet address");
      return;
    }

    if (transferToSelf) {
      toast.error("Cannot transfer to the connected wallet");
      return;
    }

    writeContract({
      address: env.contractAddress,
      abi: frameProofRegistryAbi,
      functionName: "safeTransferFrom",
      args: [address, recipient as `0x${string}`, bike.tokenId],
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Send className="h-4 w-4" />
          Transfer ownership
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Bike</DialogTitle>
          <DialogDescription>
            Send {bike.nickname} to another wallet using ERC-721 safe transfer.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <label className="space-y-2">
            <span className="text-sm text-muted-foreground">Recipient wallet</span>
            <Input
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              placeholder="0x..."
              className="font-mono"
            />
          </label>
          <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center gap-2">
              {!address ? <StatusBadge status="error" /> : null}
              {!contractReady ? <StatusBadge status="mock" /> : null}
              {receipt.isLoading ? <StatusBadge status="pending" /> : null}
              {receipt.isSuccess ? <StatusBadge status="success" /> : null}
            </div>
            {!address ? <p className="text-sm text-red-300">Connect your wallet to transfer ownership.</p> : null}
            {!address && invalidAddress ? null : invalidAddress ? (
              <p className="text-sm text-red-300">Enter a valid recipient wallet address.</p>
            ) : null}
            {transferToSelf ? <p className="text-sm text-red-300">You cannot transfer a bike to your own wallet.</p> : null}
            {address && !contractReady ? (
              <p className="text-sm text-amber-300">Contract address missing. Transfers stay disabled until the env is configured.</p>
            ) : null}
          </div>
          <Button
            onClick={onTransfer}
            disabled={!address || !contractReady || isPending || receipt.isLoading || invalidAddress || transferToSelf}
          >
            {isPending || receipt.isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
            {receipt.isLoading ? "Transfer pending" : isPending ? "Confirm in wallet" : "Confirm transfer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
