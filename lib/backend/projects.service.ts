import prisma from '@/lib/db'

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return projects.map((project) => ({
      ...project,
      tags: JSON.parse(project.tags || '[]'),
      features: JSON.parse(project.features || '[]'),
      screenshots: JSON.parse(project.screenshots || '[]'),
    }))
  } catch (error) {
    console.warn(
      '[getAllProjects] Database unavailable; returning no projects.',
      error instanceof Error ? error.message : error
    )
    return []
  }
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  })
  
  if (!project) return null
  
  return {
    ...project,
    tags: JSON.parse(project.tags || '[]'),
    features: JSON.parse(project.features || '[]'),
    screenshots: JSON.parse(project.screenshots || '[]'),
  }
}

export async function createProject(data: any) {
  return prisma.project.create({
    data: {
      ...data,
      tags: JSON.stringify(data.tags || []),
      features: JSON.stringify(data.features || []),
      screenshots: JSON.stringify(data.screenshots || []),
    },
  })
}

export async function updateProject(id: string, data: any) {
  return prisma.project.update({
    where: { id },
    data: {
      ...data,
      tags: data.tags ? JSON.stringify(data.tags) : undefined,
      features: data.features ? JSON.stringify(data.features) : undefined,
      screenshots: data.screenshots ? JSON.stringify(data.screenshots) : undefined,
    },
  })
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  })
}
