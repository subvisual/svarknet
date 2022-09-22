<script lang="ts">
  import type { TransactionStore } from "src/stores/transactionStore";

  export let transaction: TransactionStore;
</script>

<div>
  {#if $transaction.pending}
    <p>Pending...</p>
  {/if}

  {#if $transaction.error}
    <p>Something went wrong!</p>
  {/if}

  {#if $transaction.success}
    <p>Success!</p>
  {/if}

  {#if $transaction.hash && !$transaction.idle}
    {$transaction.hash}
  {/if}
</div>
