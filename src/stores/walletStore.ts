import { getStarknet } from "@argent/get-starknet/dist";
import { writable } from "svelte/store";

const createWalletStore = () => {
    const starknet = getStarknet();
  
    const store = writable({
      userAddress: "",
    });
  
    function setUserAddress(userAddress: string) {
      store.update((store) => ({
        ...store,
        userAddress,
      }));
    }
  
    return {
      subscribe: store.subscribe,
      setUserAddress,
    };
  };
  
  const walletStore = createWalletStore();
  
  export default walletStore;
  