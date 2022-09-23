import type { Abi } from "starknet";
import { get, Subscriber, Unsubscriber, writable } from "svelte/store";
import contract, { ContractStore } from "./contract";
import _baseStore from "./_baseStore";
import ERC20 from "src/data/ERC20.json";
import accountStore from "./accountStore";
import parseUint256 from "src/utils/parseUint256";
import balancesStore from "./balancesStore";

type BalanceWritableStore = {
  loading: boolean;
  success: boolean;
  error: boolean;
  balance: number;
  data: any;
};

export type BalanceStore = {
  getBalance: () => Promise<void>;
  subscribe: (run: Subscriber<BalanceWritableStore>) => Unsubscriber;
};

// Balance store. Receives either a contract or a contract address and a name.
// Creates a store function and adds it to the balances store, so the value
// and current status can be acccessed anywhere in the app by it's name

type ContractProps = {
  address?: string;
  contract?: ContractStore;
};

export default function balance(
  name: string,
  props: ContractProps
): BalanceStore {
  const { address, contract: receivedContract } = props;

  const store = writable({
    loading: false,
    success: false,
    error: false,
    balance: 0,
    data: null,
  });

  const storeActions = _baseStore(store, ({ subscribe, _set }) => {
    const _contract =
      receivedContract ||
      contract("test", {
        contractAddress: address,
        abi: ERC20 as Abi,
        providerOrAccount: get(accountStore).account,
      });

    async function getBalance() {
      _set({
        loading: true,
        error: false,
        success: false,
      });

      try {
        const bal = await get(_contract).balanceOf(get(accountStore).address);

        _set({
          success: true,
          balance: parseUint256(bal.balance),
          data: bal,
        });
      } catch (err) {
        _set({ error: true });
      } finally {
        _set({ loading: false });
      }
    }

    accountStore.subscribe(() => getBalance());

    return {
      subscribe,
      getBalance,
    };
  });

  balancesStore.addBalance(name, storeActions);

  return storeActions;
}
