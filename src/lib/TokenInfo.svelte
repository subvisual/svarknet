<script lang="ts">
  import accountStore from "src/starknet-stores/accountStore";
  import truncateAddress from "src/utils/truncateAddress";

  let address = import.meta.env.VITE_CONTRACT_ADDRESS;
  let tokenStatus = "";

  async function addTokenToWallet() {
    tokenStatus = "loading...";

    let added = await accountStore.watchToken(address);

    tokenStatus = added
      ? "Done!"
      : "Something went wrong. You might already have this token";
  }
</script>

<div class="mt-10 mb-10 text-blue-400">
  <a href={`https://goerli.voyager.online/contract/${address}`} target="_blank">
    ERC-20 token address: {truncateAddress(address)}
  </a>
  <button on:click={addTokenToWallet} class="underline mt-1 block">
    Add this to your wallet
  </button>
  <p class="test-sm">{tokenStatus}</p>
</div>
