import { get, writable } from "svelte/store";
import accountStore from "./accountStore";
import type { ContractStore } from "./contractStore";
import _baseStore from "./_baseStore";

type ContractsStoreType = Record<string, ContractStore>;

export const store = writable<ContractsStoreType>({});

const contractsStore = _baseStore(store, ({ _set, subscribe }) => {
  function addContract(name: string, contract: ContractStore) {
    if (!get(store)[name]) {
      _set({
        [name]: contract,
      });
    }
  }

  return {
    subscribe,
    addContract,
    get,
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
