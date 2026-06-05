import { Network, Server, ShieldCheck } from "lucide-react";

import { PageHeader } from "../components/PageHeader";
import { PlaceholderPanel } from "../components/PlaceholderPanel";
import { StatusBadge } from "../components/StatusBadge";

const nodes = ["Node 1", "Node 2", "Node 3"];

export function ClusterPage() {
  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Cluster"
        title="Node topology"
        description="This page will show each AtlasKV node, its Raft state, current term, heartbeat timing, log count, and synchronization progress."
        actions={<StatusBadge label="Topology shell" status="ready" />}
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {nodes.map((node, index) => (
          <article key={node} className="surface p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <Server aria-hidden="true" className="h-5 w-5 text-atlas-blue" />
                </div>
                <div>
                  <h2 className="font-semibold text-atlas-ink">{node}</h2>
                  <p className="text-sm text-slate-500">127.0.0.1:{8001 + index}</p>
                </div>
              </div>
              <StatusBadge label="Planned" status="planned" />
            </div>
          </article>
        ))}
      </section>

      <PlaceholderPanel
        icon={Network}
        title="Cluster communication map"
        description="The next backend phases will give this page real data about peers, health checks, and node-to-node messages."
        items={[
          "Node identity",
          "Peer addresses",
          "Leader/follower/candidate state",
          "Heartbeat freshness",
          "Log count",
          "Commit index"
        ]}
      />

      <PlaceholderPanel
        icon={ShieldCheck}
        title="Consensus safety view"
        description="As Raft features arrive, this panel will help explain why the cluster is safe and which node is allowed to accept writes."
        items={["Majority status", "Term agreement", "Leader authority"]}
      />
    </div>
  );
}
