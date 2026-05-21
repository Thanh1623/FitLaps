'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db'

import { revalidatePath } from 'next/cache'

export async function deletePlanHistory(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  await prisma.planHistory.delete({
    where: {
      id,
      userId: user.id, // Ensure user owns the record
    },
  })

  revalidatePath('/[locale]/history', 'page')
}

export async function savePlanHistory(planType: string, planData: any) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  // Ensure user exists in our database
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? null,
      },
    })
  }

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
