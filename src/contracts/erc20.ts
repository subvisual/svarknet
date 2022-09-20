import { get } from "svelte/store";
import type { Abi } from "starknet";
import contractStore from "../stores/contract";
import ERC20 from "../data/ERC20.json";
import account from "../stores/account";

/* let currentAcount = get(account).account; */
let erc20Contract = contractStore({
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
  abi: ERC20 as Abi,
  providerOrAccount: null,
});

account.subscribe((store) => {
  console.log("account updated " + store?.account?.address);

  erc20Contract = contractStore({
    contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: ERC20 as Abi,
    providerOrAccount: store.account,
  });
});

export default erc20Contract;
