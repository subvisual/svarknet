<script lang="ts">
  import account from "src/stores/accountStore";
  import transactionStore from "src/stores/transactionStore";
  import contractsStore from "src/stores/contractsStore";
  import { parseInputAmountToUint256 } from "src/utils/parseInputAmountToUint256";
  import TransactionStatus from "./TransactionStatus.svelte";
  import balancesStore from "src/stores/balancesStore";

  let amount = 1;

  const tx = transactionStore();
  const contract = $contractsStore.testERC20;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    await tx.waitFor(() =>
      $contract.mint(
        $account.address,
        parseInputAmountToUint256(amount.toString())
      )
    );

    $balancesStore.testERC20.getBalance();
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
  <TransactionStatus transaction={tx} />
</form>
<hr class="mb-4" />
