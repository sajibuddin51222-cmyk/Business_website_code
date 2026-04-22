import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const projects = [
    {
        id: "ai-chatbot-platform",
        title: "AI-Powered Chatbot Platform",
        category: "AI Web Application",
        description: "Intelligent conversational AI with natural language processing and multi-language support",
        longDescription: "A state-of-the-art chatbot platform that leverages advanced NLP to understand and respond to user queries in real-time. It supports over 50 languages and integrates seamlessly with existing customer support systems.",
        icon: "Brain",
        tags: ["AI/ML", "Next.js", "Python"],
        gradient: "from-blue-500 to-cyan-500",
        features: ["Natural Language Understanding", "Multi-language Support", "Sentiment Analysis", "Customizable Personality", "Analytics Dashboard"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        screenshots: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
        testLink: "#",
    },
    {
        id: "smart-healthcare-app",
        title: "Smart Healthcare Mobile App",
        category: "AI Mobile App",
        description: "AI-driven health monitoring app with predictive analytics and telemedicine features",
        longDescription: "Revolutionizing patient care with AI. This app monitors vital signs, predicts potential health issues, and connects patients with doctors instantly. It features a secure, HIPAA-compliant architecture.",
        icon: "Heart",
        tags: ["React Native", "AI", "Healthcare"],
        gradient: "from-pink-500 to-rose-500",
        features: ["Real-time Vitals Monitoring", "AI Health Predictions", "Secure Video Consultations", "Medication Reminders", "Health History Tracking"],
        videoUrl: "",
        screenshots: ["/placeholder.jpg", "/placeholder.jpg"],
        testLink: "#",
    },
    {
        id: "ecommerce-ai-recommendation",
        title: "E-Commerce AI Recommendation",
        category: "AI Web Platform",
        description: "Personalized shopping experience with AI-powered product recommendations",
        longDescription: "Boost sales and customer engagement with our AI recommendation engine. It analyzes user behavior to suggest products they are most likely to buy, increasing conversion rates by up to 30%.",
        icon: "ShoppingCart",
        tags: ["AI", "E-commerce", "Analytics"],
        gradient: "from-purple-500 to-indigo-500",
        features: ["Personalized Feed", "Similar Product Suggestions", "Trend Analysis", "User Behavior Tracking", "A/B Testing Support"],
        videoUrl: "",
        screenshots: ["/placeholder.jpg", "/placeholder.jpg"],
        testLink: "#",
    },
    {
        id: "financial-dashboard",
        title: "Financial Dashboard UI/UX",
        category: "UI/UX Design",
        description: "Modern fintech dashboard with intuitive data visualization and user experience",
        longDescription: "A clean, modern, and intuitive dashboard design for a fintech platform. We focused on data visualization and ease of use, making complex financial data accessible to everyone.",
        icon: "Palette",
        tags: ["Figma", "UI/UX", "Design System"],
        gradient: "from-green-500 to-emerald-500",
        features: ["Interactive Charts", "Dark/Light Mode", "Responsive Layout", "Accessible Design", "Design System Components"],
        videoUrl: "",
        screenshots: ["/placeholder.jpg", "/placeholder.jpg"],
        testLink: "#",
    },
    {
        id: "realtime-analytics",
        title: "Real-Time Analytics Platform",
        category: "Web Development",
        description: "Enterprise-grade analytics platform with real-time data processing",
        longDescription: "Process and visualize millions of data points in real-time. This platform is built for scale, using WebSocket technology to deliver live updates without page refreshes.",
        icon: "Zap",
        tags: ["React", "Node.js", "WebSocket"],
        gradient: "from-yellow-500 to-orange-500",
        features: ["Live Data Streaming", "Customizable Widgets", "Role-based Access Control", "Data Export", "Alerting System"],
        videoUrl: "",
        screenshots: ["/placeholder.jpg", "/placeholder.jpg"],
        testLink: "#",
    },
]

const services = [
    {
        title: "Web Development",
        description: "Custom web applications built with cutting-edge technologies for optimal performance",
        icon: "Globe",
        gradient: "from-blue-500 to-cyan-500",
        features: ["Responsive Design", "SEO Optimized", "Fast Performance", "Secure & Scalable"],
        order: 1,
    },
    {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile apps for iOS and Android",
        icon: "Smartphone",
        gradient: "from-purple-500 to-pink-500",
        features: ["iOS & Android", "Cross-platform", "Native Performance", "App Store Deployment"],
        order: 2,
    },
    {
        title: "UI/UX Design",
        description: "Beautiful, intuitive interfaces that users love",
        icon: "Palette",
        gradient: "from-orange-500 to-red-500",
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
        order: 3,
    },
    {
        title: "AI Integration",
        description: "Leverage artificial intelligence to automate and enhance your business",
        icon: "Brain",
        gradient: "from-green-500 to-teal-500",
        features: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Predictive Analytics"],
        order: 4,
    },
]

const aboutPoints = [
    {
        title: "Expert Team",
        description: "Our team consists of seasoned developers, designers, and AI specialists with years of experience",
        icon: "Users",
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
        icon: "Award",
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

async function main() {
    console.log('🌱 Starting seed...')

    // Seed Admin User
    console.log('👤 Seeding admin user...')
    const adminEmail = "sajibuddin51222@gmail.com"
    const adminPassword = "sajibuddin2516!@"
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: { password: hashedPassword },
        create: {
            email: adminEmail,
            password: hashedPassword,
            name: "Admin User",
            role: "ADMIN",
        },
    })
    console.log('✅ Seeded admin user')

    // Seed Projects
    console.log('📦 Seeding projects...')
    for (const project of projects) {
        await prisma.project.upsert({
            where: { id: project.id },
            update: {
                ...project,
                tags: JSON.stringify(project.tags),
                features: JSON.stringify(project.features),
                screenshots: JSON.stringify(project.screenshots),
            },
            create: {
                ...project,
                tags: JSON.stringify(project.tags),
                features: JSON.stringify(project.features),
                screenshots: JSON.stringify(project.screenshots),
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
