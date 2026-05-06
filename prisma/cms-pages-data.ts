/** Initial HTML for CMS pages — editable from Admin → CMS pages */

export const cmsPagesSeed = [
  {
    slug: "about-us",
    title: "About Us",
    content: `
<h2>Who we are</h2>
<p>FusionByte Pro is a software consultancy delivering <strong>product-grade web, mobile, and cloud platforms</strong> for teams that care about velocity without sacrificing reliability.</p>
<h3>How we work</h3>
<ul>
<li>Dedicated squads with clear ownership from discovery to launch</li>
<li>Architecture-first mindset — security, observability, and cost awareness baked in</li>
<li>Transparent delivery with demos every sprint and measurable milestones</li>
</ul>
<h3>Industries</h3>
<p>FinTech, healthcare, retail, logistics, media, and enterprise SaaS — we translate domain complexity into intuitive software.</p>
`,
  },
  {
    slug: "careers",
    title: "Careers",
    content: `
<h2>Build with us</h2>
<p>We hire curious engineers, designers, and delivery leads who enjoy owning outcomes end-to-end.</p>
<h3>Open directions</h3>
<ul>
<li><strong>Full-stack & platform engineers</strong> — TypeScript, Next.js, Node, PostgreSQL, AWS/GCP</li>
<li><strong>Mobile engineers</strong> — Flutter & React Native</li>
<li><strong>Product designers</strong> — systems thinking, prototyping, accessibility</li>
</ul>
<p>Send your portfolio and CV to <a href="mailto:careers@fusionbytepro.com">careers@fusionbytepro.com</a>. We respond within five business days.</p>
`,
  },
  {
    slug: "blog",
    title: "Insights",
    content: `
<h2>Insights & updates</h2>
<p>Articles on shipping reliable software, platform patterns, and lessons from production systems.</p>
<h3>Latest</h3>
<ul>
<li><strong>Designing APIs for long-lived mobile clients</strong> — versioning, compatibility, and rollout tactics.</li>
<li><strong>Operational readiness checklist</strong> — dashboards, alerts, and error budgets before launch.</li>
<li><strong>Composable UI systems</strong> — tokens, accessibility, and velocity at scale.</li>
</ul>
<p><em>Subscribe via our newsletter soon — manage copy from the admin CMS.</em></p>
`,
  },
  {
    slug: "faq",
    title: "FAQ",
    content: `
<h2>Frequently asked questions</h2>
<h3>How do projects start?</h3>
<p>We begin with a discovery sprint: goals, constraints, integrations, and success metrics. You receive a roadmap and estimate.</p>
<h3>Can you work with our internal team?</h3>
<p>Yes — we routinely embed with product, security, and infra stakeholders via shared Slack/Jira and weekly demos.</p>
<h3>What about NDAs and IP?</h3>
<p>We sign mutual NDAs and assign deliverables per your contract; source ownership follows what we agree in writing.</p>
<h3>Support after launch?</h3>
<p>We offer managed SLAs including monitoring, incident response, and iterative enhancements.</p>
`,
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: `
<h2>Privacy Policy</h2>
<p><strong>Last updated:</strong> May 2026</p>
<h3>Data we collect</h3>
<p>Contact details you submit via forms, usage analytics on our marketing site, and cookies necessary for security and preferences.</p>
<h3>How we use data</h3>
<p>To respond to inquiries, improve our website, and comply with legal obligations. We do not sell personal data.</p>
<h3>Retention</h3>
<p>Form submissions are retained only as long as needed for follow-up unless a longer period is required by law.</p>
<h3>Contact</h3>
<p>For privacy requests: <a href="mailto:privacy@fusionbytepro.com">privacy@fusionbytepro.com</a></p>
`,
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    content: `
<h2>Terms of Service</h2>
<p><strong>Last updated:</strong> May 2026</p>
<h3>Use of this website</h3>
<p>Content is provided for informational purposes. You agree not to misuse the site or attempt unauthorized access.</p>
<h3>Intellectual property</h3>
<p>Branding, text, and visuals remain owned by FusionByte Pro unless otherwise stated.</p>
<h3>Limitation of liability</h3>
<p>To the fullest extent permitted by law, FusionByte Pro is not liable for indirect or consequential damages arising from use of this site.</p>
<h3>Governing law</h3>
<p>These terms are governed by applicable laws in your negotiated master services agreement for paid engagements.</p>
`,
  },
  {
    slug: "documentation",
    title: "Documentation",
    content: `
<h2>Partner documentation</h2>
<p>Technical onboarding packs are shared per engagement. Typical artifacts include:</p>
<ul>
<li>Architecture overview & threat model summary</li>
<li>API references (OpenAPI) and webhook schemas</li>
<li>Runbooks for deployments and rollback</li>
<li>Support escalation paths and SLA windows</li>
</ul>
<p>Request access through your project channel or <a href="/#contact">contact sales</a>.</p>
`,
  },
]
