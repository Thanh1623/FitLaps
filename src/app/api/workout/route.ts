import { NextResponse } from 'next/server';
import { askAI } from '@/services/ai';
import { WorkoutRequestSchema } from '@/lib/schemas/workout';

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
    
    Return a structured JSON object with the workout plan.`;

    const systemPrompt = "You are a professional fitness coach. Return workout plans in structured JSON format.";
    
    const workoutPlan = await askAI(prompt, systemPrompt);

    return NextResponse.json({ success: true, data: workoutPlan });
  } catch (error) {
    console.error('Workout generation error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate workout' }, { status: 500 });
  }
}