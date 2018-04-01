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
export const mulNat = (a, b) =>
  IF(isZeroNat(b), () => zeroNat, () => addNat(a, mulNat(a, decNat(b))))();
export const expNat = (pow, num) =>
  IF(isZeroNat(pow), () => incNat(zeroNat), () => mulNat(num, expNat(decNat(num), num)));
export const isLessThanNat = (a, b) =>
  IF(
    AND(isZeroNat(a), isZeroNat(b)),
    () => F,
    () =>
      IF(
        isZeroNat(b),
        () => F,
        () => IF(isZeroNat(a), () => T, () => isLessThanNat(decNat(a), decNat(b)))()
      )()
  )();
export const isLessThanEqualNat = (a, b) => OR(isLessThanNat(a, b), isEqualNat(a, b));
export const isGreaterThanNat = (a, b) => isLessThanNat(b, a);
export const isGreaterThanEqualNat = (a, b) => isLessThanEqualNat(b, a);
export const divNat = (a, b) =>
  IF(
    isLessThanNat(a, b),
    () => zeroNat,
    () =>
      IF(
        isEqualNat(a, b),
        () => incNat(zeroNat),
        () => addNat(incNat(zeroNat), divNat(subNat(a, b), b))
      )()
  )();
export const modNat = (a, b) => subNat(a, mulNat(b, divNat(a, b)));
