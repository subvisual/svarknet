<script lang="ts">
  import account from "../stores/accountStore";
  import transactionStore from "../stores/transactionStore";
  import contractsStore from "../stores/contractsStore";
  import { parseInputAmountToUint256 } from "../utils/parseInputAmountToUint256";

  let amount = 1;

  const transaction = transactionStore();

  const erc20Contract = $contractsStore.testERC20;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    console.log($erc20Contract);

    transaction.wait(() =>
      $erc20Contract.mint(
        $account.address,
        parseInputAmountToUint256(amount.toString())
      )
    );
  }
</script>

<form on:submit={handleSubmit} class="mb-10">
  <h2 class="text-lg mb-2">Mint tokens</h2>
  <input
    type="number"
    required
    min="1"
    max="5"
    bind:value={amount}
    class="block py-1 px-2 mr-3 rounded-sm w-20 text-gray-900"
  />
  <button
    type="submit"
    class="mt-4 bg-blue-500 text-gray-100 py-1 px-4 rounded-sm">Mint</button
  >
  {#if $transaction.isLoading}
    loading...
  {:else if $transaction.isSuccess}
    Done!
  {:else if $transaction.isError}
    Something went wrong
  {/if}
</form>
