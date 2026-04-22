import prisma from '@/lib/db'

// Contact Info
export async function getContactInfo() {
  return prisma.contactInfo.findFirst()
}

export async function updateContactInfo(id: string, data: any) {
  return prisma.contactInfo.update({
    where: { id },
    data,
  })
}

export async function createContactInfo(data: any) {
  return prisma.contactInfo.create({ data })
}

// Project Requests
export async function getAllProjectRequests() {
  const requests = await prisma.projectRequest.findMany({
    orderBy: { createdAt: 'desc' },
  })
  
  return requests.map(req => ({
    ...req,
    services: JSON.parse(req.services || '[]')
  }))
}

export async function getProjectRequestById(id: string) {
  const req = await prisma.projectRequest.findUnique({
    where: { id },
  })
  
  if (!req) return null
  
  return {
    ...req,
    services: JSON.parse(req.services || '[]')
  }
}

export async function createProjectRequest(data: any) {
  return prisma.projectRequest.create({
    data: {
      ...data,
      services: JSON.stringify(data.services || []),
    },
  })
}

export async function updateProjectRequestStatus(id: string, status: string) {
  return prisma.projectRequest.update({
    where: { id },
    data: { status },
  })
}
