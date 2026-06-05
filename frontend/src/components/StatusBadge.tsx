import type { ClusterHealth, NodeState } from "../types/cluster";

type StatusBadgeProps = {
  label: string;
  status: NodeState | ClusterHealth | "ready" | "planned";
};

const statusClasses: Record<StatusBadgeProps["status"], string> = {
  leader: "border-emerald-200/60 bg-emerald-50/80 text-emerald-800",
  follower: "border-sky-200/60 bg-sky-50/80 text-sky-800",
  candidate: "border-amber-200/60 bg-amber-50/80 text-amber-800",
  offline: "border-rose-200/60 bg-rose-50/80 text-rose-800",
  healthy: "border-emerald-200/60 bg-emerald-50/80 text-emerald-800",
  warning: "border-amber-200/60 bg-amber-50/80 text-amber-800",
  ready: "border-white/40 bg-white/55 text-slate-800",
  planned: "border-slate-200/60 bg-white/55 text-slate-700"
};

export function StatusBadge({ label, status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}
    >
      {label}
    </span>
  );
}
