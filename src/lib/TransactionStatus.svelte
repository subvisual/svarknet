<script lang="ts">
  import type { TransactionActions } from "src/stores/transactionStore";


    export let transaction: TransactionActions;
</script>

<div>
    <p>Transaction status:</p>

    {#if $transaction.isSuccess}
        <p>Success!</p>
    {/if}
</div>