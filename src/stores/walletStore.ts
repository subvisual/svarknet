import { getStarknet } from "@argent/get-starknet/dist";
import { formatEther, parseUnits } from "@ethersproject/units";
import { Abi, Contract, Signer, stark } from "starknet";
import { hexToDecimalString } from "starknet/dist/utils/number";
import { getSelectorFromName } from "starknet/dist/utils/stark";
import { get, writable } from "svelte/store";
import ERC20 from "../data/ERC20.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;

const createWalletStore = () => {
  const starknet = getStarknet();

  const store = writable({
    userAddress: "",
    balance: null,
    contractAddress: CONTRACT_ADDRESS,
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

    let val = formatEther(hexToDecimalString(balanceOf.result[0]));

    store.update((store) => ({
      ...store,
      balance: Math.round(Number(val)),
    }));
  }

  async function mint(amount: number) {
    let { userAddress } = get(store);

    await starknet.signer.invokeFunction(
      CONTRACT_ADDRESS,
      getSelectorFromName("mint"),
      [
        hexToDecimalString(userAddress),
        parseUnits(amount.toString(), 18).toString(),
        "0",
      ]
    );
  }

  async function transfer(to: string, amount: number) {
    let op = await starknet.signer.invokeFunction(
      CONTRACT_ADDRESS,
      getSelectorFromName("transfer"),
      [
        hexToDecimalString(to),
        parseUnits(amount.toString(), 18).toString(),
        "0",
      ]
    );

    starknet.provider.waitForTx;

    console.log(op);
  }

  async function watchToken() {
    starknet.request({
      type: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: get(store).contractAddress,
        },
      },
    });
  }

  return {
    subscribe: store.subscribe,
    initialiseWallet,
    mint,
    transfer,
    watchToken,
  };
};

const walletStore = createWalletStore();

export default walletStore;
