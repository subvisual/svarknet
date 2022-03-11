<script>
  import connectStore from "../stores/connectStore";
</script>

<div class="flex h-full text-center">
  <div class="m-auto pb-20">
    {#if $connectStore.loading}
      <p>Connecting wallet...</p>
    {:else if !$connectStore.connected}
      <button
        type="buton"
        on:click={() => connectStore.connect()}
        class="bg-blue-500 text-gray-100 py-3 px-6 rounded"
      >
        Connect wallet
      </button>
    {/if}
  </div>
</div>
