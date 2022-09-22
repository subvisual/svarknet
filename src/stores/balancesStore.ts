import { get, writable } from "svelte/store";
import type { BalanceStore } from "./balanceStore";
import _baseStore from "./_baseStore";

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
