import { getStarknet } from "@argent/get-starknet/dist";
import { writable } from "svelte/store";
import walletStore from "./walletStore";

function createConnectStore() {
  const { update, subscribe } = writable({
    loading: true,
  });

  const starknet = getStarknet();

  function setLoading(loading: boolean) {
    update((store) => ({ ...store, loading }));
  }

  async function connect(showModal = true) {
    setLoading(true);

    const [userWalletContractAddress] = await starknet.enable({
      showModal,
    });

    if (starknet.isConnected) {
      walletStore.initialiseWallet(userWalletContractAddress);
    }

    setLoading(false);
  }

  async function init() {
    let preAuth = await starknet.isPreauthorized();

    if (preAuth) {
      connect(false);
    } else {
      setLoading(false);
    }
  }

  return {
    subscribe,
    connect,
    init,
  };
}

const connectStore = createConnectStore();

connectStore.init();

export default connectStore;
