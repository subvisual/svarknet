<script>
  import connectStore from "src/starknet-stores/connectStore";
</script>

<div class="flex flex-1 items-center min-h-full text-center">
  <div class="m-auto pb-20">
    {#if $connectStore.loading}
      <p>Connecting wallet...</p>
    {:else if !$connectStore.success}
      <button
        type="button"
        on:click={() => connectStore.connectWallet()}
        class="bg-blue-500 text-gray-100 py-3 px-6 rounded"
      >
        Connect wallet
      </button>
    {/if}
  </div>
</div>
