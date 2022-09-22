<script lang="ts">
  import connect from "./stores/connectStore";
  import accountStore from "./stores/accountStore";
  import UserGreeting from "./lib/UserGreeting.svelte";
  import MintForm from "./lib/MintForm.svelte";
  import ConnectWallet from "./lib/ConnectWallet.svelte";
  import TransferForm from "./lib/TransferForm.svelte";
  import type { Abi } from "starknet";
  import contractStore from "./stores/contractStore";
  import ERC20 from "./data/ERC20.json";

  contractStore("testERC20", {
    contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: ERC20 as Abi,
    providerOrAccount: $accountStore.account,
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
