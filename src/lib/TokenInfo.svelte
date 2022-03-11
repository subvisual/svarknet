<script lang="ts">
  import walletStore from "../stores/walletStore";
</script>

<div>
  <p>ERC-20 token address:</p>
  <pre>{$walletStore.contractAddress}</pre>
  <button on:click={walletStore.watchToken}>Add this to your wallet</button>
</div>
