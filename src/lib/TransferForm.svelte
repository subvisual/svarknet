<script lang="ts">
  import contractsStore from "src/stores/contractsStore";
  import transactionStore from "src/stores/transactionStore";
  import { parseInputAmountToUint256 } from "src/utils/parseInputAmountToUint256";
  import TransactionStatus from "./TransactionStatus.svelte";
  import balancesStore from "src/stores/balancesStore"; 

  let destinationAddress = "";
  let amount = 1;

  const tx = transactionStore();
  const contract = $contractsStore.testERC20;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    await tx.waitFor(() =>
      $contract.transfer(
        destinationAddress,
        parseInputAmountToUint256(amount.toString())
      )
    );

    $balancesStore.testERC20.getBalance();
  }
</script>

<form on:submit={handleSubmit} class="mb-6">
  <h2 class="text-lg mb-2">Transfer tokens to another address</h2>
  <label class="block text-sm">
    Destination address
    <input
      type="text"
      required
      bind:value={destinationAddress}
      class="block py-1 px-2 mr-3 rounded-sm w-96 text-gray-900"
    />
  </label>

  <label class="block mt-2 text-sm">
    Quantity
    <input
      type="number"
      required
      min="1"
      bind:value={amount}
      class="block py-1 px-2 mr-3 rounded-sm w-20 text-gray-900"
    />
  </label>
  <button
    type="submit"
    class="mt-4 bg-blue-500 text-gray-100 py-1 px-4 rounded-sm">Transfer</button
  >

  <TransactionStatus transaction={tx} />
</form>
