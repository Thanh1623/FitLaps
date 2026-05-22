import { prisma } from '../../src/lib/db'

describe('Database Check', () => {
  it('should list all products', async () => {
    const products = await prisma.product.findMany()
    console.log('Products:', JSON.stringify(products, null, 2))
    expect(products).toBeDefined()
  })
})
