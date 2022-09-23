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
  import SignMessage from "./lib/SignMessage.svelte";
  import TokenInfo from "./lib/TokenInfo.svelte";

  contractStore("testERC20", {
    contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: ERC20 as Abi,
    providerOrAccount: $accountStore.account,
  });
</script>

<div class="flex flex-col min-h-full py-10 px-20 bg-gray-800 text-gray-100">
  {#if $connect.success}
    <main class="flex-1">
      <UserGreeting />
      <TokenInfo />
      <MintForm />
      <TransferForm />
      <SignMessage />
    </main>
  {:else}
    <ConnectWallet />
  {/if}
  <footer class="mt-10">
    <p>starknet + vite + svelte</p>
  </footer>
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
