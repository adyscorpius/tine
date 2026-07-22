import type { Backend } from "./backend";

// In-memory stand-in for the real backend. Swap this for a real
// implementation (calling into IPC, HTTP, whatever `shell` exposes) —
// the frontend code should never need to know which one it's talking
// to. This is what lets `npm run smoke` and the screenshot scripts run
// in a plain browser with no native app process behind them.
export const mockBackend: Backend = {
  async greet(name: string) {
    return `hello, ${name} (mock)`;
  },
};
