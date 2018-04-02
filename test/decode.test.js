import {
  decodeBool,
  T,
  F,
  decodeList,
  emptyList,
  cons,
  decodeNat,
  zeroNat,
  incNat,
  decodeInteger,
  inc,
  zero
} from '../lib';

describe('Decode Church Encoding to Native', () => {
  describe('decodeBool', () => {
    it('is a function', () => {
      expect(decodeBool).toBeFunction();
    });
    it('returns the native equivalent of the boolean', () => {
      expect(decodeBool(T)).toBeTrue();
      expect(decodeBool(F)).toBeFalse();
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

  describe('decodeNat', () => {
    it('is a function', () => {
      expect(decodeNat).toBeFunction();
    });
    it('returns the native equivalent of the integer', () => {
      expect(decodeNat(zeroNat)).toBe(0);
      expect(decodeNat(incNat(incNat(incNat(zeroNat))))).toBe(3);
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
