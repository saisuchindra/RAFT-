import type { LucideIcon } from "lucide-react";

import { StatusBadge } from "./StatusBadge";

type PlaceholderPanelProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
};

export function PlaceholderPanel({
  icon: Icon,
  title,
  description,
  items
}: PlaceholderPanelProps) {
  return (
    <section className="glass-panel p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-white/50">
            <Icon aria-hidden="true" className="h-5 w-5 text-atlas-blue" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
              <StatusBadge label="Phase planned" status="planned" />
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/35 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 backdrop-blur"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
