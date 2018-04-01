import {
  T,
  F,
  IF,
  AND,
  OR,
  NOT,
  decodeBool,
  emptyList,
  cons,
  head,
  tail,
  isEmpty,
  decodeList,
  map,
  filter,
  nth,
  length,
  zero,
  isZero,
  inc,
  dec,
  add,
  sub,
  negate,
  isEqual,
  decodeInteger
} from '../lib';

describe('Church Encoding for Booleans', () => {
  describe('T', () => {
    it('is a function', () => {
      expect(T).toBeFunction();
    });
    it('evaluates the left branch', () => {
      expect(T(true, false)).toBeTrue();
    });
  });

  describe('F', () => {
    it('is a function', () => {
      expect(F).toBeFunction();
    });
    it('evaluates the right branch', () => {
      expect(F(true, false)).toBeFalse();
    });
  });

  describe('IF', () => {
    it('is a function', () => {
      expect(IF).toBeFunction();
    });
    it('evalutes the predicate with the left and right branches', () => {
      expect(IF(T, true, false)).toBeTrue();
    });
  });

  describe('AND', () => {
    it('is a function', () => {
      expect(AND).toBeFunction();
    });
    it('returns true if both values are true, false otherwise', () => {
      expect(IF(AND(T, F), true, false)).toBeFalse();
      expect(IF(AND(F, T), true, false)).toBeFalse();
      expect(IF(AND(T, T), true, false)).toBeTrue();
    });
  });

  describe('OR', () => {
    it('is a function', () => {
      expect(OR).toBeFunction();
    });
    it('returns true if either value is true, false otherwise', () => {
      expect(IF(OR(T, F), true, false)).toBeTrue();
      expect(IF(OR(F, T), true, false)).toBeTrue();
      expect(IF(OR(T, T), true, false)).toBeTrue();
      expect(IF(OR(F, F), true, false)).toBeFalse();
    });
  });

  describe('NOT', () => {
    it('is a function', () => {
      expect(NOT).toBeFunction();
    });
    it('negates the value', () => {
      expect(IF(NOT(T), true, false)).toBeFalse();
      expect(IF(NOT(F), true, false)).toBeTrue();
      expect(IF(NOT(AND(T, F)), true, false)).toBeTrue();
    });
  });

  describe('decodeBool', () => {
    it('is a function', () => {
      expect(decodeBool).toBeFunction();
    });
    it('returns the native equivalent of the boolean', () => {
      expect(decodeBool(T)).toBeTrue();
      expect(decodeBool(F)).toBeFalse();
    });
  });
});

describe('Church Encoding for Lists', () => {
  describe('emptyList', () => {
    it('is a function', () => {
      expect(emptyList).toBeFunction();
    });
  });

  describe('cons', () => {
    it('is a function', () => {
      expect(cons).toBeFunction();
    });
    it('constructs a list', () => {
      expect(cons(1, emptyList)).toBeFunction();
      expect(decodeList(cons(1, emptyList))).toEqual([1]);
    });
  });

  describe('head', () => {
    it('is a function', () => {
      expect(head).toBeFunction();
    });
    it('returns the head of the list', () => {
      expect(head(cons(1, emptyList))).toBe(1);
    });
  });

  describe('tail', () => {
    it('is a function', () => {
      expect(tail).toBeFunction();
    });
    it('returns the tail of the list', () => {
      expect(tail(cons(1, emptyList))).toBe(emptyList);
      expect(decodeList(tail(cons(2, cons(1, emptyList))))).toEqual([1]);
    });
  });

  describe('isEmpty', () => {
    it('is a function', () => {
      expect(isEmpty).toBeFunction();
    });
    it('checks if a list is empty', () => {
      expect(isEmpty(cons(1, emptyList))).toBe(F);
      expect(isEmpty(emptyList)).toBe(T);
    });
  });

  describe('map', () => {
    it('is a function', () => {
      expect(map).toBeFunction();
    });
    it('applies the function to each element in the list', () => {
      expect(map(i => i, emptyList)).toBe(emptyList);
      expect(decodeList(map(i => i * 2, cons(1, cons(2, cons(3, emptyList)))))).toEqual([2, 4, 6]);
    });
  });

  describe('filter', () => {
    it('is a function', () => {
      expect(filter).toBeFunction();
    });
    it('filters out elements that evaluate to false with the predicate', () => {
      expect(filter(i => (i % 2 === 0 ? T : F), emptyList)).toBe(emptyList);
      expect(
        decodeList(
          filter(i => (i % 2 === 0 ? T : F), cons(10, cons(2, cons(5, cons(8, emptyList)))))
        )
      ).toEqual([10, 2, 8]);
    });
  });

  describe('nth', () => {
    it('is a function', () => {
      expect(nth).toBeFunction();
    });
    it('gets the nth element in the list', () => {
      const list = cons(10, cons(2, cons(5, cons(8, emptyList))));
      expect(nth(zero, list)).toBe(10);
      expect(nth(inc(zero), list)).toBe(2);
    });
  });

  describe('length', () => {
    it('is a function', () => {
      expect(length).toBeFunction();
    });
    it('returns the length of the list', () => {
      const list = cons(10, cons(2, cons(5, cons(8, emptyList))));
      expect(length(emptyList)).toBe(zero);
      expect(length(list)).toBeFunction();
      expect(decodeInteger(length(list))).toBe(4);
    });
  });

  describe('decodeList', () => {
    it('is a function', () => {
      expect(decodeList).toBeFunction();
    });
    it('returns the native equivalent of the list', () => {
      expect(decodeList(emptyList)).toEqual([]);
      expect(decodeList(cons(1, cons(2, cons(3, emptyList))))).toEqual([1, 2, 3]);
    });
  });
});

