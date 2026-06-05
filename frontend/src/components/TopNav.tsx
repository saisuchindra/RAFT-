import { useQueryClient } from "@tanstack/react-query";
import { Menu, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigationItems } from "../hooks/useNavigationItems";
import { StatusBadge } from "./StatusBadge";

export function TopNav() {
  const navigationItems = useNavigationItems();
  const queryClient = useQueryClient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const refreshData = async () => {
    await queryClient.invalidateQueries();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/25 bg-white/55 backdrop-blur-2xl">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/50 text-slate-700 shadow-sm backdrop-blur"
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <img src="/atlaskv-mark.svg" alt="AtlasKV" className="h-8 w-8" />
            <span className="font-semibold text-slate-900">AtlasKV</span>
          </div>
        </div>

        <div className="hidden lg:block">
          <p className="text-sm font-semibold text-slate-900">AtlasKV Dashboard</p>
          <p className="text-xs text-slate-600">Connected KV control plane</p>
        </div>

        <nav className="hidden items-center gap-1 md:flex lg:hidden">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "text-slate-700 hover:bg-white/55"
                ].join(" ")
            }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <StatusBadge label="Backend API configured" status="ready" />
          <button
            type="button"
            onClick={refreshData}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/50 text-slate-700 shadow-sm backdrop-blur hover:bg-white/70"
            aria-label="Refresh data"
          >
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen ? (
        <nav className="border-t border-white/25 bg-white/60 px-4 py-3 backdrop-blur-2xl md:hidden">
          <div className="grid gap-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium",
                    isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-white/70"
                ].join(" ")
              }
              >
                <item.icon aria-hidden="true" className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
