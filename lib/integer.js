import { NOT, IF, OR, AND, T, F } from './boolean';
import {
  zeroNat,
  isZeroNat,
  decNat,
  incNat,
  addNat,
  isEqualNat,
  mulNat,
  modNat,
  expNat,
  isLessThanNat
} from './natural-number';

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
export const normalize = int =>
  IF(
    isZero(int),
    () => zero,
    () =>
      IF(
        OR(isZeroNat(first(int)), isZeroNat(second(int))),
        () => int,
        () => normalize(pair(decNat(first(int)), decNat(second(int))))
      )()
  )();
export const abs = int =>
  IF(isZeroNat(first(normalize(int))), () => second(normalize(int)), () => first(normalize(int)))();
export const negate = int => pair(second(int), first(int));
export const add = (a, b) => pair(addNat(first(a), first(b)), addNat(second(a), second(b)));
export const sub = (a, b) => add(a, negate(b));
export const isEqual = (a, b) => isZero(sub(a, b));
export const mul = (a, b) =>
  pair(
    addNat(mulNat(first(a), first(b)), mulNat(second(a), second(b))),
    addNat(mulNat(first(a), second(b)), mulNat(second(a), first(b)))
  );
export const exp = (pow, int) =>
  IF(
    isZeroNat(modNat(abs(pow), incNat(incNat(zeroNat)))),
    () => pair(expNat(abs(pow), abs(int)), zeroNat),
    () => pair(zeroNat, expNat(abs(pow), abs(int)))
  )();
export const isNegative = a => NOT(isZeroNat(second(normalize(a))));
export const isLessThan = (a, b) =>
  IF(
    OR(AND(isNegative(a), isNegative(b)), AND(NOT(isNegative(a)), NOT(isNegative(b)))),
    () =>
      IF(
        AND(isNegative(a), isNegative(b)),
        () => NOT(isLessThanNat(abs(a), abs(b))),
        () => isLessThanNat(abs(a), abs(b))
      )(),
    () => IF(isNegative(a), () => T, () => F)()
  )();
export const isLessThanEqual = (a, b) => OR(isLessThan(a, b), isEqual(a, b));
export const isGreaterThan = (a, b) => isLessThan(b, a);
export const isGreaterThanEqual = (a, b) => isLessThanEqual(b, a);
