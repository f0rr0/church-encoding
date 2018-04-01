import { NOT, IF } from './boolean';
import { zeroNat, isZeroNat, decNat, incNat, addNat, isEqualNat } from './natural-number';

export const pair = (a, b) => selector => selector(a, b);
export const first = pair => pair((a, _) => a);
export const second = pair => pair((_, b) => b);
export const zero = pair(zeroNat, zeroNat);
export const isZero = int => isEqualNat(first(int), second(int));
export const inc = int =>
  IF(
    NOT(isZeroNat(second(int))),
    () => pair(first(int), decNat(second(int))),
    () => pair(incNat(first(int)), second(int))
  )();
export const dec = int =>
  IF(
    isZeroNat(first(int)),
    () => pair(first(int), incNat(second(int))),
    () => pair(decNat(first(int)), second(int))
  )();
export const negate = int => pair(second(int), first(int));
export const add = (a, b) => pair(addNat(first(a), first(b)), addNat(second(a), second(b)));
export const sub = (a, b) => add(a, negate(b));
export const isEqual = (a, b) => isZero(sub(a, b));
