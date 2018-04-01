import { IF } from './boolean';
import { isEmpty, head, tail } from './list';
import { isZeroNat, decNat } from './natural-number';
import { first, second } from './integer';

export const decodeBool = bool => bool(true, false);
export const decodeList = list =>
  IF(isEmpty(list), () => [], () => [head(list)].concat(decodeList(tail(list))))();
export const decodeNatNumber = num =>
  IF(isZeroNat(num), () => 0, () => 1 + decodeNatNumber(decNat(num)))();
export const decodeInteger = int => decodeNatNumber(first(int)) - decodeNatNumber(second(int));
