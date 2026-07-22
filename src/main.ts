import { mockBackend } from "./mock";
import type { Backend } from "./backend";

// Replace with a real implementation for the actual app entry point;
// tests and scripts import mockBackend directly instead of this file.
export const backend: Backend = mockBackend;

export async function main() {
  const message = await backend.greet("world");
  console.log(message);
}
