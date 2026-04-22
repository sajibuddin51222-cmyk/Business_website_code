import prisma from '@/lib/db'

export async function getAllAboutPoints(activeOnly = true) {
  return prisma.aboutPoint.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: { order: 'asc' },
  })
}

export async function createAboutPoint(data: any) {
  return prisma.aboutPoint.create({ data })
}

export async function updateAboutPoint(id: string, data: any) {
  return prisma.aboutPoint.update({
    where: { id },
    data,
  })
}

export async function deleteAboutPoint(id: string) {
  return prisma.aboutPoint.delete({
    where: { id },
  })
}
