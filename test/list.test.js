import { T, F, emptyList, cons, head, tail, isEmpty, decodeList } from '../lib';

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
});
