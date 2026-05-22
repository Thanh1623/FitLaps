import { getAffiliateRecommendations } from '../../src/services/affiliate'
import { prisma } from '../../src/lib/db'

describe('Affiliate Recommendation Engine', () => {
  it('should return recommendations based on plan', async () => {
    const mockPlan = {
      workoutPlan: {
        goal: 'muscle_gain',
        days: [
          { targetMuscleGroup: 'Chest' }
        ]
      }
    }
    
    // Ensure at least one product exists with the 'protein' category for testing
    await prisma.product.create({
      data: {
        id: 'test-id-123',
        name: 'Whey Protein',
        affiliateLink: 'http://example.com',
        category: 'protein'
      }
    })

    const recommendations = await getAffiliateRecommendations(mockPlan)
    expect(recommendations.length).toBeGreaterThan(0)
    expect(recommendations[0]?.category).toBe('protein')
    
    // Cleanup
    await prisma.product.delete({ where: { id: 'test-id-123' } })
  })
})
