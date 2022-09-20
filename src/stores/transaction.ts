import type { Contract, Transaction } from "ethers";
import type { Result } from "starknet";
import { get, writable } from "svelte/store";
import starknetStore from "./starknet";
import _baseStore from "./_baseStore";

type TransactionStore = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: Result;
  hash: string;
};

export default function transaction() {
  const store = writable<TransactionStore>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    hash: "",
    data: null as Result,
  });

  return _baseStore(store, ({ subscribe, _set }) => {
    async function wait(fn: () => Promise<any>) {
      _set({ isError: false, isLoading: true });

      try {
        let tx = await fn();

        _set({ hash: tx.hash });

        await get(starknetStore).provider.waitForTransaction(
          tx.transaction_hash
        );

        _set({ isSuccess: true });
      } catch (err) {
        _set({ isError: true });
      } finally {
        _set({ isLoading: false });
      }
    }

    async function test() {
      _set({ isLoading: true });

      setTimeout(() => {
        _set({ isLoading: false, isSuccess: true });
      }, 5000);
    }

    return {
      subscribe,
      wait,
    };
  });
}
