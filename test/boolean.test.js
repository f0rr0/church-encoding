import { T, F, IF, AND, OR, NOT } from '../lib';

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
});
