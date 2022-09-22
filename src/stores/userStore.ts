import { writable, get } from "svelte/store";
import contractStore from "./contractStore";
import ERC20 from "src/data/ERC20.json";
import type { Abi } from "starknet";
import accountStore from "./accountStore";
import { parseInputAmountToUint256 } from "src/utils/parseInputAmountToUint256";
import _baseStore from "./_baseStore";

let contract = contractStore("testERC20", {
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
  abi: ERC20 as Abi,
  providerOrAccount: get(accountStore).account,
});

const store = writable({
  balance: 0,
});

const userStore = _baseStore(store, ({ subscribe }) => {
  async function mint(quantity: number) {
    get(contract).mint(
      get(accountStore).address,
      parseInputAmountToUint256(quantity.toString())
    );
  }

  return {
    subscribe,
    mint,
  };
});

export default userStore;
