import { MealPlannerRequestSchema } from '../../../src/lib/schemas/meal-planner';
import { MealPlanSchema } from '../../../src/lib/schemas/ai-meal-planner';

describe('Meal Planner Schemas', () => {
  it('should validate correct request data', () => {
    const data = {
      goal: 'weight_loss',
      dietaryRestrictions: 'none',
      calorieTarget: 2000,
      mealsPerDay: 3,
      locale: 'en',
    };
    expect(MealPlannerRequestSchema.safeParse(data).success).toBe(true);
  });

  it('should validate correct response data', () => {
    const data = {
      mealPlan: {
        goal: 'weight_loss',
        dietaryRestrictions: 'none',
        calorieTarget: 2000,
        days: [
          {
            day: 'Monday',
            meals: [
              {
                name: 'Oatmeal',
                type: 'breakfast',
                calories: 500,
                protein: 20,
                carbs: 80,
                fat: 10,
                recipe: 'Cook oats with water',
              },
            ],
          },
        ],
      },
    };
    expect(MealPlanSchema.safeParse(data).success).toBe(true);
  });
});