describe('Church Encoding for Integers', () => {
  describe('zero', () => {
    it('is a function', () => {
      expect(zero).toBeFunction();
    });
  });

  describe('isZero', () => {
    it('is a function', () => {
      expect(isZero).toBeFunction();
    });
    it('checks if an integer is zero', () => {
      expect(isZero(inc(zero))).toBe(F);
      expect(isZero(zero)).toBe(T);
      expect(isZero(dec(zero))).toBe(F);
    });
  });

  describe('inc', () => {
    it('is a function', () => {
      expect(inc).toBeFunction();
    });
    it('increments an integer', () => {
      expect(inc(zero)).toBeFunction();
      expect(decodeInteger(inc(zero))).toBe(1);
    });
  });

  describe('dec', () => {
    it('is a function', () => {
      expect(dec).toBeFunction();
    });
    it('decrements an integer', () => {
      expect(dec(inc(zero))).toBeFunction();
      expect(decodeInteger(dec(dec(zero)))).toBe(-2);
    });
  });

  describe('add', () => {
    it('is a function', () => {
      expect(add).toBeFunction();
    });
    it('returns the sum of given integers', () => {
      const two = inc(inc(zero));
      const three = inc(two);
      expect(add(two, three)).toBeFunction();
      expect(decodeInteger(add(two, three))).toBe(5);
    });
  });

  describe('sub', () => {
    it('is a function', () => {
      expect(sub).toBeFunction();
    });
    it('returns the difference of given integers', () => {
      const two = inc(inc(zero));
      const three = inc(two);
      expect(sub(two, three)).toBeFunction();
      expect(decodeInteger(sub(two, two))).toBe(0);
      expect(decodeInteger(sub(two, three))).toBe(-1);
    });
  });

  describe('negate', () => {
    it('is a function', () => {
      expect(negate).toBeFunction();
    });
    it('negates the integer', () => {
      const two = inc(inc(zero));
      expect(negate(two)).toBeFunction();
      expect(decodeInteger(negate(two))).toBe(-2);
    });
  });

  describe('isEqual', () => {
    it('is a function', () => {
      expect(isEqual).toBeFunction();
    });
    it('checks if the integers are equal', () => {
      const two = inc(inc(zero));
      const three = inc(two);
      expect(isEqual(two, two)).toBe(T);
      expect(isEqual(two, three)).toBe(F);
    });
  });

  describe('decodeInteger', () => {
    it('is a function', () => {
      expect(decodeInteger).toBeFunction();
    });
    it('returns the native equivalent of the integer', () => {
      expect(decodeInteger(zero)).toBe(0);
      expect(decodeInteger(inc(inc(inc(zero))))).toBe(3);
    });
  });
});
