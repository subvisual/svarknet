import { getStarknet } from "@argent/get-starknet/dist";
import { formatEther, parseUnits } from "@ethersproject/units";
import {
  Abi,
  AddTransactionResponse,
  Contract,
  number,
  uint256,
} from "starknet";
import { hexToDecimalString } from "starknet/dist/utils/number";
import { get, writable } from "svelte/store";
import ERC20 from "../data/ERC20.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;

function getUint256CalldataFromBN(bn: number.BigNumberish) {
  return { type: "struct" as const, ...uint256.bnToUint256(bn) };
}

function parseInputAmountToUint256(input: string, decimals: number = 18) {
  return getUint256CalldataFromBN(parseUnits(input, decimals).toString());
}

const createWalletStore = () => {
  const starknet = getStarknet();

  const store = writable({
    userAddress: "",
    balance: null,
    contractAddress: CONTRACT_ADDRESS,
    transactions: [],
    contract: null as Contract,
  });

  function initialiseWallet(userAddress: string) {
    const contract = new Contract(
      ERC20 as Abi,
      CONTRACT_ADDRESS,
      starknet.account
    );

    store.update((store) => ({
      ...store,
      userAddress,
      contract,
    }));

    getBalance();
  }

  async function getBalance() {
    let { userAddress, contract } = get(store);

    let op = await contract.balanceOf(userAddress);

    let val = formatEther(
      hexToDecimalString(getUint256CalldataFromBN(op.balance.low).low)
    );

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

    await starknet.provider.waitForTransaction(tx.transaction_hash);

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
    let { userAddress, contract } = get(store);

    let mint = await contract.mint(userAddress, [
      parseUnits(amount.toString(), 18).toString(),
      "0",
    ]);

    waitForTx(mint);
  }

  async function transfer(to: string, amount: number) {
    let { contract } = get(store);

    let transfer = await contract.transfer(to, [
      parseUnits(amount.toString(), 18).toString(),
      "0",
    ]);

    waitForTx(transfer);
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
