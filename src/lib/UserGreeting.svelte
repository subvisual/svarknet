<script lang="ts">
  import accountStore from "../stores/accountStore";

  $: address = $accountStore.address.substring(0, 10);
</script>

<div class="my-10">
  <h1 class="text-3xl">Hello there, {address}</h1>
</div>
