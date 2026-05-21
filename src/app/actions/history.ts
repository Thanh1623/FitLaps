'use server'

import "dotenv/config"
import { createClient } from '@/lib/supabase/server'
import { PrismaClient } from '@/generated/prisma'

const getPrisma = () => {
    return new PrismaClient()
}

export async function savePlanHistory(planType: string, planData: any) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const prisma = getPrisma()
  const history = await prisma.planHistory.create({
    data: {
      userId: user.id,
      planType,
      planData,
    },
  })

  return { success: true, id: history.id }
}

export async function getPlanHistory() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const prisma = getPrisma()
  const history = await prisma.planHistory.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return history
}
