import { IF } from './boolean';
import { head, isEmpty, tail, emptyList, cons } from './list';
import { zero, isZero, inc, dec } from './integer';

export const map = (f, list) =>
  IF(isEmpty(list), () => emptyList, () => cons(f(head(list)), map(f, tail(list))))();
export const filter = (f, list) =>
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
export const nth = (index, list) =>
  IF(isZero(index), () => head(list), () => nth(dec(index), tail(list)))();
export const length = list => IF(isEmpty(list), () => zero, () => inc(length(tail(list))))();
