/* church-encoding 1.0.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.churchEncoding = {})));
}(this, (function (exports) { 'use strict';

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

  exports.T = T;
  exports.F = F;
  exports.IF = IF;
  exports.AND = AND;
  exports.OR = OR;
  exports.NOT = NOT;
  exports.emptyList = emptyList;
  exports.cons = cons;
  exports.head = head;
  exports.tail = tail;
  exports.isEmpty = isEmpty;
  exports.zeroNat = zeroNat;
  exports.isZeroNat = isZeroNat;
  exports.incNat = incNat;
  exports.decNat = decNat;
  exports.addNat = addNat;
  exports.subNat = subNat;
  exports.isEqualNat = isEqualNat;
  exports.pair = pair;
  exports.first = first;
  exports.second = second;
  exports.zero = zero;
  exports.isZero = isZero;
  exports.inc = inc;
  exports.dec = dec;
  exports.negate = negate;
  exports.add = add;
  exports.sub = sub;
  exports.isEqual = isEqual;
  exports.map = map;
  exports.filter = filter;
  exports.nth = nth;
  exports.length = length;
  exports.decodeBool = decodeBool;
  exports.decodeList = decodeList;
  exports.decodeNatNumber = decodeNatNumber;
  exports.decodeInteger = decodeInteger;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
/* Follow me on Twitter @f0rr0 */
