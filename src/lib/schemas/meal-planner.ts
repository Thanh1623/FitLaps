import { z } from 'zod';

export const MealPlannerRequestSchema = z.object({
  goal: z.enum(['weight_loss', 'maintenance', 'muscle_gain']),
  dietaryRestrictions: z.enum(['none', 'vegan', 'keto', 'paleo', 'gluten_free']),
  calorieTarget: z.number().min(1000).max(5000).optional(),
  mealsPerDay: z.number().min(3).max(6),
  daysCount: z.number().min(1).max(14).default(7),
  feedback: z.string().optional(),
  locale: z.string().default('en'),
});

export type MealPlannerRequest = z.infer<typeof MealPlannerRequestSchema>;
