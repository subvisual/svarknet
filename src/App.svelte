<script lang="ts">
  import connectStore from "./stores/connectStore";
  import walletStore from "./stores/walletStore";
</script>

<main>
  <h1>svarknet</h1>

  {#if $connectStore.loading}
    Connecting...
  {/if}

  {#if $walletStore.userAddress}
    <h1>Hello there, {$walletStore.userAddress.substring(0, 10)}</h1>
  {:else}
    <button type="buton" on:click={() => connectStore.connect()}>Connect</button
    >
  {/if}

  balance: {$walletStore.balance}

  <button on:click={walletStore.mint}>Mint</button>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
