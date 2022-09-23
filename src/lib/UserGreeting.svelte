<script lang="ts">
  import accountStore from "src/stores/accountStore";
  import balanceStore from "src/stores/balanceStore";
  import contractsStore from "src/stores/contractsStore";
  import truncateAddress from "src/utils/truncateAddress";

  $: address = truncateAddress($accountStore.address);

  let balance = balanceStore({
    contract: $contractsStore.testERC20,
    name: "testERC20",
  });
</script>

<div class="my-10">
  <h1 class="text-3xl">Hello there, {address}</h1>

  {#if $balance.loading}
    <p>Loading balance...</p>
  {/if}
  {#if $balance.success}
    ERC20 Balance: {$balance.balance}
  {/if}
</div>
