import type { Contract } from "starknet";
import { get, Writable, writable } from "svelte/store";
import accountStore from "./accountStore";
import _baseStore from "./_baseStore";

type ContractsStoreType = Record<string, Writable<Contract>>;

export const store = writable<ContractsStoreType>({});

const contractsStore = _baseStore(store, ({ _set, subscribe }) => {
  function addContract(name: string, contract: Writable<Contract>) {
    if (!get(store)[name]) {
      _set({
        [name]: contract,
      });
    }
  }

  return {
    subscribe,
    addContract,
  };
});

export default contractsStore;

accountStore.subscribe((store) => {
  Object.entries(get(contractsStore)).forEach(([_, contract]) => {
    contract.update((data) => {
      data.providerOrAccount = store.account;

      return data;
    });
  });
});
