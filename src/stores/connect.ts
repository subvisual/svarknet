import { writable } from "svelte/store";
import { connect as starknetConnect } from "get-starknet";
import starknetStore from "./starknet";
import _baseStore from "./_baseStore";

type ConnectStore = {
  loading: boolean;
  success: boolean;
  idle: boolean;
  error: boolean;
};

const store = writable<ConnectStore>({
  loading: false,
  success: false,
  idle: true,
  error: false,
});

const connect = _baseStore(store, ({ subscribe, _set }) => {  
  async function connectWallet() {
    _set({
      loading: true,
      idle: true,
    });

    try {
      const starknet = await starknetConnect();

      const [address] = await starknet.enable({
        showModal: true,
      });

      starknetStore.set(starknet);

      if (address) {
        _set({ success: true });
      }
    } catch {
      _set({ error: true });
    } finally {
      _set({
        loading: false,
        idle: true,
      });
    }
  }

  return {
    subscribe,
    connectWallet,
  };
});

export default connect;
