import { Settings, SlidersHorizontal } from "lucide-react";

import { PageHeader } from "../components/PageHeader";
import { PlaceholderPanel } from "../components/PlaceholderPanel";
import { StatusBadge } from "../components/StatusBadge";

export function SettingsPage() {
  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Settings"
        title="Runtime configuration"
        description="This page will collect backend URL settings, polling preferences, and simulation controls as the dashboard becomes interactive."
        actions={<StatusBadge label="Config ready" status="ready" />}
      />

      <section className="surface p-6">
        <label className="block">
          <span className="text-sm font-semibold text-atlas-ink">Backend API URL</span>
          <input
            type="text"
            value={import.meta.env.VITE_ATLASKV_API_URL ?? "http://127.0.0.1:8000"}
            readOnly
            className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
          />
        </label>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The frontend reads this from the `VITE_ATLASKV_API_URL` environment variable.
        </p>
      </section>

      <PlaceholderPanel
        icon={SlidersHorizontal}
        title="Simulation controls"
        description="Later phases will add controls for stopping, restarting, disconnecting, and recovering nodes."
        items={[
          "Stop node",
          "Restart node",
          "Disconnect node",
          "Recover node",
          "Watch election reaction",
          "Track recovery progress"
        ]}
      />

      <PlaceholderPanel
        icon={Settings}
        title="Dashboard preferences"
        description="Production polish will add loading states, errors, toast notifications, responsive tuning, and dark mode."
        items={["Polling interval", "Theme mode", "Notification settings"]}
      />
    </div>
  );
}
