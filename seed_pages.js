const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.page.createMany({
    data: [
      { slug: 'privacy-policy', title: 'Privacy Policy', content: '<h2>Privacy Policy</h2><p>This is the privacy policy...</p>' },
      { slug: 'terms-of-service', title: 'Terms of Service', content: '<h2>Terms of Service</h2><p>These are the terms of service...</p>' },
      { slug: 'faq', title: 'Frequently Asked Questions', content: '<h2>FAQ</h2><p>Here are some common questions.</p>' },
      { slug: 'about-us', title: 'About Us', content: '<h2>About Us</h2><p>We are a cool company.</p>' }
    ],
    skipDuplicates: true
  });

  await prisma.footerLink.createMany({
    data: [
      { title: 'Web Development', url: '/#services', column: 'Services', order: 1 },
      { title: 'UI/UX Design', url: '/#services', column: 'Services', order: 2 },
      { title: 'App Development', url: '/#services', column: 'Services', order: 3 },
      { title: 'About Us', url: '/about-us', column: 'Company', order: 1 },
      { title: 'Our Team', url: '/our-team', column: 'Company', order: 2 },
      { title: 'Portfolio', url: '/#portfolio', column: 'Company', order: 3 },
      { title: 'Contact Us', url: '/#contact', column: 'Support', order: 1 },
      { title: 'FAQ', url: '/faq', column: 'Support', order: 2 },
      { title: 'Privacy Policy', url: '/privacy-policy', column: 'Support', order: 3 },
      { title: 'Terms of Service', url: '/terms-of-service', column: 'Support', order: 4 },
    ],
    skipDuplicates: true
  });
  console.log("Seeded successfully");
}

main().catch(console.error).finally(() => prisma.$disconnect());
