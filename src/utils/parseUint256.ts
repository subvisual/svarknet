import { formatEther } from "ethers/lib/utils";
import { uint256ToBN } from "starknet/dist/utils/uint256";

export default function parseUint256(val: any) {
  return Number(formatEther(uint256ToBN(val).toString()));
}
