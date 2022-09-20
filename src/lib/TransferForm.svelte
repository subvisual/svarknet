<script lang="ts">
  import { get } from "svelte/store";
  import { contracts } from "../stores/contract";
  import transaction from "../stores/transaction";
  import account from "../stores/account";
  import walletStore from "../stores/walletStore";
  import { parseInputAmountToUint256 } from "../utils/parseInputAmountToUint256";

  let destinationAddress = "";
  let amount = 1;

  const erc20Contract = $contracts?.["erc20"];

  const transfer = transaction();

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    
    transfer.wait(() =>
      $erc20Contract.mint(
        $account.address,
        parseInputAmountToUint256(amount.toString())
      )
    );
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
      max={$walletStore.balance}
      bind:value={amount}
      class="block py-1 px-2 mr-3 rounded-sm w-20 text-gray-900"
    />
  </label>
  <button
    type="submit"
    class="mt-4 bg-blue-500 text-gray-100 py-1 px-4 rounded-sm">Transfer</button
  >
</form>
