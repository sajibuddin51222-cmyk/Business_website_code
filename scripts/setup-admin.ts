import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = "sajibuddin51222@gmail.com"
  const password = "sajibuddin2516!@"
  const name = "Admin User"

  console.log(`🚀 Starting admin setup for ${email}...`)

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        name: name,
        role: "ADMIN"
      },
      create: {
        email,
        password: hashedPassword,
        name: name,
        role: "ADMIN"
      }
    })

    console.log(`✅ Admin user created/updated successfully: ${user.email}`)
  } catch (error) {
    console.error("❌ Error setting up admin user:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
