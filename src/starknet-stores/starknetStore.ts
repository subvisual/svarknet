import { getStarknet, IStarknetWindowObject } from "get-starknet";
import { constants } from "starknet";
import { get, writable } from "svelte/store";
import { connect } from "get-starknet";
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

    async function handleAccountsChange() {
      const newStarknet = getStarknet();

      if (newStarknet.account) {
        console.log(`accountsChanged:`);

        set(newStarknet);
      } else {
        const [address] = await newStarknet.enable({
          showModal: false,
          starknetVersion: "v4",
        } as any);

        console.log(`accountsChanged: ${address}`);
        address && set(newStarknet);
      }
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
