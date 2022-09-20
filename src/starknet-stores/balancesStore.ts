import { get, writable } from "svelte/store";
import type { BalanceStore } from "./balance";
import _baseStore from "./_baseStore";

// Store of all balance store functions

export const store = writable<Record<string, BalanceStore>>({});

const balancesStore = _baseStore(store, ({ _set, subscribe }) => {
  function addBalance(name: string, balance: BalanceStore) {
    if (!get(store)[name]) {
      _set({
        [name]: balance,
      });
    }
  }

  return {
    subscribe,
    addBalance,
  };
});

export default balancesStore;
