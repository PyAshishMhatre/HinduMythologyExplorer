import { createJSONStorage, type StateStorage } from 'zustand/middleware';

/**
 * Single storage adapter for all persisted stores.
 * Swap this implementation (e.g. to IndexedDB or a sync backend) without touching the stores.
 */
const safeLocalStorage: StateStorage = {
  getItem: (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  setItem: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* storage unavailable — progress will not persist this session */
    }
  },
  removeItem: (k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  },
};

export const appStorage = createJSONStorage(() => safeLocalStorage);
