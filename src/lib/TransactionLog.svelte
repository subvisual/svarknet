<script>
  import walletStore from "../stores/walletStore";

  let list = $walletStore.transactions.filter(
    (item) => item.status === "pending"
  );
</script>

<div>
  {#if list.length > 0}
    <p>Pending transactions:</p>
    {#each list as item}
      <div class="my-2">
        <pre>{item.tx.transaction_hash.substring(0, 10)}...</pre>
        <a
          href={`https://goerli.voyager.online/tx/${item.tx.transaction_hash}`}
          target="_blank"
        >
          View on explorer
        </a>
      </div>
    {/each}
  {/if}
</div>
