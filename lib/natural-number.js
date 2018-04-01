import { T, F, AND, OR, IF } from './boolean';
import { cons, tail, emptyList, isEmpty } from './list';

export const zeroNat = emptyList;
export const isZeroNat = isEmpty;
export const incNat = num => cons(zeroNat, num);
export const decNat = num => tail(num);
export const addNat = (a, b) => IF(isZeroNat(b), () => a, () => addNat(incNat(a), decNat(b)))();
export const subNat = (a, b) => IF(isZeroNat(b), () => a, () => subNat(decNat(a), decNat(b)))();
export const isEqualNat = (a, b) =>
  IF(
    AND(isZeroNat(a), isZeroNat(b)),
    () => T,
    () => IF(OR(isZeroNat(a), isZeroNat(b)), () => F, () => isEqualNat(decNat(a), decNat(b)))()
  )();
