import type { AccountInterface } from "starknet";
import { writable } from "svelte/store";
import starknetStore from "./starknetStore";
import _baseStore from "./_baseStore";

type AccountStore = {
  address: string;
  account: AccountInterface;
  connected: boolean;
};

const store = writable<AccountStore>({
  address: "",
  account: null,
  connected: false,
});

const accountStore = _baseStore(store, ({ update, subscribe, _set }) => {
  starknetStore.subscribe((store) => {
    if (!store) return;

    _set({
      address: store.selectedAddress,
      account: store.account,
      connected: true,
    });    
  });

  return {
    update,
    subscribe,
  };
});

export default accountStore;
