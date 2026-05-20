import { z } from 'zod';

export const WorkoutPlanSchema = z.object({
  workoutPlan: z.object({
    goal: z.string(),
    level: z.string(),
    equipment: z.string(),
    duration: z.number(),
    frequency: z.number(),
    days: z.array(
        z.object({
          day: z.string(),
          targetMuscleGroup: z.string(),
          restTime: z.string(),
          notes: z.string(),
          warmUp: z.string(),
          exercises: z.array(
            z.object({
              name: z.string(),
              sets: z.number(),
              reps: z.number(),
              weight: z.string().optional(),
            })
          ),
        })
    ),
  }),
});

export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;
