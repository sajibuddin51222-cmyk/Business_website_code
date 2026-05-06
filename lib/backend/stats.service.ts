import prisma from '@/lib/db'

export async function getCompanyStats() {
  try {
    return await prisma.companyStats.findFirst()
  } catch (error) {
    console.warn(
      "[getCompanyStats] Database unavailable; using hero defaults.",
      error instanceof Error ? error.message : error
    )
    return null
  }
}

export async function updateCompanyStats(id: string, data: any) {
  return prisma.companyStats.update({
    where: { id },
    data,
  })
}

export async function createCompanyStats(data: any) {
  return prisma.companyStats.create({ data })
}

export async function getAdminDashboardStats() {
  const [
    projectsCount, 
    requestsCount, 
    servicesCount, 
    aboutPointsCount,
    pagesCount,
    footerLinksCount,
    teamMembersCount
  ] = await Promise.all([
    prisma.project.count(),
    prisma.projectRequest.count(),
    prisma.service.count(),
    prisma.aboutPoint.count(),
    prisma.page.count(),
    prisma.footerLink.count(),
    prisma.teamMember.count(),
  ])

  return {
    projects: projectsCount,
    requests: requestsCount,
    services: servicesCount,
    aboutPoints: aboutPointsCount,
    pages: pagesCount,
    footerLinks: footerLinksCount,
    teamMembers: teamMembersCount,
  }
}
