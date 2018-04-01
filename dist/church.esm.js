/* church-encoding 1.0.0 */
const T = (left, _) => left;
const F = (_, right) => right;
const IF = (predicate, left, right) => predicate(left, right);
const AND = (a, b) => IF(a, IF(b, T, F), F);
const OR = (a, b) => IF(a, T, IF(b, T, F));
const NOT = a => IF(a, F, T);

const emptyList = selector => selector(undefined, undefined, T);
const cons = (el, list) => selector => selector(el, list, F);
const head = list => list((head, _, __) => head);
const tail = list => list((_, tail, __) => tail);
const isEmpty = list => list((_, __, bool) => bool);

const zeroNat = emptyList;
const isZeroNat = isEmpty;
const incNat = num => cons(zeroNat, num);
const decNat = num => tail(num);
const addNat = (a, b) => IF(isZeroNat(b), () => a, () => addNat(incNat(a), decNat(b)))();
const subNat = (a, b) => IF(isZeroNat(b), () => a, () => subNat(decNat(a), decNat(b)))();
const isEqualNat = (a, b) =>
  IF(
    AND(isZeroNat(a), isZeroNat(b)),
    () => T,
    () => IF(OR(isZeroNat(a), isZeroNat(b)), () => F, () => isEqualNat(decNat(a), decNat(b)))()
  )();

const pair = (a, b) => selector => selector(a, b);
const first = pair => pair((a, _) => a);
const second = pair => pair((_, b) => b);
const zero = pair(zeroNat, zeroNat);
const isZero = int => isEqualNat(first(int), second(int));
const inc = int =>
  IF(
    NOT(isZeroNat(second(int))),
    () => pair(first(int), decNat(second(int))),
    () => pair(incNat(first(int)), second(int))
  )();
const dec = int =>
  IF(
    isZeroNat(first(int)),
    () => pair(first(int), incNat(second(int))),
    () => pair(decNat(first(int)), second(int))
  )();
const negate = int => pair(second(int), first(int));
const add = (a, b) => pair(addNat(first(a), first(b)), addNat(second(a), second(b)));
const sub = (a, b) => add(a, negate(b));
const isEqual = (a, b) => isZero(sub(a, b));

const map = (f, list) =>
  IF(isEmpty(list), () => emptyList, () => cons(f(head(list)), map(f, tail(list))))();
const filter = (f, list) =>
  IF(
    isEmpty(list),
    () => emptyList,
    () =>
      IF(
        f(head(list)),
        () => cons(head(list), filter(f, tail(list))),
        () => filter(f, tail(list))
      )()
  )();
const nth = (index, list) =>
  IF(isZero(index), () => head(list), () => nth(dec(index), tail(list)))();
const length = list => IF(isEmpty(list), () => zero, () => inc(length(tail(list))))();

const decodeBool = bool => bool(true, false);
const decodeList = list =>
  IF(isEmpty(list), () => [], () => [head(list)].concat(decodeList(tail(list))))();
const decodeNatNumber = num =>
  IF(isZeroNat(num), () => 0, () => 1 + decodeNatNumber(decNat(num)))();
const decodeInteger = int => decodeNatNumber(first(int)) - decodeNatNumber(second(int));

export { T, F, IF, AND, OR, NOT, emptyList, cons, head, tail, isEmpty, zeroNat, isZeroNat, incNat, decNat, addNat, subNat, isEqualNat, pair, first, second, zero, isZero, inc, dec, negate, add, sub, isEqual, map, filter, nth, length, decodeBool, decodeList, decodeNatNumber, decodeInteger };
/* Follow me on Twitter @f0rr0 */
