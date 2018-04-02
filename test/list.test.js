import {
  T,
  F,
  emptyList,
  cons,
  head,
  tail,
  zero,
  inc,
  isEmpty,
  decodeList,
  map,
  filter,
  nth,
  length,
  decodeInteger
} from '../lib';

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
});
