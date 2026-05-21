import "dotenv/config"
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const getPrisma = () => {
    if (globalForPrisma.prisma) return globalForPrisma.prisma

    const connectionString = process.env.DATABASE_URL
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    
    globalForPrisma.prisma = new PrismaClient({ adapter })
    return globalForPrisma.prisma
}

export const prisma = getPrisma()
