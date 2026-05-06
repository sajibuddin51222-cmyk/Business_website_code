import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { demoProjects, demoServices } from './demo-content'
import { cmsPagesSeed } from './cms-pages-data'

/**
 * Demo admin (after seed):
 *   Email:    admin@fusionbytepro.demo
 *   Password: DemoAdmin123!
 */

const prisma = new PrismaClient()

/** Demo login — override with DEMO_ADMIN_EMAIL / DEMO_ADMIN_PASSWORD if set */
const DEMO_ADMIN_EMAIL = process.env.DEMO_ADMIN_EMAIL ?? 'admin@fusionbytepro.demo'
const DEMO_ADMIN_PASSWORD = process.env.DEMO_ADMIN_PASSWORD ?? 'DemoAdmin123!'

const projects = demoProjects.map((p) => ({ ...p }))
const services = demoServices.map((s) => ({ ...s }))

const teamSeed = [
    {
        name: "Alex Rivera",
        role: "Principal Engineer",
        image: "/placeholder-user.jpg",
        bio: "Leads architecture for cloud-native platforms and API design.",
        order: 1,
    },
    {
        name: "Morgan Chen",
        role: "Design Lead",
        image: "/placeholder-user.jpg",
        bio: "Owns product UX, design systems, and client workshops.",
        order: 2,
    },
    {
        name: "Priya Shah",
        role: "Engineering Manager",
        image: "/placeholder-user.jpg",
        bio: "Sprint planning, delivery metrics, and cross-functional alignment.",
        order: 3,
    },
    {
        name: "Jordan Brooks",
        role: "Mobile & Edge",
        image: "/placeholder-user.jpg",
        bio: "Flutter, React Native, and performance tuning at scale.",
        order: 4,
    },
]

const aboutPoints = [
    {
        title: "Expert Team",
        description: "Our team consists of seasoned developers, designers, and AI specialists with years of experience",
        icon: "Globe",
        order: 1,
    },
    {
        title: "Cutting-Edge Technology",
        description: "We use the latest technologies and best practices to deliver modern, scalable solutions",
        icon: "Zap",
        order: 2,
    },
    {
        title: "Client-Focused Approach",
        description: "Your success is our priority. We work closely with you throughout the entire development process",
        icon: "Heart",
        order: 3,
    },
    {
        title: "Proven Track Record",
        description: "Successfully delivered 100+ projects across various industries with 98% client satisfaction",
        icon: "Sparkles",
        order: 4,
    },
]

const contactInfo = {
    email: "hello@fusionbytepro.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94102",
    linkedin: "https://linkedin.com/company/fusionbytepro",
    twitter: "https://twitter.com/fusionbytepro",
    github: "https://github.com/fusionbytepro",
}

const companyStats = {
    projectsCompleted: "500+",
    happyClients: "200+",
    teamMembers: "50+",
    yearsExperience: "10+",
}

const footerLinks = [
    { title: "Web Development", url: "/#services", column: "Services", order: 1 },
    { title: "UI/UX Design", url: "/#services", column: "Services", order: 2 },
    { title: "App Development", url: "/#services", column: "Services", order: 3 },
    { title: "Digital Marketing", url: "/#services", column: "Services", order: 4 },
    { title: "Maintenance", url: "/#services", column: "Services", order: 5 },
    { title: "About Us", url: "/about-us", column: "Company", order: 1 },
    { title: "Our Team", url: "/our-team", column: "Company", order: 2 },
    { title: "Careers", url: "/careers", column: "Company", order: 3 },
    { title: "Portfolio", url: "/#portfolio", column: "Company", order: 4 },
    { title: "Blog", url: "/blog", column: "Company", order: 5 },
    { title: "Contact Us", url: "/#contact", column: "Support", order: 1 },
    { title: "FAQ", url: "/faq", column: "Support", order: 2 },
    { title: "Privacy Policy", url: "/privacy-policy", column: "Support", order: 3 },
    { title: "Terms of Service", url: "/terms-of-service", column: "Support", order: 4 },
    { title: "Documentation", url: "/documentation", column: "Support", order: 5 },
]

