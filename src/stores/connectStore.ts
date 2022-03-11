import { getStarknet } from "@argent/get-starknet/dist";
import { writable } from "svelte/store";
import walletStore from "./walletStore";

function createConnectStore() {
  const { update, subscribe } = writable({
    loading: false,
  });

  const starknet = getStarknet();

  function setLoading(loading: boolean) {
    update((store) => ({ ...store, loading }));
  }

  async function connect() {
    setLoading(true);

    const [userWalletContractAddress] = await starknet.enable({
      showModal: true,
    });

    if (starknet.isConnected) {
      walletStore.setUserAddress(userWalletContractAddress);
    }

    setLoading(false);
  }

  return {
    subscribe,
    connect,
  };
}

const connectStore = createConnectStore();

export default connectStore;
