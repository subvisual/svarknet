<script lang="ts">
  import walletStore from "../stores/walletStore";
</script>

<div class="mt-20 text-blue-400">
  <p>ERC-20 token address:</p>
  <a
    href={`https://goerli.voyager.online/contract/${$walletStore.contractAddress}`}
    target="_blank"
    ><pre>{$walletStore.contractAddress.substring(0, 20)}...</pre></a
  >
  <button on:click={walletStore.watchToken} class="underline mt-1"
    >Add this to your wallet</button
  >
</div>
