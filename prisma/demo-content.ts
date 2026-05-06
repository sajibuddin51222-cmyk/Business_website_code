/**
 * Rich demo data for seed — 10 showcase projects & 10 software service lines.
 * Icons must exist in lib/icons.tsx iconMap.
 */

export const demoProjects = [
  {
    id: "enterprise-crm-platform",
    title: "Enterprise CRM & Sales Hub",
    category: "Enterprise SaaS",
    description:
      "Role-based CRM with pipelines, forecasting, and Salesforce-grade integrations for global sales teams.",
    longDescription:
      "We delivered a multi-tenant CRM with customizable pipelines, AI-assisted lead scoring, CPQ hooks, and OAuth SSO for Microsoft and Google. Includes audit trails, territory management, and mobile offline capture for field reps with conflict-safe sync.",
    icon: "Code",
    tags: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Pipeline & forecasting",
      "SSO & RBAC",
      "REST & GraphQL APIs",
      "Mobile offline mode",
      "Audit logging",
    ],
    videoUrl: "",
    screenshots: ["/images/portfolio_1.png", "/placeholder.jpg"],
    testLink: "/portfolio/enterprise-crm-platform",
    image: "/images/portfolio_1.png",
  },
  {
    id: "neo-banking-wallet",
    title: "Neo-Banking Wallet & Payments",
    category: "FinTech",
    description:
      "PCI-aware wallet with instant transfers, virtual cards, and real-time fraud scoring.",
    longDescription:
      "Built for a regulated market with tokenized PAN storage patterns, 3DS flows, instant P2P rails, virtual/physical card orchestration, and a merchant dispute console. Includes observability with anomaly alerts on transaction velocity.",
    icon: "Shield",
    tags: ["Flutter", "Kotlin", "PCI"],
    gradient: "from-emerald-500 to-teal-500",
    features: ["KYC hooks", "Fraud signals", "Ledger views", "Push provisioning", "Chargeback desk"],
    videoUrl: "",
    screenshots: ["/images/service_mobile.png", "/placeholder.jpg"],
    testLink: "#",
    image: "/images/service_mobile.png",
  },
  {
    id: "telehealth-connect",
    title: "Telehealth Patient Portal",
    category: "Healthcare",
    description:
      "HIPAA-minded telemedicine with scheduling, e-prescription handoffs, and secure messaging.",
    longDescription:
      "Patients book video visits, complete intake forms, and receive care plans. Clinicians use SOAP notes templates, eRx bridges, and encrypted chat. Session recording is policy-gated with consent capture and BAA-friendly hosting options.",
    icon: "Heart",
    tags: ["Next.js", "WebRTC", "HIPAA"],
    gradient: "from-pink-500 to-rose-500",
    features: ["Triage queue", "HL7/FHIR adapters", "Consent UX", "Device integrations", "Analytics"],
    videoUrl: "",
    screenshots: ["/images/hero_bg.png", "/placeholder.jpg"],
    testLink: "#",
    image: "/images/hero_bg.png",
  },
  {
    id: "omnichannel-retail-hub",
    title: "Omnichannel Retail Hub",
    category: "Retail Tech",
    description:
      "Unified inventory, POS bridge, and AI-driven recommendations across web, app, and stores.",
    longDescription:
      "Real-time stock sync across warehouses and storefronts, endless aisle kiosks, clienteling apps for associates, and personalized bundles powered by purchase graphs. Includes returns orchestration and loyalty ledger.",
    icon: "ShoppingCart",
    tags: ["React Native", "Kafka", "Snowflake"],
    gradient: "from-purple-500 to-indigo-500",
    features: ["OMS", "POS connectors", "Recommendations", "Loyalty", "Store fulfillment"],
    videoUrl: "",
    screenshots: ["/images/portfolio_1.png", "/placeholder.jpg"],
    testLink: "#",
    image: "/images/portfolio_1.png",
  },
  {
    id: "fleet-command-logistics",
    title: "Fleet Command & Logistics",
    category: "Logistics",
    description:
      "GPS-tracked fleet ops with route optimization, dwell analytics, and driver scorecards.",
    longDescription:
      "Dispatchers optimize multi-stop routes with traffic-aware ETA, geofenced alerts, temperature monitoring for cold chain, and SLA dashboards. Partners ingest proofs of delivery via mobile capture.",
    icon: "Globe",
    tags: ["Maps", "IoT", "Android"],
    gradient: "from-orange-500 to-amber-500",
    features: ["Route AI", "Geofencing", "IoT sensors", "DOT reporting", "Partner APIs"],
    videoUrl: "",
    screenshots: ["/images/service_web.png", "/placeholder.jpg"],
    testLink: "#",
    image: "/images/service_web.png",
  },
  {
    id: "campus-learning-os",
    title: "Campus Learning OS",
    category: "EdTech",
    description:
      "LMS with cohort pathways, autograded labs, plagiarism signals, and competency badges.",
    longDescription:
      "Institutions launch blended programs with SCORM imports, rubric-based grading, peer reviews, and skills passports. Students get adaptive study plans; admins track accreditation artifacts and roster sync from SIS.",
    icon: "Cpu",
    tags: ["LMS", "SCORM", "AWS"],
    gradient: "from-violet-500 to-purple-500",
    features: ["Adaptive paths", "Proctoring hooks", "Skills wallet", "SIS sync", "Analytics"],
    videoUrl: "",
    screenshots: ["/images/service_ui.png", "/placeholder.jpg"],
    testLink: "#",
    image: "/images/service_ui.png",
  },
  {
    id: "broadcast-studio-suite",
    title: "Broadcast & Streaming Suite",
    category: "Media",
    description:
      "Live production stack with multi-cam switching, graphics, chat moderation, and VOD packaging.",
    longDescription:
      "Creators run 1080p/4K streams with low-latency WebRTC ingest, automated clipping, sponsor overlays, and chat sentiment moderation. VOD pipeline handles captions, DRM packaging, and CDN fan-out.",
    icon: "Monitor",
    tags: ["WebRTC", "FFmpeg", "CDN"],
    gradient: "from-red-500 to-orange-500",
    features: ["Low-latency live", "DRM packaging", "Moderation", "Ad markers", "Clip automation"],
    videoUrl: "",
    screenshots: ["/images/hero_bg.png", "/placeholder.jpg"],
    testLink: "#",
    image: "/images/hero_bg.png",
  },
  {
    id: "smart-factory-mes",
    title: "Smart Factory MES Dashboard",
    category: "Manufacturing",
    description:
      "Shop-floor visibility with OEE, work orders, Andon events, and predictive maintenance cues.",
    longDescription:
      "PLC/OPC-UA connectors stream machine telemetry into OEE tiles, downtime pareto views, and predictive maintenance models. Supervisors manage work orders, tooling, and quality holds with traceability by lot.",
    icon: "BarChart",
    tags: ["OPC-UA", "Azure IoT", "React"],
    gradient: "from-slate-600 to-slate-800",
    features: ["OEE", "Downtime RCA", "Predictive MTTR", "Genealogy", "Shift boards"],
    videoUrl: "",
    screenshots: ["/images/portfolio_1.png", "/placeholder.jpg"],
    testLink: "#",
    image: "/images/portfolio_1.png",
  },
  {
    id: "juris-case-cloud",
    title: "Juris Case & Matter Cloud",
    category: "Legal Tech",
    description:
      "Matter management with e-filing adapters, trust accounting guardrails, and secure evidence rooms.",
    longDescription:
      "Attorneys track matters, conflicts, and deadlines with court calendar integrations. Document rooms offer granular ACLs, redaction workflows, and retention policies. Billing supports LEDES exports and split trusts.",
    icon: "Lock",
    tags: ["Security", "Compliance", "Vue"],
    gradient: "from-blue-600 to-indigo-700",
    features: ["Matter intake", "Trust accounting", "E-filing", "Redaction", "LEDES billing"],
    videoUrl: "",
    screenshots: ["/placeholder.jpg", "/placeholder.jpg"],
    testLink: "#",
    image: "/images/service_ai.png",
  },
  {
    id: "resort-booking-pro",
    title: "Resort Booking & Guest Experience",
    category: "Hospitality",
    description:
      "Full guest journey: booking engine, upsells, mobile keys, and concierge AI assistant.",
    longDescription:
      "Dynamic pricing with yield rules, packages and bundles, spa/dining add-ons, multilingual POS handoff, and mobile key integrations. Guest messaging routes to staff queues with SLA timers and sentiment prompts.",
    icon: "Sparkles",
    tags: ["Booking", "Stripe", "Mobile"],
    gradient: "from-fuchsia-500 to-pink-500",
    features: ["Yield mgmt", "Upsells", "Mobile keys", "Concierge AI", "Housekeeping app"],
    videoUrl: "",
    screenshots: ["/images/service_mobile.png", "/placeholder.jpg"],
    testLink: "#",
    image: "/images/service_mobile.png",
  },
] as const

