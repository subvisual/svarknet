import { Abi, AccountInterface, Contract, ProviderInterface } from "starknet";
import { Writable, writable } from "svelte/store";
import contractsStore from "./contractsStore";
import _baseStore from "./_baseStore";

export type ContractWritableStore = Contract;

export type ContractStore = Writable<Contract>;

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

  contractsStore.addContract(name, store);

  return store;
}
