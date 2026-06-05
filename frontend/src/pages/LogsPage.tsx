import { Clock, ListTree } from "lucide-react";

import { PageHeader } from "../components/PageHeader";
import { PlaceholderPanel } from "../components/PlaceholderPanel";
import { StatusBadge } from "../components/StatusBadge";

export function LogsPage() {
  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Logs"
        title="Raft log replication"
        description="This page will compare leader and follower logs so you can see indexes, terms, commands, and commit status across the cluster."
        actions={<StatusBadge label="Viewer planned" status="planned" />}
      />

      <PlaceholderPanel
        icon={ListTree}
        title="Log replication viewer"
        description="When log management is implemented, this area will highlight pending, replicated, and committed entries."
        items={[
          "Leader log",
          "Follower logs",
          "Log index",
          "Log term",
          "Command payload",
          "Commit state"
        ]}
      />

      <PlaceholderPanel
        icon={Clock}
        title="Cluster event timeline"
        description="Election, heartbeat, replication, join, failure, and recovery events will appear here as a readable operational history."
        items={["Leader elections", "Heartbeats", "Replications", "Recoveries"]}
      />
    </div>
  );
}
