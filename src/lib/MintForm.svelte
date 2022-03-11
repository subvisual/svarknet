<script lang="ts">
  import walletStore from "../stores/walletStore";

  let amount = 1;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    walletStore.mint(amount);
  }
</script>

<form on:submit={handleSubmit} class="mb-6">
  <h2 class="text-lg mb-2">Mint tokens</h2>
  <input
    type="number"
    required
    min="1"
    max="5"
    bind:value={amount}
    class="block py-1 px-2 mr-3 rounded-sm w-20 text-gray-900"
  />
  <button type="submit" class="mt-4 bg-blue-500 text-gray-100 py-1 px-4 rounded-sm"
    >Mint</button
  >
</form>
