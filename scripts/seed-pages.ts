// Run with: npx tsx scripts/seed-pages.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.footerLink.deleteMany()
  await prisma.page.deleteMany()

  // ========== PAGES ==========
  await prisma.page.createMany({
    data: [
      {
        slug: 'about-us',
        title: 'About Us',
        content: `<h2>Who We Are</h2>
<p>FusionBytePro is a full-service digital agency dedicated to transforming businesses through innovative technology solutions. Founded with a passion for excellence, we bring together a team of talented developers, designers, and strategists who are committed to delivering exceptional digital experiences.</p>

<h2>Our Mission</h2>
<p>Our mission is to empower businesses of all sizes to thrive in the digital world. We believe that great technology should be accessible, intuitive, and impactful. Every project we undertake is driven by our commitment to quality, innovation, and client satisfaction.</p>

<h2>Our Values</h2>
<p><strong>Innovation First:</strong> We stay ahead of the curve, constantly exploring new technologies and methodologies to deliver cutting-edge solutions.</p>
<p><strong>Client-Centric:</strong> Your success is our success. We work closely with our clients to understand their unique challenges and goals.</p>
<p><strong>Quality Driven:</strong> We never compromise on quality. Every line of code, every pixel, and every interaction is crafted with precision and care.</p>
<p><strong>Transparency:</strong> We believe in open communication, honest feedback, and complete transparency throughout every project.</p>

<h2>Our Journey</h2>
<p>Since our founding, we have successfully delivered 500+ projects for 200+ satisfied clients across diverse industries. From startups to enterprise-level organizations, we have the expertise and experience to handle projects of any scale and complexity.</p>`
      },
      {
        slug: 'our-team',
        title: 'Our Team',
        content: `<h2>Meet The Team Behind FusionBytePro</h2>
<p>Our team is our greatest asset. We are a diverse group of passionate professionals who bring unique skills and perspectives to every project.</p>

<h2>Leadership</h2>
<p><strong>CEO & Founder</strong> - Leads the company vision and strategy, with over 10 years of experience in the tech industry.</p>
<p><strong>CTO</strong> - Oversees all technical operations and architecture, ensuring we use the best technologies for every project.</p>
<p><strong>Creative Director</strong> - Drives the creative vision and design excellence across all our projects.</p>

<h2>Development Team</h2>
<p>Our development team consists of experienced full-stack developers, mobile app developers, and DevOps engineers who are proficient in the latest technologies including React, Next.js, React Native, Flutter, Node.js, Python, and cloud platforms.</p>

<h2>Design Team</h2>
<p>Our design team specializes in creating beautiful, user-centric interfaces. They are experts in UI/UX design, brand identity, and creating visual experiences that resonate with users.</p>

<h2>Join Our Team</h2>
<p>We're always looking for talented individuals who share our passion for technology and innovation. Check out our <a href="/careers">careers page</a> for current openings.</p>`
      },
      {
        slug: 'careers',
        title: 'Careers',
        content: `<h2>Join FusionBytePro</h2>
<p>We're building the future of digital experiences, and we want you to be part of it. At FusionBytePro, you'll work on exciting projects, learn from industry experts, and grow your career in a supportive environment.</p>

<h2>Why Work With Us?</h2>
<p><strong>Remote-First Culture:</strong> Work from anywhere in the world. We believe great work can happen from any location.</p>
<p><strong>Learning & Growth:</strong> Annual learning budgets, conference attendance, and mentorship programs to help you grow.</p>
<p><strong>Competitive Compensation:</strong> We offer competitive salaries, performance bonuses, and comprehensive benefits.</p>
<p><strong>Work-Life Balance:</strong> Flexible working hours and generous PTO to ensure you stay refreshed and motivated.</p>

<h2>Current Openings</h2>
<p><strong>Senior Full-Stack Developer</strong> - Remote - Full Time</p>
<p>Requirements: 3+ years experience with React/Next.js & Node.js</p>

<p><strong>UI/UX Designer</strong> - Remote - Full Time</p>
<p>Requirements: 2+ years experience in product design, proficiency in Figma</p>

<p><strong>Mobile App Developer (React Native)</strong> - Remote - Full Time</p>
<p>Requirements: 2+ years experience with React Native or Flutter</p>

<h2>How to Apply</h2>
<p>Send your resume and portfolio to <strong>careers@fusionbytepro.com</strong>. We'd love to hear from you!</p>`
      },
      {
        slug: 'blog',
        title: 'Blog',
        content: `<h2>FusionBytePro Blog</h2>
<p>Stay updated with the latest trends in technology, design, and digital transformation.</p>

<h3>The Future of Web Development in 2026</h3>
<p>Web development continues to evolve at a rapid pace. From AI-powered development tools to edge computing, discover what's shaping the future of the web. Server components, AI integration, and enhanced performance optimization are the key trends driving innovation.</p>

<h3>Why Mobile-First Design Matters More Than Ever</h3>
<p>With mobile traffic accounting for over 60% of global web traffic, designing for mobile first is no longer optional—it's essential. Learn how to create mobile experiences that delight users and drive conversions.</p>

<h3>Building Scalable Applications with Next.js</h3>
<p>Next.js has become the go-to framework for building modern web applications. In this post, we explore the best practices for building scalable, performant applications using Next.js 15 and React Server Components.</p>

<h3>The Importance of UI/UX Design in Digital Products</h3>
<p>Good design is good business. We explore how investing in UI/UX design can dramatically improve user engagement, conversion rates, and overall product success.</p>

<p><em>More articles coming soon. Check back regularly for updates!</em></p>`
      },
      {
        slug: 'faq',
        title: 'Frequently Asked Questions',
        content: `<h2>General Questions</h2>

<p><strong>Q: What services does FusionBytePro offer?</strong></p>
<p>A: We offer a comprehensive range of digital services including web development, mobile app development (iOS & Android), UI/UX design, e-commerce solutions, custom software development, and digital marketing.</p>

<p><strong>Q: How long does a typical project take?</strong></p>
<p>A: Project timelines vary depending on complexity. A simple website typically takes 2-4 weeks, while complex web applications or mobile apps can take 2-6 months. We provide detailed timelines during our initial consultation.</p>

<p><strong>Q: Do you offer free consultations?</strong></p>
<p>A: Yes! We offer a free initial consultation to discuss your project requirements, provide recommendations, and give you a clear understanding of the process and costs involved.</p>

<h2>Project Questions</h2>

<p><strong>Q: What technologies do you work with?</strong></p>
<p>A: We specialize in React, Next.js, React Native, Flutter, Node.js, Python, PostgreSQL, MongoDB, AWS, and more. We always recommend the best technology stack based on your project needs.</p>

<p><strong>Q: Can you work with existing codebases?</strong></p>
<p>A: Absolutely. We frequently take over existing projects for maintenance, upgrades, or feature additions. We'll conduct a thorough code review and provide recommendations before starting.</p>

<p><strong>Q: Do you provide source code ownership?</strong></p>
<p>A: Yes, upon project completion and final payment, you receive complete ownership of all source code and assets.</p>

<h2>Support & Maintenance</h2>

<p><strong>Q: What support do you provide after launch?</strong></p>
<p>A: Every project includes 1 year of free technical support and bug fixes. After that, we offer flexible maintenance plans to keep your product running smoothly.</p>

<p><strong>Q: How do I report a bug or request a feature?</strong></p>
<p>A: You can reach us via email, phone, or through our contact form. Our support team typically responds within 24 hours.</p>`
      },
      {
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        content: `<h2>Privacy Policy</h2>
<p><em>Last updated: April 2026</em></p>

<p>FusionBytePro ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

<h2>Information We Collect</h2>
<p><strong>Personal Data:</strong> We may collect personal identification information such as your name, email address, phone number, and company name when you fill out forms on our website.</p>
<p><strong>Usage Data:</strong> We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages visited.</p>

<h2>How We Use Your Information</h2>
<p>We use the information we collect to:</p>
<p>• Respond to your inquiries and provide customer support</p>
<p>• Improve our website and services</p>
<p>• Send you marketing communications (with your consent)</p>
<p>• Comply with legal obligations</p>

<h2>Data Security</h2>
<p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

<h2>Third-Party Services</h2>
<p>We may use third-party services such as analytics tools that collect, monitor, and analyze usage data to improve our service.</p>

<h2>Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please contact us at <strong>privacy@fusionbytepro.com</strong>.</p>`
      },
      {
        slug: 'terms-of-service',
        title: 'Terms of Service',
        content: `<h2>Terms of Service</h2>
<p><em>Last updated: April 2026</em></p>

<h2>1. Agreement to Terms</h2>
<p>By accessing and using the FusionBytePro website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.</p>

<h2>2. Services</h2>
<p>FusionBytePro provides web development, mobile app development, UI/UX design, and related digital services. The specific terms of each engagement will be outlined in individual project agreements.</p>

<h2>3. Intellectual Property</h2>
<p>Upon full payment, clients receive complete ownership of all custom code, designs, and other deliverables created specifically for their project. FusionBytePro retains the right to use general tools, frameworks, and methodologies across projects.</p>

<h2>4. Payment Terms</h2>
<p>Payment terms are outlined in individual project agreements. Standard terms include a deposit upon project initiation, with milestone payments throughout development, and final payment upon project completion.</p>

<h2>5. Warranties</h2>
<p>We warrant that our services will be performed in a professional manner consistent with industry standards. All projects include 1 year of technical support and bug fixes from the date of delivery.</p>

<h2>6. Limitation of Liability</h2>
<p>FusionBytePro shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.</p>

<h2>7. Changes to Terms</h2>
<p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.</p>

<h2>8. Contact</h2>
<p>For questions about these Terms, contact us at <strong>legal@fusionbytepro.com</strong>.</p>`
      },
      {
        slug: 'documentation',
        title: 'Documentation',
        content: `<h2>Client Documentation</h2>
<p>Welcome to the FusionBytePro documentation center. Here you'll find guides and resources for working with us.</p>

<h2>Getting Started</h2>
<p><strong>Step 1: Initial Consultation</strong> - Schedule a free consultation through our contact form or by calling us directly. We'll discuss your project requirements, timeline, and budget.</p>
<p><strong>Step 2: Proposal & Agreement</strong> - Based on our consultation, we'll provide a detailed proposal outlining scope, timeline, technology stack, and pricing.</p>
<p><strong>Step 3: Kickoff</strong> - Once the agreement is signed and the initial deposit is received, we'll schedule a project kickoff meeting to align on goals and milestones.</p>

<h2>Project Management</h2>
<p>We use Agile methodology with 2-week sprints. During each sprint, you'll receive regular updates, demo sessions, and progress reports. Communication is handled through dedicated channels (Slack, Teams, or your preferred platform).</p>

<h2>Deliverables</h2>
<p>At project completion, you'll receive:</p>
<p>• Complete source code with documentation</p>
<p>• Deployment guides</p>
<p>• User manuals (if applicable)</p>
<p>• 1 year of technical support</p>

<h2>Support</h2>
<p>For technical support, email <strong>support@fusionbytepro.com</strong> or call us during business hours. We aim to respond to all inquiries within 24 hours.</p>`
      }
    ]
  })

  // ========== FOOTER LINKS ==========
  await prisma.footerLink.createMany({
    data: [
      // Services column
      { title: 'Web Development', url: '/#services', column: 'Services', order: 1 },
      { title: 'UI/UX Design', url: '/#services', column: 'Services', order: 2 },
      { title: 'App Development', url: '/#services', column: 'Services', order: 3 },
      { title: 'Digital Marketing', url: '/#services', column: 'Services', order: 4 },
      { title: 'Maintenance', url: '/#services', column: 'Services', order: 5 },
      
      // Company column
      { title: 'About Us', url: '/about-us', column: 'Company', order: 1 },
      { title: 'Our Team', url: '/our-team', column: 'Company', order: 2 },
      { title: 'Careers', url: '/careers', column: 'Company', order: 3 },
      { title: 'Portfolio', url: '/#portfolio', column: 'Company', order: 4 },
      { title: 'Blog', url: '/blog', column: 'Company', order: 5 },
      
      // Support column
      { title: 'Contact Us', url: '/#contact', column: 'Support', order: 1 },
      { title: 'FAQ', url: '/faq', column: 'Support', order: 2 },
      { title: 'Privacy Policy', url: '/privacy-policy', column: 'Support', order: 3 },
      { title: 'Terms of Service', url: '/terms-of-service', column: 'Support', order: 4 },
      { title: 'Documentation', url: '/documentation', column: 'Support', order: 5 },
    ]
  })

  console.log('✅ Seeded all pages and footer links successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
