<script lang="ts">
  import type { Abi } from "starknet";
  import contractStore from "../stores/contract";
  import ERC20 from "../data/ERC20.json";
  import account from "../stores/account";
  import { parseInputAmountToUint256 } from "../utils/parseInputAmountToUint256";

  const ADDRESS =
    "0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10";

  let amount = 1;

  const erc20Contract = contractStore({
    contractAddress: ADDRESS,
    abi: ERC20 as Abi,
    providerOrAccount: $account.account,
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    $erc20Contract.mint(
      $account.address,
      parseInputAmountToUint256(amount.toString())
    );
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
</form>
