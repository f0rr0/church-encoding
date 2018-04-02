import {
  T,
  F,
  pair,
  first,
  second,
  decodeNat,
  zero,
  zeroNat,
  isZero,
  inc,
  incNat,
  dec,
  normalize,
  abs,
  add,
  sub,
  negate,
  isEqual,
  mul,
  exp,
  isNegative,
  isLessThan,
  isLessThanEqual,
  isGreaterThan,
  isGreaterThanEqual,
  decodeInteger,
  decodeBool
} from '../lib';

describe('Church Encoding for Integers', () => {
  describe('pair', () => {
    it('is a function', () => {
      expect(pair).toBeFunction();
    });
  });

  describe('first', () => {
    it('is a function', () => {
      expect(first).toBeFunction();
    });

    it('returns the first term of a pair', () => {
      expect(first(pair(1, 2))).toBe(1);
    });
  });

  describe('second', () => {
    it('is a function', () => {
      expect(second).toBeFunction();
    });

    it('returns the seconf term of a pair', () => {
      expect(second(pair(1, 2))).toBe(2);
    });
  });

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
      expect(decodeInteger(inc(dec(dec(zero))))).toBe(-1);
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

  describe('normalize', () => {
    it('is a function', () => {
      expect(normalize).toBeFunction();
    });
    it('normalizes an integer representatin to contain only one non zero term', () => {
      const minusOne = normalize(pair(incNat(zeroNat), incNat(incNat(zeroNat))));
      expect(decodeNat(first(minusOne))).toBe(0);
      expect(decodeNat(second(minusOne))).toBe(1);
      expect(decodeInteger(normalize(zero))).toBe(0);
    });
  });

  describe('abs', () => {
    it('is a function', () => {
      expect(abs).toBeFunction();
    });
    it('returns the absolute value of an integer', () => {
      const minusOne = pair(incNat(zeroNat), incNat(incNat(zeroNat)));
      expect(decodeNat(abs(minusOne))).toBe(1);
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

  describe('mul', () => {
    it('is a function', () => {
      expect(mul).toBeFunction();
    });
    it('returns the product of integer multiplication', () => {
      const two = inc(inc(zero));
      const three = inc(two);
      const minusOne = dec(zero);
      expect(decodeInteger(mul(two, three))).toBe(6);
      expect(decodeInteger(mul(two, minusOne))).toBe(-2);
    });
  });

  describe('exp', () => {
    it('is a function', () => {
      expect(exp).toBeFunction();
    });
    it('returns the nth power of integer where n is a whole number', () => {
      const two = inc(inc(zero));
      const three = inc(two);
      const minusOne = dec(zero);
      expect(decodeInteger(exp(zero, three))).toBe(1);
      expect(decodeInteger(exp(two, two))).toBe(4);
      expect(decodeInteger(exp(two, minusOne))).toBe(1);
      expect(decodeInteger(exp(three, minusOne))).toBe(-1);
    });
  });

  describe('isNegative', () => {
    it('is a function', () => {
      expect(isNegative).toBeFunction();
    });
    it('checks if the integer is negative', () => {
      const two = inc(inc(zero));
      const minusTwo = dec(dec(zero));
      expect(isNegative(two)).toBe(F);
      expect(isNegative(minusTwo)).toBe(T);
      expect(isNegative(zero)).toBe(F);
    });
  });

  describe('isLessThan', () => {
    it('is a function', () => {
      expect(isLessThan).toBeFunction();
    });
    it('checks if the first integer is strictly less than the second', () => {
      const two = inc(inc(zero));
      const three = inc(two);
      const minusTwo = dec(dec(zero));
      const minusThree = dec(minusTwo);
      expect(decodeBool(isLessThan(two, two))).toBeFalse();
      expect(decodeBool(isLessThan(two, three))).toBeTrue();
      expect(decodeBool(isLessThan(minusThree, minusTwo))).toBeTrue();
      expect(decodeBool(isLessThan(minusTwo, minusThree))).toBeFalse();
      expect(decodeBool(isLessThan(minusThree, two))).toBeTrue();
      expect(decodeBool(isLessThan(two, minusThree))).toBeFalse();
    });
  });

  describe('isLessThanEqual', () => {
    it('is a function', () => {
      expect(isLessThanEqual).toBeFunction();
    });
    it('checks if the first integer is less than or equal to the second', () => {
      const two = inc(inc(zero));
      const three = inc(two);
      const minusTwo = dec(dec(zero));
      const minusThree = dec(minusTwo);
      expect(decodeBool(isLessThanEqual(two, two))).toBeTrue();
      expect(decodeBool(isLessThanEqual(two, three))).toBeTrue();
      expect(decodeBool(isLessThanEqual(minusThree, minusTwo))).toBeTrue();
      expect(decodeBool(isLessThanEqual(minusTwo, minusThree))).toBeFalse();
      expect(decodeBool(isLessThanEqual(minusThree, two))).toBeTrue();
      expect(decodeBool(isLessThanEqual(two, minusThree))).toBeFalse();
      expect(decodeBool(isLessThanEqual(minusThree, minusThree))).toBeTrue();
    });
  });

  describe('isGreaterThan', () => {
    it('is a function', () => {
      expect(isGreaterThan).toBeFunction();
    });
    it('checks if the first integer is strictly greater than the second', () => {
      const two = inc(inc(zero));
      const three = inc(two);
      const minusTwo = dec(dec(zero));
      const minusThree = dec(minusTwo);
      expect(decodeBool(isGreaterThan(two, two))).toBeFalse();
      expect(decodeBool(isGreaterThan(two, three))).toBeFalse();
      expect(decodeBool(isGreaterThan(minusThree, minusTwo))).toBeFalse();
      expect(decodeBool(isGreaterThan(minusTwo, minusThree))).toBeTrue();
      expect(decodeBool(isGreaterThan(minusThree, two))).toBeFalse();
      expect(decodeBool(isGreaterThan(two, minusThree))).toBeTrue();
    });
  });

  describe('isGreaterThanEqual', () => {
    it('is a function', () => {
      expect(isGreaterThanEqual).toBeFunction();
    });
    it('checks if the first integer is greater than or equal to the second', () => {
      const two = inc(inc(zero));
      const three = inc(two);
      const minusTwo = dec(dec(zero));
      const minusThree = dec(minusTwo);
      expect(decodeBool(isGreaterThanEqual(two, two))).toBeTrue();
      expect(decodeBool(isGreaterThanEqual(two, three))).toBeFalse();
      expect(decodeBool(isGreaterThanEqual(minusThree, minusTwo))).toBeFalse();
      expect(decodeBool(isGreaterThanEqual(minusTwo, minusThree))).toBeTrue();
      expect(decodeBool(isGreaterThanEqual(minusThree, two))).toBeFalse();
      expect(decodeBool(isGreaterThanEqual(two, minusThree))).toBeTrue();
      expect(decodeBool(isGreaterThanEqual(minusThree, minusThree))).toBeTrue();
    });
  });
});
