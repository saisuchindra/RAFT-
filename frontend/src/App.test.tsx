import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import App from "./App";

vi.mock("./services/backendApi", () => ({
  getBackendStatus: vi.fn(async () => ({
    name: "AtlasKV",
    phase: "Phase 1 - Single-node key-value store",
    status: "running"
  })),
  listKeys: vi.fn(async () => ({
    items: [],
    count: 0
  })),
  setKey: vi.fn(),
  getKey: vi.fn(),
  deleteKey: vi.fn()
}));

function renderApp(path: string = "/") {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("App", () => {
  it("renders the dashboard route", () => {
    renderApp();

    expect(screen.getByRole("heading", { name: "AtlasKV control center" })).toBeInTheDocument();
  });

  it("renders the cluster route", () => {
    renderApp("/cluster");

    expect(screen.getByRole("heading", { name: "Node topology" })).toBeInTheDocument();
  });

  it("renders the connected kv store route", () => {
    renderApp("/kv-store");

    expect(screen.getByRole("heading", { name: "Live key-value operations" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save key" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Read key" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete key" })).toBeInTheDocument();
  });
});
