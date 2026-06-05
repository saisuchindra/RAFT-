import { NavLink } from "react-router-dom";
import { ServerCog } from "lucide-react";

import { useNavigationItems } from "../hooks/useNavigationItems";

export function Sidebar() {
  const navigationItems = useNavigationItems();

  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/25 bg-white/45 px-4 py-5 backdrop-blur-2xl lg:block">
      <div className="flex items-center gap-3 px-2">
        <img src="/atlaskv-mark.svg" alt="AtlasKV" className="h-10 w-10" />
        <div>
          <p className="text-base font-semibold text-atlas-ink">AtlasKV</p>
          <p className="text-xs text-slate-600">Raft Control Plane</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                  : "text-slate-700 hover:bg-white/60 hover:text-slate-900"
              ].join(" ")
            }
          >
            <item.icon aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/35 bg-white/55 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <ServerCog aria-hidden="true" className="h-4 w-4 text-atlas-green" />
          Phase 1 Ready
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-700">
          The interface shell is ready for real cluster data in the next phase.
        </p>
      </div>
    </aside>
  );
}
