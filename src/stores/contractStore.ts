import { Abi, AccountInterface, Contract, ProviderInterface } from "starknet";
import { Unsubscriber, Updater, Writable, writable } from "svelte/store";
import contractsStore from "./contractsStore";
import _baseStore from "./_baseStore";

type ContractWritableStore = Contract;

export type ContractStore = {
  subscribe: (run: Updater<ContractWritableStore>) => Unsubscriber;
  update: (updater: Updater<ContractWritableStore>) => void;
  store: Writable<Contract>;
};

type ContractProps = {
  contractAddress: string;
  abi: Abi;
  providerOrAccount: ProviderInterface | AccountInterface;
};

export default function contractStore(
  name: string,
  config: ContractProps
): ContractStore {
  const store = writable<ContractWritableStore>(
    new Contract(config.abi, config.contractAddress, config.providerOrAccount)
  );

  const storeActions = _baseStore(store, ({ subscribe, update }) => {
    return {
      subscribe,
      update,
      store,
    };
  });

  contractsStore.addContract(name, storeActions);

  return storeActions;
}
