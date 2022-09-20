<script lang="ts">
  import connect from "./stores/connect";
  import account from "./stores/account";
</script>

<main class="flex flex-col h-full py-10 px-20 bg-gray-800 text-gray-100">
  <div class="flex-1">
    <button on:click={() => connect.connectWallet()}>
      connect {$connect.loading ? "loading..." : ""}
    </button>
    {#if $connect.success}
      <p>done!</p>
    {/if}

    {#if $account.address}
      <p>{$account.address}</p>
    {/if}

    <!-- {#if $connectStore.connected}
      <UserGreeting />
      <MintForm />
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
