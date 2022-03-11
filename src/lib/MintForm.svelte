<script lang="ts">
  import walletStore from "../stores/walletStore";

  let amount = 1;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    walletStore.mint(amount);
  }
</script>

<h2>Mint new tokens</h2>
<form on:submit={handleSubmit} class="my-1 flex align-center">
  <input
    type="number"
    required
    min="1"
    max="5"
    bind:value={amount}
    class="py-1 px-2 mr-3 rounded-sm w-20 text-gray-900"
  />
  <button type="submit" class="bg-blue-500 text-gray-100 py-1 px-4 rounded-sm"
    >Mint</button
  >
</form>
