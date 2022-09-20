import { utils } from "ethers";
import { number, uint256 } from "starknet";

function getUint256CalldataFromBN(bn: number.BigNumberish) {
  return { type: "struct" as const, ...uint256.bnToUint256(bn) };
}

export function parseInputAmountToUint256(
  input: string,
  decimals: number = 18
) {
  return getUint256CalldataFromBN(utils.parseUnits(input, decimals).toString());
}
