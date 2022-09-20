import { Abi, AccountInterface, Contract, ProviderInterface } from "starknet";
import { writable } from "svelte/store";
import account from "./account";
import _baseStore from "./_baseStore";

type ContractStoreType = Contract;

type ContractProps = {
  contractAddress: string;
  abi: Abi;
  providerOrAccount: ProviderInterface | AccountInterface;
};

export default function contractStore(props: ContractProps) {
  const store = writable<ContractStoreType>(
    new Contract(props.abi, props.contractAddress, props.providerOrAccount)
  );

  /* account.subscribe((data) => {
    if (!data.account) return;

    store.set(
      new Contract(props.abi, props.contractAddress, props.providerOrAccount)
    );
  }); */

  return _baseStore(store, ({ subscribe }) => {
    return {
      subscribe,
    };
  });
}
