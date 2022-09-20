<script lang="ts">
  import connect from "./stores/connect";
  import UserGreeting from "./lib/UserGreeting.svelte";
  import MintForm from "./lib/MintForm.svelte";
  import ConnectWallet from "./lib/ConnectWallet.svelte";
</script>

<main class="flex flex-col h-full py-10 px-20 bg-gray-800 text-gray-100">
  <div class="flex-1">
    {#if $connect.success}
      <UserGreeting />
      <MintForm />  
    {:else}
      <ConnectWallet />
    {/if}

    <!-- {#if $connectStore.connected}
      <UserGreeting />
      <TransferForm />
      <TransactionLog />
      <TokenInfo />
    {:else}
      <ConnectWallet />
    {/if} -->
  </div>
  <div>
    <p>starknet + vite + svelte</p>
  </div>
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
