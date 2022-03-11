<script lang="ts">
  import walletStore from "../stores/walletStore";

  let amount = 1;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    walletStore.mint(amount);
  }
</script>

<form on:submit={handleSubmit}>
  <h2>Mint new tokens</h2>
  <input type="number" required min="1" max="5" bind:value={amount} />
  <button type="submit">Mint</button>
</form>
