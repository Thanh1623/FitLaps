'use server'

import { prisma } from '@/lib/db'

export async function getRecommendations(planType: 'workout' | 'meal', planData: any) {
    // Basic recommendation logic based on plan type and goal
    let category = 'general';

    if (planType === 'workout') {
        const goal = planData?.workoutPlan?.goal?.toLowerCase();
        if (goal?.includes('muscle') || goal?.includes('strength')) category = 'protein';
        else if (goal?.includes('weight') || goal?.includes('fat')) category = 'weight-loss';
    } else if (planType === 'meal') {
        category = 'healthy-snacks';
    }

    // Fetch products
    return await prisma.product.findMany({
        where: {
            category: {
                equals: category,
                mode: 'insensitive',
            },
        },
        take: 3, // Limit to top 3 recommendations
    });
}
