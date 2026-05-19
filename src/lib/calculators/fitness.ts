export function calculateBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function calculateTDEE(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: number
): number {
  // Mifflin-St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  return Math.round(bmr * activityLevel);
}

export function calculateMacros(
  calories: number,
  goal: 'cut' | 'maintain' | 'bulk' = 'maintain'
) {
  // Simple macro split
  // Cut: 40% protein, 30% carbs, 30% fat
  // Maintain: 30% protein, 40% carbs, 30% fat
  // Bulk: 25% protein, 50% carbs, 25% fat
  
  const adjustments = {
    cut: { p: 0.4, c: 0.3, f: 0.3 },
    maintain: { p: 0.3, c: 0.4, f: 0.3 },
    bulk: { p: 0.25, c: 0.5, f: 0.25 },
  };
  
  const ratio = adjustments[goal];
  
  // Protein: 4 cal/g, Carbs: 4 cal/g, Fat: 9 cal/g
  return {
    protein: Math.round((calories * ratio.p) / 4),
    carbs: Math.round((calories * ratio.c) / 4),
    fat: Math.round((calories * ratio.f) / 9),
  };
}