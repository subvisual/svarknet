import { get, Subscriber, Unsubscriber, writable } from "svelte/store";
import starknetStore from "./starknetStore";
import _baseStore from "./_baseStore";

// Store function for handleing transaction state.
// Receives a transaction to execute, and tracks it's status

type TransactionWritableStore = {
  pending: boolean;
  success: boolean;
  error: boolean;
  idle: boolean;
  hash: string;
};

export type TransactionStore = {
  waitFor: (fn: () => Promise<any>) => Promise<void>;
  subscribe: (run: Subscriber<TransactionWritableStore>) => Unsubscriber;
};

export default function transactionStore(): TransactionStore {
  const store = writable<TransactionWritableStore>({
    pending: false,
    success: false,
    error: false,
    idle: true,
    hash: "",
  });

  return _baseStore(store, ({ subscribe, _set }) => {
    async function waitFor(fn: () => Promise<any>) {
      _set({ idle: false, error: false, pending: true });

      try {
        let tx = await fn();

        tx.transaction_hash && _set({ hash: tx.transaction_hash });

        await get(starknetStore).provider.waitForTransaction(
          tx.transaction_hash
        );

        _set({ success: true });
      } catch (err) {
        _set({ error: true });
      } finally {
        _set({ pending: false, idle: true });
      }
    }

    return {
      subscribe,
      waitFor,
    };
  });
}
