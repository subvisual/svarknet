import { Abi, AccountInterface, Contract, ProviderInterface } from "starknet";
import { get, Writable, writable } from "svelte/store";
import account from "./account";
import _baseStore from "./_baseStore";

type ContractStoreType = Contract;

type ContractProps = {
  contractAddress: string;
  abi: Abi;
  providerOrAccount: ProviderInterface | AccountInterface;
  name?: string;
};

export const contracts = writable<Record<string, Writable<Contract>>>({});

account.subscribe((store) => {
  console.log("account updated");

  Object.entries(get(contracts)).forEach(([name, contract]) => {
    /* contract.update((data) => {
      console.log(data)
      return {
        ...data,
        providerOrAccount: store.account,
      };
    }); */
    contract.update((data) => {
      data.providerOrAccount = store.account;

      return data;
    });
  });
});

export default function contractStore(props: ContractProps) {
  const store = writable<ContractStoreType>(
    new Contract(props.abi, props.contractAddress, props.providerOrAccount)
  );

  if (!get(contracts)[props.name]) {
    contracts.update((all) => ({
      ...all,
      [props.name]: store,
    }));

    console.log(contracts);
  }

  return _baseStore(store, ({ subscribe }) => {
    return {
      subscribe,
    };
  });
}
