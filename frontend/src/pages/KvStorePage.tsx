import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2, Database, KeyRound, Loader2, Search, Trash2 } from "lucide-react";

import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { deleteKey, getKey, setKey } from "../services/backendApi";
import { useBackendStatus } from "../hooks/useBackendStatus";
import { useKeyList } from "../hooks/useKeyList";
import type { GetKeyResponse } from "../types/api";

type OperationMessage = {
  kind: "success" | "error";
  text: string;
};

export function KvStorePage() {
  const queryClient = useQueryClient();
  const backendStatus = useBackendStatus();
  const keyList = useKeyList();
  const [setForm, setSetForm] = useState({ key: "", value: "" });
  const [getFormKey, setGetFormKey] = useState("");
  const [deleteFormKey, setDeleteFormKey] = useState("");
  const [readResult, setReadResult] = useState<GetKeyResponse | null>(null);
  const [message, setMessage] = useState<OperationMessage | null>(null);

  const refreshKeys = async () => {
    await queryClient.invalidateQueries({ queryKey: ["keys"] });
  };

  const setMutation = useMutation({
    mutationFn: setKey,
    onSuccess: async (data) => {
      setMessage({ kind: "success", text: data.message });
      setSetForm({ key: "", value: "" });
      await refreshKeys();
    },
    onError: () => {
      setMessage({ kind: "error", text: "Could not store the key. Check that the backend is running." });
    }
  });

  const getMutation = useMutation({
    mutationFn: getKey,
    onSuccess: (data) => {
      setReadResult(data);
      setMessage({ kind: "success", text: `Found key '${data.key}'.` });
    },
    onError: () => {
      setReadResult(null);
      setMessage({ kind: "error", text: "Key was not found or the backend is offline." });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteKey,
    onSuccess: async (data) => {
      setMessage({ kind: "success", text: data.message });
      setDeleteFormKey("");
      if (readResult?.key === data.key) {
        setReadResult(null);
      }
      await refreshKeys();
    },
    onError: () => {
      setMessage({ kind: "error", text: "Could not delete the key. It may not exist." });
    }
  });

  const handleSetSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = setForm.key.trim();
    if (!key) {
      setMessage({ kind: "error", text: "Enter a key before saving." });
      return;
    }
    setMutation.mutate({ key, value: setForm.value });
  };

  const handleGetSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = getFormKey.trim();
    if (!key) {
      setMessage({ kind: "error", text: "Enter a key before reading." });
      return;
    }
    getMutation.mutate(key);
  };

  const handleDeleteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = deleteFormKey.trim();
    if (!key) {
      setMessage({ kind: "error", text: "Enter a key before deleting." });
      return;
    }
    deleteMutation.mutate(key);
  };

  const isBackendConnected = backendStatus.isSuccess;
  const isBusy = setMutation.isPending || getMutation.isPending || deleteMutation.isPending;

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="KV Store"
        title="Live key-value operations"
        description="This page is connected to your FastAPI backend. Use it to store, read, and delete keys from the AtlasKV in-memory store."
        actions={
          <StatusBadge
            label={isBackendConnected ? "Backend connected" : "Backend offline"}
            status={isBackendConnected ? "healthy" : "offline"}
          />
        }
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <form className="surface p-5" onSubmit={handleSetSubmit}>
          <KeyRound aria-hidden="true" className="h-6 w-6 text-atlas-blue" />
          <h2 className="mt-4 text-lg font-semibold text-atlas-ink">SET</h2>
          <p className="mt-2 text-sm text-slate-600">Create or update a key.</p>
          <div className="mt-5 grid gap-3">
            <input
              value={setForm.key}
              onChange={(event) => setSetForm((current) => ({ ...current, key: event.target.value }))}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-atlas-blue"
              placeholder="key"
              aria-label="Key to set"
            />
            <textarea
              value={setForm.value}
              onChange={(event) => setSetForm((current) => ({ ...current, value: event.target.value }))}
              className="min-h-24 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-atlas-blue"
              placeholder="value"
              aria-label="Value to store"
            />
            <button
              type="submit"
              disabled={setMutation.isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-atlas-ink px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {setMutation.isPending ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
              Save key
            </button>
          </div>
        </form>

        <form className="surface p-5" onSubmit={handleGetSubmit}>
          <Search aria-hidden="true" className="h-6 w-6 text-atlas-blue" />
          <h2 className="mt-4 text-lg font-semibold text-atlas-ink">GET</h2>
          <p className="mt-2 text-sm text-slate-600">Read a value by key.</p>
          <div className="mt-5 grid gap-3">
            <input
              value={getFormKey}
              onChange={(event) => setGetFormKey(event.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-atlas-blue"
              placeholder="key"
              aria-label="Key to read"
            />
            <button
              type="submit"
              disabled={getMutation.isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-atlas-blue px-4 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {getMutation.isPending ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
              Read key
            </button>
            <div className="min-h-24 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="metric-label">Read result</p>
              {readResult ? (
                <div className="mt-2">
                  <p className="text-sm font-semibold text-atlas-ink">{readResult.key}</p>
                  <p className="mt-1 break-words text-sm text-slate-700">{readResult.value}</p>
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-500">No key read yet.</p>
              )}
            </div>
          </div>
        </form>

        <form className="surface p-5" onSubmit={handleDeleteSubmit}>
          <Trash2 aria-hidden="true" className="h-6 w-6 text-atlas-red" />
          <h2 className="mt-4 text-lg font-semibold text-atlas-ink">DELETE</h2>
          <p className="mt-2 text-sm text-slate-600">Remove a key from the store.</p>
          <div className="mt-5 grid gap-3">
            <input
              value={deleteFormKey}
              onChange={(event) => setDeleteFormKey(event.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-atlas-blue"
              placeholder="key"
              aria-label="Key to delete"
            />
            <button
              type="submit"
              disabled={deleteMutation.isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-atlas-red px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleteMutation.isPending ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
              Delete key
            </button>
          </div>
        </form>
      </section>

      {message ? (
        <div
          className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${
            message.kind === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {message.kind === "success" ? (
            <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
          ) : (
            <AlertCircle aria-hidden="true" className="h-4 w-4" />
          )}
          {message.text}
        </div>
      ) : null}

      <section className="surface overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-atlas-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Database aria-hidden="true" className="h-5 w-5 text-atlas-blue" />
              <h2 className="text-lg font-semibold text-atlas-ink">Stored keys</h2>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Data comes from the backend `/keys` endpoint and refreshes automatically.
            </p>
          </div>
          <StatusBadge
            label={keyList.isFetching || isBusy ? "Refreshing" : `${keyList.data?.count ?? 0} keys`}
            status={keyList.isError ? "warning" : "ready"}
          />
        </div>

        {keyList.isLoading ? (
          <div className="flex items-center gap-3 p-5 text-sm text-slate-600">
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Loading keys from backend...
          </div>
        ) : keyList.isError ? (
          <div className="p-5 text-sm text-rose-700">
            Could not load keys. Start the backend server on `http://127.0.0.1:8000`.
          </div>
        ) : keyList.data && keyList.data.items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Key</th>
                  <th className="px-5 py-3 font-semibold">Value</th>
                  <th className="px-5 py-3 font-semibold">Replication</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {keyList.data.items.map((item) => (
                  <tr key={item.key}>
                    <td className="px-5 py-4 font-semibold text-atlas-ink">{item.key}</td>
                    <td className="max-w-xl break-words px-5 py-4 text-slate-700">{item.value}</td>
                    <td className="px-5 py-4">
                      <StatusBadge label="Single node" status="ready" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-5 text-sm text-slate-600">
            No keys stored yet. Use the SET form to add your first key.
          </div>
        )}
      </section>
    </div>
  );
}
