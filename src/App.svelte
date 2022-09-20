<script lang="ts">
  import connect from "./stores/connect";
  import account from "./stores/account";
  import UserGreeting from "./lib/UserGreeting.svelte";
  import MintForm from "./lib/MintForm.svelte";
  import ConnectWallet from "./lib/ConnectWallet.svelte";
  import TransferForm from "./lib/TransferForm.svelte";
  import type { Abi } from "starknet";
  import contractStore from "./stores/contract";
  import ERC20 from "./data/ERC20.json";

  contractStore({
    contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: ERC20 as Abi,
    providerOrAccount: $account.account,
    name: "erc20",
  });
</script>

<main class="flex flex-col h-full py-10 px-20 bg-gray-800 text-gray-100">
  <div class="flex-1">
    {#if $connect.success}
      <UserGreeting />
      <MintForm />
      <TransferForm />
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
