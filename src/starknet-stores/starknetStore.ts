import type { IStarknetWindowObject } from "get-starknet";
import { constants } from "starknet";
import { connect } from "get-starknet";
import { get, writable } from "svelte/store";
import { connect as starknetConnect } from "get-starknet";
import _baseStore from "./_baseStore";

// Store for the starknet object. Handles account change updates.

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

    async function handleAccountsChange(data) {
      console.log(`accountsChanged: ${data}`);

      const st = await connect({ showList: false });

      set(st);
    }

    _subscribeOnce((data) => {
      if (!data) {
        console.log("no starknet object available");

        return false;
      }

      data?.on("accountsChanged", handleAccountsChange);

      console.log(
        "starknet object available: accountsChanged listener attached"
      );

      return true;
    });

    return {
      subscribe,
      set,
      networkId,
      handleAccountsChange,
    };
  }
);

export default starknetStore;
