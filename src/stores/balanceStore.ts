import type { Abi, uint256 } from "starknet";
import {
  get,
  Subscriber,
  Unsubscriber,
  Writable,
  writable,
} from "svelte/store";
import contractStore, { ContractStore } from "./contractStore";
import _baseStore from "./_baseStore";
import ERC20 from "src/data/ERC20.json";
import accountStore from "./accountStore";
import parseUint256 from "src/utils/parseUint256";
import balancesStore from "./balancesStore";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import { formatEther } from "ethers/lib/utils";

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

export default function balanceStore({
  address,
  contract,
  name,
}: {
  address?: string;
  contract?: ContractStore;
  name?: string;
}): BalanceStore {
  const store = writable({
    loading: false,
    success: false,
    error: false,
    balance: 0,
    data: null,
  });

  const storeActions = _baseStore(store, ({ subscribe, _set }) => {
    const _contract =
      contract ||
      contractStore("test", {
        contractAddress: address,
        abi: ERC20 as Abi,
        providerOrAccount: get(accountStore).account,
      });

    let a = _contract;
    a;

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
