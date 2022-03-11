<script lang="ts">
  import MintForm from "./lib/MintForm.svelte";

  import TokenInfo from "./lib/TokenInfo.svelte";
  import UserGreeting from "./lib/UserGreeting.svelte";
  import connectStore from "./stores/connectStore";
  import walletStore from "./stores/walletStore";
</script>

<main>
  <p>svarknet</p>

  {#if $connectStore.loading}
    Connecting wallet...
  {:else if !$connectStore.connected}
    <button type="buton" on:click={() => connectStore.connect()}>
      Connect
    </button>
  {/if}

  {#if $connectStore.connected}
    <UserGreeting />
    <MintForm />

    <TokenInfo />
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
