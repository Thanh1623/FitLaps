import { z } from 'zod';

export const WorkoutRequestSchema = z.object({
  goal: z.enum(['weight_loss', 'muscle_gain', 'endurance']),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  equipment: z.enum(['gym', 'home', 'none']),
  durationMinutes: z.number().min(15).max(120),
  frequencyPerWeek: z.number().min(1).max(7),
  locale: z.string().default('en'),
});

export type WorkoutRequest = z.infer<typeof WorkoutRequestSchema>;