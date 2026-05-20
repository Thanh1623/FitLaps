import { z } from 'zod';

export const MealPlanSchema = z.object({
  mealPlan: z.object({
    goal: z.string(),
    dietaryRestrictions: z.string(),
    calorieTarget: z.number().optional(),
    days: z.array(
      z.object({
        day: z.string(),
        meals: z.array(
          z.object({
            name: z.string(),
            type: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
            calories: z.number(),
            protein: z.number(),
            carbs: z.number(),
            fat: z.number(),
            recipe: z.string().optional(),
          })
        ),
      })
    ),
  }),
});

export type MealPlan = z.infer<typeof MealPlanSchema>;
