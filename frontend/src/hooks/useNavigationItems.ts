import {
  Activity,
  Database,
  LayoutDashboard,
  ListTree,
  Settings,
  type LucideIcon
} from "lucide-react";

import type { NavigationItem } from "../types/navigation";

type NavigationDefinition = Omit<NavigationItem, "icon"> & {
  icon: LucideIcon;
};

const navigationItems: NavigationDefinition[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    description: "Cluster overview"
  },
  {
    label: "Cluster",
    path: "/cluster",
    icon: Activity,
    description: "Node topology"
  },
  {
    label: "KV Store",
    path: "/kv-store",
    icon: Database,
    description: "Key-value operations"
  },
  {
    label: "Logs",
    path: "/logs",
    icon: ListTree,
    description: "Raft log viewer"
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    description: "Runtime settings"
  }
];

export function useNavigationItems(): NavigationItem[] {
  return navigationItems;
}
