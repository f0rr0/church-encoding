import {
  T,
  F,
  zeroNat,
  isZeroNat,
  incNat,
  decNat,
  addNat,
  subNat,
  isEqualNat,
  mulNat,
  expNat,
  decodeNat
} from '../lib';

describe('Church Encoding for Natural Numbers', () => {
  describe('zeroNat', () => {
    it('is a function', () => {
      expect(zeroNat).toBeFunction();
    });
  });

  describe('isZeroNat', () => {
    it('is a function', () => {
      expect(isZeroNat).toBeFunction();
    });
    it('checks if a natural number (whole number) is zero', () => {
      expect(isZeroNat(incNat(zeroNat))).toBe(F);
      expect(isZeroNat(zeroNat)).toBe(T);
    });
  });

  describe('incNat', () => {
    it('is a function', () => {
      expect(incNat).toBeFunction();
    });
    it('increments a natural number', () => {
      expect(incNat(zeroNat)).toBeFunction();
      expect(decodeNat(incNat(zeroNat))).toBe(1);
    });
  });

  describe('decNat', () => {
    it('is a function', () => {
      expect(decNat).toBeFunction();
    });
    it('decrements a natural number', () => {
      expect(decNat(incNat(zeroNat))).toBeFunction();
      expect(decodeNat(decNat(incNat(zeroNat)))).toBe(0);
      expect(decodeNat(incNat(decNat(incNat(zeroNat))))).toBe(1);
    });
  });

  describe('addNat', () => {
    it('is a function', () => {
      expect(addNat).toBeFunction();
    });
    it('returns the sum of given natural numbers', () => {
      const two = incNat(incNat(zeroNat));
      const three = incNat(two);
      expect(addNat(two, three)).toBeFunction();
      expect(decodeNat(addNat(two, three))).toBe(5);
    });
  });

  describe('subNat', () => {
    it('is a function', () => {
      expect(subNat).toBeFunction();
    });
    it('returns the difference of given natural numbers', () => {
      const two = incNat(incNat(zeroNat));
      const three = incNat(two);
      expect(subNat(two, three)).toBeFunction();
      expect(decodeNat(subNat(two, two))).toBe(0);
      expect(decodeNat(subNat(three, two))).toBe(1);
    });
  });

  describe('isEqualNat', () => {
    it('is a function', () => {
      expect(isEqualNat).toBeFunction();
    });
    it('checks if the natural numbers are equal', () => {
      const two = incNat(incNat(zeroNat));
      const three = incNat(two);
      expect(isEqualNat(two, two)).toBe(T);
      expect(isEqualNat(two, three)).toBe(F);
    });
  });

  describe('mulNat', () => {
    it('is a function', () => {
      expect(mulNat).toBeFunction();
    });
    it('returns the product of natural number multiplication', () => {
      const two = incNat(incNat(zeroNat));
      const three = incNat(two);
      expect(decodeNat(mulNat(two, three))).toBe(6);
      expect(decodeNat(mulNat(two, zeroNat))).toBe(0);
    });
  });

  describe('expNat', () => {
    it('is a function', () => {
      expect(expNat).toBeFunction();
    });
    it('returns the nth power of natural number where n is a whole number', () => {
      const two = incNat(incNat(zeroNat));
      const three = incNat(two);
      expect(decodeNat(expNat(zeroNat, three))).toBe(1);
      expect(decodeNat(expNat(two, two))).toBe(4);
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
});
