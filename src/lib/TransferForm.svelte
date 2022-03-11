<script lang="ts">
  import walletStore from "../stores/walletStore";

  let destinationAddress = "";
  let amount = 1;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    walletStore.transfer(destinationAddress, amount);
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
