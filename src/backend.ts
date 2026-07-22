// The interface between the frontend and whatever the real backend is
// (a native shell over IPC, an HTTP API, etc). Two implementations of
// this interface exist: a real one wired to the actual backend, and
// `mock.ts` below — an in-memory stand-in. Developing and testing the
// frontend against the mock means UI work never blocks on the backend
// being built, running, or even existing yet.

export interface Backend {
  greet(name: string): Promise<string>;
}
