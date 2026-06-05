import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";

export function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden text-atlas-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(5, 12, 28, 0.42), rgba(5, 12, 28, 0.72)), url('/EF1v_W9SxNs8QrUzC5Y8B7u308jeoHC_sW09CPJiYBLEmECgMUxGZbhOXEZ9J3ZcR-Ao_Q350qgGaFnNGJ-ase81iCV422GNRqAIVSRQC-Ws0_FNeiyGv26F3Fqe5sq7sO7hIabt-aqMEB2jOJ5f3yr-kox6ENKZZpHz2649Hg-FtbCCrjESXB0o6WN7HoFK.jpeg')"
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(235,242,248,0.92)_0%,rgba(224,233,241,0.76)_42%,rgba(205,218,228,0.64)_100%)]"
      />
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
