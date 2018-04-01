import { T, F } from './boolean';

export const emptyList = selector => selector(undefined, undefined, T);
export const cons = (el, list) => selector => selector(el, list, F);
export const head = list => list((head, _, __) => head);
export const tail = list => list((_, tail, __) => tail);
export const isEmpty = list => list((_, __, bool) => bool);
