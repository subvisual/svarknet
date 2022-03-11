import { getStarknet } from "@argent/get-starknet/dist";
import { formatEther, parseUnits } from "@ethersproject/units";
import { Abi, Contract, Signer, stark } from "starknet";
import { hexToDecimalString } from "starknet/dist/utils/number";
import { getSelectorFromName } from "starknet/dist/utils/stark";
import { get, writable } from "svelte/store";
import ERC721 from "../data/ERC721.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;

const createWalletStore = () => {
  const starknet = getStarknet();

  const store = writable({
    userAddress: "",
    balance: "0",
    contractAddress: CONTRACT_ADDRESS
  });

  function initialiseWallet(userAddress: string) {
    store.update((store) => ({
      ...store,
      userAddress,
    }));

    getBalance();
  }

  async function getBalance() {
    let { userAddress } = get(store);

    const balanceOf = await starknet.provider.callContract({
      contract_address: CONTRACT_ADDRESS,
      entry_point_selector: getSelectorFromName("balanceOf"),
      calldata: [hexToDecimalString(userAddress)],
    });

    store.update((store) => ({
      ...store,
      balance: formatEther(hexToDecimalString(balanceOf.result[0])),
    }));
  }

  async function mint() {
    let { userAddress } = get(store);

    let mint = await starknet.signer.invokeFunction(
      CONTRACT_ADDRESS,
      getSelectorFromName("mint"),
      [hexToDecimalString(userAddress), parseUnits("1", 18).toString(), "0"]
    );
  }

  return {
    subscribe: store.subscribe,
    initialiseWallet,
    mint,
  };
};

const walletStore = createWalletStore();

export default walletStore;
