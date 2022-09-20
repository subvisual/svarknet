<script lang="ts">
  import accountStore from "src/starknet-stores/accountStore";
  import type { TypedData } from "starknet/dist/utils/typedData";

  let message = "";
  let signedMessage = [];

  async function handleSubmit(event: Event) {
    event.preventDefault();

    signedMessage = await accountStore.sign(message);
  }
</script>

<div>
  <form on:submit={handleSubmit}>
    <h2 class="text-lg mb-2">Sign a message</h2>
    <textarea
      bind:value={message}
      class="block py-1 px-2 mr-3 rounded-sm text-gray-900"
      cols="20"
    />
    <button
      type="submit"
      class="mt-4 bg-blue-500 text-gray-100 py-1 px-4 rounded-sm">Sign</button
    >
  </form>

  {#if signedMessage.length > 0}
    <div class="mt-4 text-sm">
      <p class="mb-1">Signed message:</p>
      <pre class="whitespace-pre-wrap break-all">{JSON.stringify(
          signedMessage
        )}</pre>
    </div>
  {/if}
</div>
