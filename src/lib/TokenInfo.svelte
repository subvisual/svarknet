<script lang="ts">
  import accountStore from "src/stores/accountStore";
  import truncateAddress from "src/utils/truncateAddress";

  let address = import.meta.env.VITE_CONTRACT_ADDRESS;
</script>

<div class="mt-10 mb-10 text-blue-400">
  <a href={`https://goerli.voyager.online/contract/${address}`} target="_blank">
    ERC-20 token address: {truncateAddress(address)}
  </a>
  <button
    on:click={() => accountStore.watchToken(address)}
    class="underline mt-1 block"
  >
    Add this to your wallet
  </button>
</div>
