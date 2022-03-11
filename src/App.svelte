<script lang="ts">
  import ConnectWallet from "./lib/ConnectWallet.svelte";
  import MintForm from "./lib/MintForm.svelte";
  import TokenInfo from "./lib/TokenInfo.svelte";
  import TransactionLog from "./lib/TransactionLog.svelte";
  import TransferForm from "./lib/TransferForm.svelte";
  import UserGreeting from "./lib/UserGreeting.svelte";
  import connectStore from "./stores/connectStore";
  import walletStore from "./stores/walletStore";
</script>

<main class="flex flex-col h-full py-10 px-20 bg-gray-800 text-gray-100">
  <div class="flex-1">
    {#if $connectStore.connected}
      <UserGreeting />
      <MintForm />
      <TransferForm />
      <TransactionLog />

      <TokenInfo />
    {:else}
      <ConnectWallet />
    {/if}
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
