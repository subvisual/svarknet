import type { AccountInterface } from "starknet";
import type { TypedData } from "starknet/dist/utils/typedData";
import { get, writable } from "svelte/store";
import starknetStore from "./starknetStore";
import _baseStore from "./_baseStore";

type AccountStore = {
  address: string;
  account: AccountInterface;
  connected: boolean;
};

const store = writable<AccountStore>({
  address: "",
  account: null,
  connected: false,
});

const accountStore = _baseStore(store, ({ update, subscribe, _set }) => {
  starknetStore.subscribe((store) => {
    if (!store) return;

    _set({
      address: store.selectedAddress,
      account: store.account,
      connected: true,
    });
  });

  function sign(message: string) {
    return get(store).account.signMessage({
      domain: {
        name: "Svarknet",
        chainId:
          starknetStore.networkId() === "mainnet-alpha"
            ? "SN_MAIN"
            : "SN_GOERLI",
        version: "0.0.1",
      },
      types: {
        StarkNetDomain: [
          { name: "name", type: "felt" },
          { name: "chainId", type: "felt" },
          { name: "version", type: "felt" },
        ],
        Message: [{ name: "message", type: "felt" }],
      },
      primaryType: "Message",
      message: {
        message,
      },
    });
  }

  function watchToken(address: string) {
    get(starknetStore).request({
      type: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address,
        },
      },
    });
  }

  return {
    update,
    subscribe,
    sign,
    watchToken,
  };
});

export default accountStore;