export const demoServices = [
  {
    title: "Custom Web Applications",
    description:
      "High-performance SPAs and SSR apps with auth, RBAC, SEO, and observability baked in.",
    icon: "Globe",
    gradient: "from-blue-500 to-cyan-500",
    features: ["Next.js / React", "Edge-ready APIs", "Design systems", "WCAG-minded UI"],
    order: 1,
  },
  {
    title: "Native & Cross-Platform Mobile",
    description:
      "Ship crisp iOS/Android experiences with shared logic, push, offline, and store readiness.",
    icon: "Smartphone",
    gradient: "from-purple-500 to-pink-500",
    features: ["Flutter & RN", "Biometrics", "Deep links", "OTA updates"],
    order: 2,
  },
  {
    title: "Product Design & Design Systems",
    description:
      "Research-through-delivery: journeys, UI kits, tokens, and dev-ready handoff.",
    icon: "Palette",
    gradient: "from-orange-500 to-red-500",
    features: ["UX research", "Figma systems", "Motion specs", "Accessibility reviews"],
    order: 3,
  },
  {
    title: "Cloud Architecture & DevOps",
    description:
      "Landing zones, IaC, CI/CD, and cost-aware scaling on AWS, GCP, or Azure.",
    icon: "Cloud",
    gradient: "from-sky-500 to-blue-600",
    features: ["Terraform", "K8s", "GitOps", "SRE dashboards"],
    order: 4,
  },
  {
    title: "Data Platforms & Analytics",
    description:
      "Pipelines, warehouses, and BI layers that turn operational data into decisions.",
    icon: "BarChart",
    gradient: "from-green-500 to-emerald-600",
    features: ["dbt / ELT", "Snowflake/BigQuery", "Reverse ETL", "Self-serve BI"],
    order: 5,
  },
  {
    title: "Security & Compliance Engineering",
    description:
      "Threat modeling, secure SDLC, secrets, and audit-friendly controls for regulated domains.",
    icon: "Shield",
    gradient: "from-slate-600 to-slate-900",
    features: ["SSO/SAML", "Encryption", "SOC2 patterns", "Pen-test readiness"],
    order: 6,
  },
  {
    title: "AI & Intelligent Automation",
    description:
      "LLM features, retrieval stacks, and workflow bots grounded in your data policies.",
    icon: "Brain",
    gradient: "from-violet-500 to-indigo-500",
    features: ["RAG pipelines", "Guardrails", "Eval harnesses", "Workflow agents"],
    order: 7,
  },
  {
    title: "APIs, Integrations & Middleware",
    description:
      "Stable APIs, event meshes, and partner connectors that keep enterprise systems in sync.",
    icon: "Server",
    gradient: "from-amber-500 to-orange-600",
    features: ["REST/GraphQL", "Kafka/SQS", "Idempotency", "Partner SDKs"],
    order: 8,
  },
  {
    title: "Quality Engineering & Test Automation",
    description:
      "Shift-left testing with CI gates, contract tests, and realistic synthetic journeys.",
    icon: "Search",
    gradient: "from-teal-500 to-cyan-600",
    features: ["Playwright/Cypress", "API tests", "Load tests", "Quality gates"],
    order: 9,
  },
  {
    title: "Managed Services & Platform Ops",
    description:
      "Runbooks, on-call rotations, SLAs, and continuous tuning after go-live.",
    icon: "Monitor",
    gradient: "from-zinc-600 to-zinc-900",
    features: ["24/7 ops", "Incident response", "Cost ops", "Capacity planning"],
    order: 10,
  },
] as const
