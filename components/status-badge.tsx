import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: "verified" | "mock" | "pending" | "success" | "error";
};

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "verified") return <Badge variant="success">Verified onchain</Badge>;
  if (status === "mock") return <Badge variant="warning">Mock fallback</Badge>;
  if (status === "pending") return <Badge variant="warning">Transaction pending</Badge>;
  if (status === "success") return <Badge variant="success">Transaction confirmed</Badge>;
  return <Badge variant="destructive">Action failed</Badge>;
}
