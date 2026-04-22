import prisma from '@/lib/db'

export async function getAllServices(activeOnly = true) {
  const services = await prisma.service.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: { order: 'asc' },
  })
  
  return services.map(service => ({
    ...service,
    features: JSON.parse(service.features || '[]')
  }))
}

export async function getServiceById(id: string) {
  const service = await prisma.service.findUnique({
    where: { id },
  })
  
  if (!service) return null
  
  return {
    ...service,
    features: JSON.parse(service.features || '[]')
  }
}

export async function createService(data: any) {
  return prisma.service.create({
    data: {
      ...data,
      features: JSON.stringify(data.features || []),
    },
  })
}

export async function updateService(id: string, data: any) {
  return prisma.service.update({
    where: { id },
    data: {
      ...data,
      features: data.features ? JSON.stringify(data.features) : undefined,
    },
  })
}

export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id },
  })
}
