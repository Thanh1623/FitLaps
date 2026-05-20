import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { askAI } from '@/services/ai';
import { WorkoutRequestSchema } from '@/lib/schemas/workout';
import { WorkoutPlanSchema } from '@/lib/schemas/ai-workout';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = WorkoutRequestSchema.parse(body);

    const prompt = `Create a workout plan for someone with these goals:
    Goal: ${validatedData.goal}
    Level: ${validatedData.fitnessLevel}
    Equipment: ${validatedData.equipment}
    Duration: ${validatedData.durationMinutes} minutes
    Frequency: ${validatedData.frequencyPerWeek} days per week.
    
    Return a JSON object matching this schema. IMPORTANT: Generate the content in this language: ${validatedData.locale === 'vi' ? 'Vietnamese' : 'English'}.
    
    {
      "workoutPlan": {
        "goal": "string",
        "level": "string",
        "equipment": "string",
        "duration": number,
        "frequency": number,
        "days": [
            {
              "day": "string",
              "targetMuscleGroup": "string",
              "restTime": "string",
              "notes": "string",
              "warmUp": "string",
              "exercises": [
                {
                  "name": "string",
                  "sets": number,
                  "reps": number,
                  "weight": "string"
                }
              ]
            }
        ]
      }
    }`;

    const systemPrompt = "You are a professional fitness coach. Return ONLY valid JSON that matches the requested schema.";
    
    const workoutPlanRaw = await askAI(prompt, systemPrompt);
    console.log('Raw AI Response:', workoutPlanRaw);
    const parsedPlan = JSON.parse(workoutPlanRaw);
    
    // Validate the AI response
    const validatedPlan = WorkoutPlanSchema.parse(parsedPlan);

    return NextResponse.json({ success: true, data: validatedPlan });
  } catch (error) {
    console.error('Workout generation error detail:', error);
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
      { success: false, error: 'Failed to generate workout' },
      { status: 500 }
    );
  }
}
