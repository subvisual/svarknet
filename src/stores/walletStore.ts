import { getStarknet } from "@argent/get-starknet/dist";
import { formatEther, parseUnits } from "@ethersproject/units";
import type { AddTransactionResponse } from "starknet";
import { hexToDecimalString } from "starknet/dist/utils/number";
import { getSelectorFromName } from "starknet/dist/utils/stark";
import { get, writable } from "svelte/store";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;

const createWalletStore = () => {
  const starknet = getStarknet();

  const store = writable({
    userAddress: "",
    balance: null,
    contractAddress: CONTRACT_ADDRESS,
    transactions: [],
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

  async function waitForTx(tx: AddTransactionResponse) {
    store.update((store) => ({
      ...store,
      transactions: [
        ...store.transactions,
        {
          status: "pending",
          tx,
        },
      ],
    }));

    await starknet.provider.waitForTx(tx.transaction_hash);

    store.update((store) => ({
      ...store,
      transactions: [
        ...store.transactions.map((t) =>
          t.tx.transaction_hash === tx.transaction_hash
            ? {
                status: "done",
                tx,
              }
            : tx
        ),
      ],
    }));

    getBalance();
  }

  async function mint(amount: number) {
    let { userAddress } = get(store);

    let tx = await starknet.signer.invokeFunction(
      CONTRACT_ADDRESS,
      getSelectorFromName("mint"),
      [
        hexToDecimalString(userAddress),
        parseUnits(amount.toString(), 18).toString(),
        "0",
      ]
    );

    waitForTx(tx);
  }

  async function transfer(to: string, amount: number) {
    let tx = await starknet.signer.invokeFunction(
      CONTRACT_ADDRESS,
      getSelectorFromName("transfer"),
      [
        hexToDecimalString(to),
        parseUnits(amount.toString(), 18).toString(),
        "0",
      ]
    );

    waitForTx(tx);
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
