export const T = (left, _) => left;
export const F = (_, right) => right;
export const IF = (predicate, left, right) => predicate(left, right);
export const AND = (a, b) => IF(a, IF(b, T, F), F);
export const OR = (a, b) => IF(a, T, IF(b, T, F));
export const NOT = a => IF(a, F, T);
