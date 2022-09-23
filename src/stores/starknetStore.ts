import type { IStarknetWindowObject } from "get-starknet";
import { constants } from "starknet";
import { connect } from "get-starknet";
import { get, writable } from "svelte/store";
import _baseStore from "./_baseStore";

const store = writable<IStarknetWindowObject>();

const starknetStore = _baseStore(
  store,
  ({ set, subscribe, _subscribeOnce }) => {
    function networkId() {
      try {
        const { chainId } = get(store).provider;
        if (chainId === constants.StarknetChainId.MAINNET) {
          return "mainnet-alpha";
        } else if (chainId === constants.StarknetChainId.TESTNET) {
          return "goerli-alpha";
        } else {
          return "localhost";
        }
      } catch {}
    }

    async function handleAccountsChange() {
      const st = await connect({ showList: false });

      set(st);
    }

    _subscribeOnce((data) => {
      if (!data) {
        return false;
      }

      data?.on("accountsChanged", handleAccountsChange);

      return true;
    });

    return {
      subscribe,
      set,
      networkId,
    };
  }
);

export default starknetStore;
