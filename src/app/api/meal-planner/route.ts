import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { askAI } from '@/services/ai';
import { MealPlannerRequestSchema } from '@/lib/schemas/meal-planner';
import { MealPlanSchema } from '@/lib/schemas/ai-meal-planner';
import { getAffiliateRecommendations } from '@/services/affiliate';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received body:', body);
    const validatedData = MealPlannerRequestSchema.parse(body);

    const prompt = `Create a meal plan for someone with these goals:
    Goal: ${validatedData.goal}
    Dietary Restrictions: ${validatedData.dietaryRestrictions}
    Calorie Target: ${validatedData.calorieTarget || 'Not specified'}
    Meals Per Day: ${validatedData.mealsPerDay}
    Duration: ${validatedData.daysCount} days
    User Feedback: ${validatedData.feedback || 'None'}
    
    Return a JSON object matching this schema. IMPORTANT: Generate the content in this language: ${validatedData.locale === 'vi' ? 'Vietnamese' : 'English'}.
    
    {
      "mealPlan": {
        "goal": "string",
        "dietaryRestrictions": "string",
        "calorieTarget": number,
        "days": [
          {
            "day": "string",
            "meals": [
              {
                "name": "string",
                "type": "breakfast",
                "calories": number,
                "protein": number,
                "carbs": number,
                "fat": number,
                "recipe": "string"
              }
            ]
          }
        ]
      }
    }`;

    const systemPrompt = "You are a professional nutritionist. Return ONLY valid JSON that matches the requested schema.";
    
    const mealPlanRaw = await askAI(prompt, systemPrompt);
    console.log('Raw AI Response:', mealPlanRaw);
    const parsedPlan = JSON.parse(mealPlanRaw);
    
    // Validate the AI response
    const validatedPlan = MealPlanSchema.parse(parsedPlan);

    // Get recommendations
    const recommendations = await getAffiliateRecommendations(validatedPlan);

    return NextResponse.json({ success: true, data: validatedPlan, recommendations });
  } catch (error) {
    console.error('Meal planner generation error detail:', error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('OPENAI_API_KEY')) {
      return NextResponse.json(
        { success: false, error: 'Server is missing OPENAI_API_KEY' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to generate meal plan' },
      { status: 500 }
    );
  }
}
