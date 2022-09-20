import type { Account, AccountInterface } from "starknet";
import { writable } from "svelte/store";
import starknetStore from "./starknet";
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

const account = _baseStore(store, ({ update, subscribe, _set }) => {
  starknetStore.subscribe((store) => {
    if (!store) return;

    console.log(`change to ${store.selectedAddress}`)

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

export default account;
