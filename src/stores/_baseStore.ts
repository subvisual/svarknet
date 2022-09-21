import type { Writable } from "svelte/store";

export interface BaseStoreProps<T> extends Writable<T> {
  _set: (args: Partial<T>) => void;
  _subscribeOnce: (fn: (data: T) => boolean) => void;
}

export default function _baseStore<T, I>(
  store: Writable<T>,
  storeFn: (args: BaseStoreProps<T>) => I
): I {
  function _set(args: Partial<T>) {
    store.update((store) => ({
      ...store,
      ...args,
    }));
  }

  let _subscribeOnceDone = false;

  function _subscribeOnce(fn: (data: T) => boolean) {
    store.subscribe((data) => {
      if (!_subscribeOnceDone) {
        let called = fn(data);

        if (called) _subscribeOnceDone = true;
      }
    });
  }

  return storeFn({ ...store, _set, _subscribeOnce });
}
