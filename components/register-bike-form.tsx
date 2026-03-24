"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAccount, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { z } from "zod";

import { frameProofRegistryAbi } from "@/abi/FrameProofRegistry";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { env } from "@/lib/env";
import { frameProofChain, frameProofNetworkLabel } from "@/lib/frameproof-network";
import { getRegisterBikeArgs, hasUsableContractConfig } from "@/lib/frameproof";

const formSchema = z.object({
  nickname: z.string().trim().min(1, "Nickname is required"),
  brand: z.string().trim().min(1, "Brand is required"),
  model: z.string().trim().min(1, "Model is required"),
  year: z.coerce.number().min(1900).max(9999),
  serialNumber: z.string().trim().min(1, "Serial number is required"),
  color: z.string().trim().min(1, "Color is required"),
  imageUri: z.string().trim().url("Enter a valid image URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function RegisterBikeForm({ onRegistered }: { onRegistered?: () => void }) {
  const { chainId, isConnected } = useAccount();
  const { isPending: isSwitchingChain, switchChain } = useSwitchChain();
  const contractReady = hasUsableContractConfig() && Boolean(env.contractAddress);
  const onExpectedChain = chainId === frameProofChain.id;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      serialNumber: "",
      color: "",
      imageUri: "",
    },
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (receipt.isSuccess) {
      toast.success("Bike registered successfully");
      form.reset();
      onRegistered?.();
    }
  }, [form, onRegistered, receipt.isSuccess]);

  useEffect(() => {
    if (!error) return;
    const message = error.message.toLowerCase().includes("user rejected")
      ? "Transaction rejected"
      : "Registration failed";
    toast.error(message);
  }, [error]);

  function onSubmit(values: FormValues) {
    if (!isConnected) {
      toast.error("Connect your wallet first");
      return;
    }

    if (!onExpectedChain) {
      toast.error(`Switch your wallet to ${frameProofNetworkLabel} first`);
      return;
    }

    if (!contractReady || !env.contractAddress) {
      toast.info("Contract not configured yet. UI is using fallback mode.");
      return;
    }

    writeContract({
      address: env.contractAddress,
      abi: frameProofRegistryAbi,
      functionName: "registerBike",
      args: getRegisterBikeArgs(values),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Bike</CardTitle>
        <CardDescription>Mint a new ERC-721 bicycle record and store its metadata onchain.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
          <Field label="Nickname" error={form.formState.errors.nickname?.message}>
            <Input {...form.register("nickname")} placeholder="City Sprint" />
          </Field>
          <Field label="Brand" error={form.formState.errors.brand?.message}>
            <Input {...form.register("brand")} placeholder="Specialized" />
          </Field>
          <Field label="Model" error={form.formState.errors.model?.message}>
            <Input {...form.register("model")} placeholder="Sirrus X" />
          </Field>
          <Field label="Year" error={form.formState.errors.year?.message}>
            <Input type="number" {...form.register("year")} />
          </Field>
          <Field label="Serial number" error={form.formState.errors.serialNumber?.message}>
            <Input {...form.register("serialNumber")} placeholder="ABC-123-XYZ" />
          </Field>
          <Field label="Color" error={form.formState.errors.color?.message}>
            <Input {...form.register("color")} placeholder="Matte Black" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Image URL (optional)" error={form.formState.errors.imageUri?.message}>
              <Input {...form.register("imageUri")} placeholder="https://example.com/bike.jpg" />
            </Field>
          </div>
          <div className="md:col-span-2 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="space-y-2">
                <p>
                  Set <span className="font-mono">NEXT_PUBLIC_FRAMEPROOF_CONTRACT_ADDRESS</span> after deployment to enable live registration.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {!isConnected ? <StatusBadge status="error" /> : null}
                  {isConnected && !onExpectedChain ? <StatusBadge status="error" /> : null}
                  {isConnected && !contractReady ? <StatusBadge status="mock" /> : null}
                  {receipt.isLoading ? <StatusBadge status="pending" /> : null}
                  {receipt.isSuccess ? <StatusBadge status="success" /> : null}
                </div>
                {!isConnected ? <p className="text-xs text-red-300">Wallet not connected state</p> : null}
                {isConnected && !onExpectedChain ? (
                  <p className="text-xs text-red-300">
                    Wallet is on the wrong network. Switch to {frameProofNetworkLabel} to register bikes.
                  </p>
                ) : null}
                {isConnected && !contractReady ? (
                  <p className="text-xs text-amber-300">
                    Contract not configured for the active {frameProofNetworkLabel} network. Form is in preview mode until env vars are set.
                  </p>
                ) : null}
              </div>
            </div>
            {!isConnected || onExpectedChain ? null : (
              <Button
                type="button"
                variant="outline"
                onClick={() => switchChain({ chainId: frameProofChain.id })}
                disabled={isSwitchingChain}
              >
                {isSwitchingChain ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                {isSwitchingChain ? "Switching network" : `Switch to ${frameProofNetworkLabel}`}
              </Button>
            )}
            <Button type="submit" disabled={!isConnected || !onExpectedChain || !contractReady || isPending || receipt.isLoading}>
              {isPending || receipt.isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
              {receipt.isLoading ? "Waiting for confirmation" : isPending ? "Confirm in wallet" : "Register bicycle"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  );
}
