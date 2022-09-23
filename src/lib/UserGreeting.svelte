<script lang="ts">
  import accountStore from "src/starknet-stores/accountStore";
  import balance from "src/starknet-stores/balance";
  import contractsStore from "src/starknet-stores/contractsStore";
  import truncateAddress from "src/utils/truncateAddress";

  $: address = truncateAddress($accountStore.address);

  let bal = balance("testERC20", {
    contract: $contractsStore.testERC20,
  });
</script>

<div class="my-10">
  <h1 class="text-3xl">Hello there, {address}</h1>

  {#if $bal.loading}
    <p>Loading balance...</p>
  {/if}
  {#if $bal.success}
    ERC20 Balance: {$bal.balance}
  {/if}
</div>
