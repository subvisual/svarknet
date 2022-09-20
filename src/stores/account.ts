import { writable } from "svelte/store";
import starknetStore from "./starknet";
import _baseStore from "./_baseStore";

type AccountStore = {
  address: string;
  connected: boolean;
};

const store = writable<AccountStore>({
  address: "",
  connected: false,
});

const account = _baseStore(store, ({ update, subscribe, _set }) => {
  starknetStore.subscribe((store) => {
    if (!store) return;

    _set({
      address: store.selectedAddress,
      connected: true,
    });
  });

  return {
    update,
    subscribe,
  };
});

export default account;
