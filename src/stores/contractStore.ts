import { Abi, AccountInterface, Contract, ProviderInterface } from "starknet";
import { writable } from "svelte/store";
import contractsStore from "./contractsStore";
import _baseStore from "./_baseStore";

type ContractStoreType = Contract;

type ContractProps = {
  contractAddress: string;
  abi: Abi;
  providerOrAccount: ProviderInterface | AccountInterface;
};

export default function contractStore(name: string, config: ContractProps) {
  const store = writable<ContractStoreType>(
    new Contract(config.abi, config.contractAddress, config.providerOrAccount)
  );

  contractsStore.addContract(name, store);

  return _baseStore(store, ({ subscribe }) => {
    return {
      subscribe,
    };
  });
}
