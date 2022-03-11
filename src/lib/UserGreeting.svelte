<script lang="ts">
  import walletStore from "../stores/walletStore";

  let address = $walletStore.userAddress.substring(0, 10);
</script>

<div>
  <h1>Hello there, {address}</h1>

  {#if $walletStore.balance}
    <p>Balance: <strong>{$walletStore.balance} tokens</strong></p>
  {/if}
</div>
