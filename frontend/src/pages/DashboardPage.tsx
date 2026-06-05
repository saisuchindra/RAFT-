import { Activity, Database, GitBranch, Server } from "lucide-react";

import { PageHeader } from "../components/PageHeader";
import { PlaceholderPanel } from "../components/PlaceholderPanel";
import { StatusBadge } from "../components/StatusBadge";
import { useBackendStatus } from "../hooks/useBackendStatus";
import { useKeyList } from "../hooks/useKeyList";

const heroImage =
  "/EF1v_W9SxNs8QrUzC5Y8B7u308jeoHC_sW09CPJiYBLEmECgMUxGZbhOXEZ9J3ZcR-Ao_Q350qgGaFnNGJ-ase81iCV422GNRqAIVSRQC-Ws0_FNeiyGv26F3Fqe5sq7sO7hIabt-aqMEB2jOJ5f3yr-kox6ENKZZpHz2649Hg-FtbCCrjESXB0o6WN7HoFK.jpeg";

export function DashboardPage() {
  const backendStatus = useBackendStatus();
  const keyList = useKeyList();
  const isBackendConnected = backendStatus.isSuccess;

  const liveSummaryCards = [
    { label: "Total Nodes", value: "1", icon: Server, tone: "text-atlas-blue" },
    {
      label: "Backend",
      value: isBackendConnected ? "Connected" : "Offline",
      icon: Activity,
      tone: isBackendConnected ? "text-atlas-green" : "text-atlas-red"
    },
    {
      label: "Stored Keys",
      value: keyList.data?.count.toString() ?? "0",
      icon: Database,
      tone: "text-atlas-blue"
    },
    { label: "Raft Phase", value: "Pending", icon: GitBranch, tone: "text-atlas-amber" }
  ];

  return (
    <div className="page-shell">
      <section className="glass-panel overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <PageHeader
              eyebrow="Dashboard"
              title="AtlasKV control center"
              description="The frontend is now connected to your FastAPI backend. This phase controls the single-node key-value store while later phases add Raft cluster data."
              actions={
                <StatusBadge
                  label={isBackendConnected ? "Backend connected" : "Backend offline"}
                  status={isBackendConnected ? "healthy" : "offline"}
                />
              }
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {liveSummaryCards.map((card) => (
                <article
                  key={card.label}
                  className="rounded-2xl border border-white/35 bg-white/55 p-5 shadow-sm backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="metric-label">{card.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">{card.value}</p>
                    </div>
                    <card.icon aria-hidden="true" className={`h-6 w-6 ${card.tone}`} />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
            <img
              src={heroImage}
              alt="A lakeside bamboo dock and forest landscape"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-900/20 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6 sm:p-8 lg:p-10">
              <div className="max-w-md rounded-2xl border border-white/25 bg-slate-950/35 p-5 text-white backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                  Visual shell
                </p>
                <h2 className="mt-3 text-2xl font-semibold">Morphism dashboard</h2>
                <p className="mt-2 text-sm leading-6 text-white/82">
                  The scenic image now anchors the interface while frosted panels keep the
                  operational data readable and crisp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PlaceholderPanel
        icon={Activity}
        title="Current backend status"
        description={
          backendStatus.data
            ? `${backendStatus.data.name} is running: ${backendStatus.data.phase}.`
            : "Start the backend server on port 8000 so this dashboard can connect."
        }
        items={[
          "Backend connection check",
          "Stored key count",
          "Single-node KV operations",
          "Ready for Raft cluster APIs"
        ]}
      />
    </div>
  );
}
