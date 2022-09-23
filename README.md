# Svarknet

A Starknet starter dapp built with Svelte and Vite

Deployed at [svarknet.vercel.app](https://svarknet.vercel.app/).
It uses [this ERC20 contract](https://goerli.voyager.online/contract/0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10).

## Getting started

Just run `yarn` to install dependencies, and `yarn dev` to run the app, on `http://localhost:5173`.

## Using stores

This starter contains several stores that help you interact with Starknet.

An example is the `connectStore`:

```svelte
{#if $connectStore.idle}
  <button
    type="button"
    on:click={() => connectStore.connectWallet()}
  >
    Connect wallet
  </button>
{:else if $connectStore.loading}
  <p>Connecting wallet...</p>
{/if}
```

You can also create a contract instance store, and provide a name. The instance will be kept in a store, and can be accessed from anywhere in the app.

```svelte
// App.svelte
<script lang="ts">
  contractStore("testERC20", {
      contractAddress: CONTRACT_ADDRESS,
      abi: ERC20,
      providerOrAccount: $accountStore.account,
  });
</script>

//MintForm.svelte
<script lang="ts">
  const contract = $contractsStore.testERC20;

  $contract.mint($account.address, 1)
</script>
```

In the same way, you can track the balance of a given token. It will also get added to a store, so you can interact with it elsewhere.

```svelte
// Component A
<script lang="ts">
  let bal = balance({
    contract: $contractsStore.testERC20,
    name: "testERC20",
  });
</script>

<div>
  {#if $bal.loading}
    <p>Loading balance...</p>
  {/if}
  {#if $bal.success}
    ERC20 Balance: {$bal.balance}
  {/if}
</div>

// Component B
<script lang="ts">
  function refreshBalance() {
    $balancesStore.testERC20.getBalance();
  }
</script>
```

You can use the `transactionHandler` to track the status of a transaction. It creates a store with reactive values for `pending`, `success`, etc.

```svelte
<script lang="ts">
  const tx = transactionHandler();
  const contract = $contractsStore.testERC20;

  async function mint() {
    await tx.waitFor(() =>
      $contract.mint($account.address, 1)
    );
  }
</script>

<div>
  {#if $tx.pending}
    <p>Pending...</p>
  {:else if $tx.error}
    <p>Something went wrong!</p>
  {:else if $tx.success}
    <p>Success!</p>
  {/if}
</div>
```
