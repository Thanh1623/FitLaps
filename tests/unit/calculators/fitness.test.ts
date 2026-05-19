/// <reference types="jest" />
import { calculateBMI, calculateTDEE, calculateMacros } from "../../../src/lib/calculators/fitness";

describe('Fitness Calculators', () => {
  test('calculateBMI', () => {
    expect(calculateBMI(70, 175)).toBe(22.9);
  });

  test('calculateTDEE', () => {
    // 70kg, 175cm, 30yo, male, sedentary (1.2)
    // BMR = 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75
    // TDEE = 1648.75 * 1.2 = 1978.5 -> 1979
    expect(calculateTDEE(70, 175, 30, 'male', 1.2)).toBe(1979);
  });

  test('calculateMacros', () => {
    const macros = calculateMacros(2000, 'maintain');
    expect(macros.protein).toBeGreaterThan(0);
    expect(macros.carbs).toBeGreaterThan(0);
    expect(macros.fat).toBeGreaterThan(0);
  });
});