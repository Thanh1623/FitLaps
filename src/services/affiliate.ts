import { prisma } from '@/lib/db'

export async function getAffiliateRecommendations(plan: any) {
    // Map muscle groups/goals/restrictions to product categories
    const categoryMapping: Record<string, string[]> = {
        // Workout mappings
        'chest': ['equipment', 'protein'],
        'legs': ['equipment', 'protein'],
        'back': ['equipment', 'protein'],
        'shoulders': ['equipment', 'protein'],
        'arms': ['equipment', 'protein'],
        'muscle_gain': ['protein', 'equipment'],
        'weight_loss': ['weight-loss', 'healthy-snacks'],
        // Meal mappings
        'vegan': ['protein', 'healthy-snacks'],
        'keto': ['protein', 'healthy-snacks'],
        'paleo': ['protein', 'healthy-snacks'],
        'gluten_free': ['healthy-snacks'],
    };
    
    const categories: string[] = [];
    
    // Extract potential categories based on plan data
    if (plan.workoutPlan) {
        if (plan.workoutPlan.goal) {
            categories.push(...(categoryMapping[plan.workoutPlan.goal.toLowerCase()] || []));
        }
        if (plan.workoutPlan.days) {
            plan.workoutPlan.days.forEach((day: any) => {
                if (day.targetMuscleGroup) {
                    const muscleGroup = day.targetMuscleGroup.toLowerCase();
                    categories.push(...(categoryMapping[muscleGroup] || []));
                }
            });
        }
    } else if (plan.mealPlan) {
        if (plan.mealPlan.goal) {
            categories.push(...(categoryMapping[plan.mealPlan.goal.toLowerCase()] || []));
        }
        if (plan.mealPlan.dietaryRestrictions) {
            const restrictions = plan.mealPlan.dietaryRestrictions.toLowerCase();
            for (const key in categoryMapping) {
                if (restrictions.includes(key)) {
                    categories.push(...(categoryMapping[key] || []));
                }
            }
        }
    }
    
    // Get unique categories
    const uniqueCategories = Array.from(new Set(categories));
    
    // If no categories found, get popular products or everything
    if (uniqueCategories.length === 0) {
        return await prisma.product.findMany({
            take: 3,
        })
    }

    // Search for products that match categories
    const products = await prisma.product.findMany({
        where: {
            category: { in: uniqueCategories as string[] }
        }
    })

    // If still no products found, return popular (all) products
    if (products.length === 0) {
        return await prisma.product.findMany({
            take: 3,
        })
    }

    return products;
}
