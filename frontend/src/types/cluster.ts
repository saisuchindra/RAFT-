export type NodeState = "leader" | "follower" | "candidate" | "offline";

export type ClusterHealth = "healthy" | "warning" | "offline";

export type ClusterSummary = {
  totalNodes: number;
  currentLeader: string;
  followers: number;
  currentTerm: number;
  commitIndex: number;
  health: ClusterHealth;
};