async function main() {
    console.log('🌱 Starting seed...')

    // Seed Admin User (demo credentials — see file header)
    console.log('👤 Seeding admin user...')
    const hashedPassword = await bcrypt.hash(DEMO_ADMIN_PASSWORD, 10)

    await prisma.user.upsert({
        where: { email: DEMO_ADMIN_EMAIL },
        update: {
            password: hashedPassword,
            name: 'Demo Admin',
            role: 'ADMIN',
        },
        create: {
            email: DEMO_ADMIN_EMAIL,
            password: hashedPassword,
            name: 'Demo Admin',
            role: 'ADMIN',
        },
    })
    console.log(`✅ Seeded admin: ${DEMO_ADMIN_EMAIL}`)

    // Seed Projects
    console.log('📦 Seeding projects...')
    for (const project of projects) {
        const { tags, features, screenshots, ...rest } = project
        await prisma.project.upsert({
            where: { id: project.id },
            update: {
                ...rest,
                tags: JSON.stringify(tags),
                features: JSON.stringify(features),
                screenshots: JSON.stringify(screenshots),
            },
            create: {
                ...rest,
                tags: JSON.stringify(tags),
                features: JSON.stringify(features),
                screenshots: JSON.stringify(screenshots),
            },
        })
    }
    console.log(`✅ Seeded ${projects.length} projects`)

    // Seed Services - delete all first, then insert
    console.log('🛠️  Seeding services...')
    await prisma.service.deleteMany({})
    for (const service of services) {
        await prisma.service.create({
            data: {
                ...service,
                features: JSON.stringify(service.features),
            },
        })
    }
    console.log(`✅ Seeded ${services.length} services`)

    // Seed About Points - delete all first, then insert
    console.log('💡 Seeding about points...')
    await prisma.aboutPoint.deleteMany({})
    await prisma.aboutPoint.createMany({
        data: aboutPoints,
    })
    console.log(`✅ Seeded ${aboutPoints.length} about points`)

    // Seed Contact Info
    console.log('📞 Seeding contact info...')
    const existingContact = await prisma.contactInfo.findFirst()
    if (existingContact) {
        await prisma.contactInfo.update({
            where: { id: existingContact.id },
            data: contactInfo,
        })
    } else {
        await prisma.contactInfo.create({
            data: contactInfo,
        })
    }
    console.log('✅ Seeded contact info')

    // Seed Company Stats
    console.log('📊 Seeding company stats...')
    const existingStats = await prisma.companyStats.findFirst()
    if (existingStats) {
        await prisma.companyStats.update({
            where: { id: existingStats.id },
            data: companyStats,
        })
    } else {
        await prisma.companyStats.create({
            data: companyStats,
        })
    }
    console.log('✅ Seeded company stats')

    // Footer links
    console.log('🔗 Seeding footer links...')
    await prisma.footerLink.deleteMany({})
    await prisma.footerLink.createMany({
        data: footerLinks.map((l) => ({ ...l, isActive: true })),
    })
    console.log(`✅ Seeded ${footerLinks.length} footer links`)

    // Site hero config (ensures homepage CMS row exists)
    console.log('⚙️  Seeding site config...')
    await prisma.siteConfig.upsert({
        where: { id: 'hero' },
        update: {},
        create: { id: 'hero' },
    })
    console.log('✅ Seeded site config')

    console.log('📄 Seeding CMS pages...')
    for (const p of cmsPagesSeed) {
        const content = p.content.trim()
        await prisma.page.upsert({
            where: { slug: p.slug },
            update: { title: p.title, content, isActive: true },
            create: { slug: p.slug, title: p.title, content, isActive: true },
        })
    }
    console.log(`✅ Seeded ${cmsPagesSeed.length} CMS pages`)

    console.log('👥 Seeding team members...')
    await prisma.teamMember.deleteMany({})
    await prisma.teamMember.createMany({
        data: teamSeed.map((m) => ({
            ...m,
            linkedin: 'https://linkedin.com',
            twitter: null,
            github: null,
            isActive: true,
        })),
    })
    console.log(`✅ Seeded ${teamSeed.length} team members`)

    console.log('🎉 Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
