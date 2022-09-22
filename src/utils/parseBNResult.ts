import { formatEther } from "ethers/lib/utils";
import { number } from "starknet";

export default function parseBNResult(val: any) {
  return Number(formatEther(number.toBN(val, 16).toString()));
}
