<script>
  import connect from "../stores/connect";
</script>

<div class="flex h-full text-center">
  <div class="m-auto pb-20">
    {#if $connect.loading}
      <p>Connecting wallet...</p>
    {:else if !$connect.success}
      <button
        type="button"
        on:click={() => connect.connectWallet()}
        class="bg-blue-500 text-gray-100 py-3 px-6 rounded"
      >
        Connect wallet
      </button>
    {/if}
  </div>
</div>
