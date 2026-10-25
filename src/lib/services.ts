export type ServiceGroup = {
  title: string;
  intro?: string;
  items: readonly string[];
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  /** One short line for the header mega menu. */
  menuDescription: string;
  offerings: readonly ServiceGroup[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  /** Optional page-hero background; falls back to the shared office image. */
  heroImage?: string;
  heroImageAlt?: string;
  whyChoose: {
    intro: string;
    points: readonly [string, string, string, string];
  };
};

export const services: Service[] = [
  {
    slug: "litigation-disputes",
    title: "Litigation & Disputes",
    menuDescription: "Strategy, portfolio oversight, and dispute intelligence.",
    offerings: [
      {
        title: "Litigation portfolio management",
        intro:
          "Structured oversight of litigation portfolios, so cost, exposure, and decisions stay visible.",
        items: [
          "Litigation portfolio assessments and management frameworks",
          "Dispute categorization, prioritization, and exposure tracking",
          "Litigation budget development and cost monitoring",
          "External counsel management and performance reporting",
          "Litigation reporting dashboards and executive briefings",
          "Portfolio-level trend analysis and management information",
          "Litigation process improvement and workflow optimization",
          "Coordination of internal stakeholders and external advisers",
        ],
      },
      {
        title: "Strategic dispute intelligence",
        intro:
          "The commercial and operational consequences of a dispute, not only the issues in contention.",
        items: [
          "Early dispute assessment from a commercial and operational perspective",
          "Strategic options and scenario analysis",
          "Dispute-related financial and business impact assessments",
          "Settlement economics and decision-support modelling",
          "Stakeholder and reputational exposure analysis",
          "Dispute escalation and business continuity planning",
          "Strategic management briefings",
          "Coordination of specialist input where required",
        ],
      },
      {
        title: "Litigation technology and operational innovation",
        intro:
          "Technology that makes litigation processes more efficient, transparent, and manageable.",
        items: [
          "Litigation management systems advisory",
          "E-discovery vendor and technology evaluation",
          "Matter management workflow optimization",
          "Litigation analytics and management reporting",
          "Document management and information organization",
          "AI adoption assessments for litigation operations",
          "Technology implementation oversight",
          "Litigation process automation",
        ],
      },
      {
        title: "Dispute prevention and organizational learning",
        intro:
          "Recurring sources of conflict, and the internal processes that reduce them.",
        items: [
          "Dispute trend and root-cause analysis",
          "Contract management process improvement",
          "Escalation and dispute reporting frameworks",
          "Internal dispute management policies",
          "Post-dispute operational reviews",
          "Commercial relationship risk assessments",
        ],
      },
    ],
    description:
      "Independent litigation management and dispute intelligence for complex or high-value matters, with portfolio oversight and a view of the wider business.",
    seoTitle: "Litigation & Dispute Advisory",
    seoDescription:
      "BYNK provides independent, non-representational litigation management and dispute advisory, combining commercial intelligence, financial analysis, and technology-enabled oversight.",
    keywords: [
      "litigation portfolio management",
      "dispute intelligence",
      "litigation strategy",
      "dispute advisory",
    ],
    image: "/practice/litigation.jpg",
    imageAlt: "Legal books and litigation strategy setting",
    whyChoose: {
      intro:
        "Litigation should not be managed apart from business strategy. BYNK helps organizations see disputes in the context of financial performance, commercial relationships, operations, and organizational objectives.",
      points: [
        "Portfolio assessments, exposure tracking, budgets, and counsel performance reporting.",
        "Early commercial assessment, scenario analysis, and settlement decision support.",
        "Advisory on litigation systems, analytics, workflow, and process automation.",
        "Dispute trend reviews, contract process improvement, and prevention frameworks.",
      ],
    },
  },
  {
    slug: "finance-business",
    title: "Finance & Business",
    menuDescription: "Commercial risk, governance, and business strategy.",
    offerings: [
      {
        title: "Financial services strategy",
        items: [
          "Financial-sector business strategy",
          "Financial technology innovation advisory",
          "Commercial and operational risk assessments",
          "Financial services business model analysis",
          "Strategic governance and accountability frameworks",
          "Technology-enabled financial services transformation",
          "Third-party service provider risk and oversight",
          "Financial-sector operational resilience planning",
        ],
      },
      {
        title: "Commercial and business strategy",
        items: [
          "Corporate and business strategic planning",
          "Commercial opportunity assessments",
          "Business model development and evaluation",
          "Growth and expansion strategies",
          "Strategic partnership assessments",
          "Business performance reviews",
          "Commercial negotiation preparation",
          "Business restructuring and transformation planning",
        ],
      },
      {
        title: "Governance, risk, and decision support",
        items: [
          "Corporate governance process assessments",
          "Enterprise risk management strategy",
          "Board and executive decision-support frameworks",
          "Commercial risk identification and prioritization",
          "Internal reporting and accountability systems",
          "Strategic policy and process reviews",
          "Business continuity and operational resilience advisory",
        ],
      },
      {
        title: "Fintech and emerging business models",
        items: [
          "Fintech market-entry strategy",
          "Digital financial product commercialization",
          "Financial technology vendor assessments",
          "Innovation governance and risk frameworks",
          "Fintech partnership strategy",
          "Digital business model evaluation",
          "Coordination with qualified regulatory and technical specialists",
        ],
      },
    ],
    description:
      "Commercial risk, governance, and business strategy for financial-sector participants, entrepreneurs, and organizations facing transformation.",
    seoTitle: "Finance & Business Advisory",
    seoDescription:
      "BYNK advises on financial services strategy, commercial decisions, governance, and fintech business models, drawing on finance, law, technology, and business advisory.",
    keywords: [
      "financial services strategy",
      "commercial risk advisory",
      "fintech business strategy",
      "governance and decision support",
    ],
    image: "/why/analytics.png",
    imageAlt: "Analytics used in commercial and financial strategy",
    whyChoose: {
      intro:
        "Sound commercial strategy needs financial reality, operational challenge, technological change, and risk in the same view. BYNK brings those perspectives together.",
      points: [
        "Financial-sector strategy, business model analysis, and operational resilience.",
        "Commercial planning, growth, partnerships, and transformation.",
        "Governance reviews, enterprise risk, and board decision support.",
        "Fintech market entry, product commercialization, and partnership strategy.",
      ],
    },
  },
  {
    slug: "innovation",
    title: "Innovation & Transformation",
    menuDescription: "Transformation, growth, and new business models.",
    offerings: [
      {
        title: "Innovation strategy",
        items: [
          "Enterprise innovation strategy development",
          "Innovation readiness and capability assessments",
          "Identification of new commercial opportunities",
          "Strategic innovation roadmaps",
          "Business model innovation",
          "Innovation governance and accountability",
          "Emerging trend and opportunity analysis",
        ],
      },
      {
        title: "Business transformation",
        items: [
          "Organizational transformation strategy",
          "Business process redesign",
          "Operating model assessments",
          "Change management planning",
          "Performance improvement initiatives",
          "Technology-enabled transformation",
          "Implementation oversight and strategic coordination",
        ],
      },
      {
        title: "New business and venture advisory",
        items: [
          "Business concept assessment and validation",
          "Market-entry strategy",
          "Commercial feasibility reviews",
          "Product and service innovation",
          "Go-to-market planning",
          "Business launch strategy",
          "Growth and scaling frameworks",
        ],
      },
      {
        title: "Executive innovation advisory",
        items: [
          "Executive strategy workshops",
          "Innovation leadership development",
          "Strategic ideation sessions",
          "Scenario planning",
          "Business challenge diagnostics",
          "Independent strategic reviews",
        ],
      },
    ],
    description:
      "Innovation strategy, business transformation, and new venture advisory for organizations that need change to be commercially viable and operationally achievable.",
    seoTitle: "Innovation & Business Transformation",
    seoDescription:
      "BYNK helps organizations question assumptions, transform operations, and build new business models with strategy that is commercially viable and operationally achievable.",
    keywords: [
      "innovation strategy",
      "business transformation advisory",
      "new venture advisory",
      "innovation governance",
    ],
    image: "/practice/innovation.jpg",
    imageAlt: "Leadership team collaborating on innovation strategy",
    whyChoose: {
      intro:
        "Innovation is not only new technology or new ideas. It is thoughtful change that creates measurable business value.",
      points: [
        "Innovation strategy, readiness assessments, and governance.",
        "Operating model reviews, process redesign, and transformation planning.",
        "Venture assessment, market entry, and go-to-market planning.",
        "Executive workshops, scenario planning, and independent strategic reviews.",
      ],
    },
  },
  {
    slug: "technology-ai",
    title: "Technology & AI",
    menuDescription: "Digital strategy, AI governance, and legal technology.",
    offerings: [
      {
        title: "Artificial intelligence strategy",
        items: [
          "Organizational AI readiness assessments",
          "AI opportunity and use-case identification",
          "AI adoption roadmaps",
          "Responsible AI governance frameworks",
          "AI procurement and vendor assessment",
          "Human oversight and accountability processes",
          "AI risk management strategy",
          "Executive AI education and workshops",
        ],
      },
      {
        title: "Legal technology and legal operations",
        items: [
          "Legal department technology strategy",
          "Legal operations transformation",
          "Litigation management technology assessments",
          "Contract lifecycle management technology advisory",
          "Legal workflow automation",
          "Legal technology procurement",
          "AI adoption strategy for legal teams",
          "Technology implementation and change management",
        ],
      },
      {
        title: "Digital transformation",
        items: [
          "Digital maturity assessments",
          "Technology strategy and roadmapping",
          "Business process automation",
          "Technology investment evaluation",
          "Systems and workflow integration planning",
          "Digital operating model development",
          "Technology project oversight",
        ],
      },
      {
        title: "Technology governance and risk",
        items: [
          "Technology risk management frameworks",
          "Privacy and information governance process reviews",
          "Technology vendor oversight",
          "Cybersecurity governance and incident readiness coordination",
          "Data management strategy",
          "Digital resilience planning",
          "Responsible technology policies",
        ],
      },
    ],
    description:
      "Digital strategy, responsible AI governance, and legal technology advisory so adoption stays tied to commercial value.",
    seoTitle: "Technology, AI & Digital Advisory",
    seoDescription:
      "BYNK helps organizations evaluate emerging technology, govern AI responsibly, and transform legal and digital operations with strategy, oversight, and commercial focus.",
    keywords: [
      "AI governance advisory",
      "responsible AI adoption",
      "legal technology strategy",
      "digital transformation advisory",
    ],
    image: "/practice/tech-ai.jpg",
    imageAlt: "Artificial intelligence and technology systems",
    heroImage: "/services/technology-ai-hero.png",
    heroImageAlt: "Abstract AI network globe with circuit pathways",
    whyChoose: {
      intro:
        "Technology should serve strategy. BYNK helps organizations adopt it thoughtfully, responsibly, and with a clear focus on commercial value.",
      points: [
        "AI readiness, use cases, responsible governance, and risk management.",
        "Legal operations technology, workflow automation, and litigation systems.",
        "Digital strategy, investment evaluation, and operating model design.",
        "Technology risk, privacy governance, vendor oversight, and resilience.",
      ],
    },
  },
  {
    slug: "people-workplace",
    title: "People & Workplace",
    menuDescription: "Disputes, mental health, and organizational culture.",
    offerings: [
      {
        title: "Workplace dispute management",
        items: [
          "Workplace conflict diagnostics",
          "Dispute management process assessments",
          "Workplace complaint response planning",
          "Conflict escalation frameworks",
          "Organizational dispute prevention strategies",
          "Workplace dispute trend analysis",
          "Management and stakeholder coordination",
          "Post-dispute organizational improvement",
        ],
      },
      {
        title: "Mental-health-related workplace advisory",
        items: [
          "Workplace mental health governance assessments",
          "Organizational accommodation process reviews",
          "Strategic planning for complex employee matters",
          "Mental-health-related workplace risk management",
          "Coordination with qualified legal, clinical, and HR professionals",
          "Organizational response and communication frameworks",
          "Return-to-work process improvement",
          "Mental-health-related policy and procedure reviews",
        ],
      },
      {
        title: "Psychological safety and workplace culture",
        items: [
          "Organizational culture assessments",
          "Psychosocial risk reviews",
          "Psychological safety strategy",
          "Workplace conduct and reporting processes",
          "Leadership accountability frameworks",
          "Workplace well-being initiatives",
          "Conflict prevention training",
          "Organizational trust and communication improvement",
        ],
      },
      {
        title: "Sensitive workplace matters",
        items: [
          "Strategic coordination of complex workplace issues",
          "Independent process reviews",
          "Workplace investigation planning and specialist coordination",
          "Executive and leadership-related organizational concerns",
          "Sensitive employee transition planning",
          "Workplace crisis and reputational risk advisory",
          "Organizational remediation strategies",
        ],
      },
    ],
    description:
      "Discreet advisory on workplace disputes, mental-health-related matters, culture, and the organizational conditions behind them.",
    seoTitle: "Workplace Disputes, Mental Health & Organizational Advisory",
    seoDescription:
      "BYNK advises organizations on sensitive workplace disputes, mental-health-related matters, psychological safety, and the organizational issues underneath them.",
    keywords: [
      "workplace dispute advisory",
      "workplace mental health governance",
      "psychological safety strategy",
      "organizational culture advisory",
    ],
    image: "/practice/mental-health.jpg",
    imageAlt: "Professional workplace support conversation",
    whyChoose: {
      intro:
        "Workplace disputes are rarely isolated. They can reveal challenges in leadership, culture, communication, systems, and employee well-being.",
      points: [
        "Conflict diagnostics, complaint response planning, and dispute prevention.",
        "Mental health governance, accommodation processes, and complex employee matters.",
        "Psychological safety, culture reviews, and leadership accountability.",
        "Sensitive workplace coordination, investigation planning, and reputational risk.",
      ],
    },
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    menuDescription: "Commercial performance, innovation, and guest experience.",
    offerings: [
      {
        title: "Hospitality business strategy",
        items: [
          "Hospitality business model assessments",
          "Restaurant and hotel concept evaluation",
          "Market positioning and competitive strategy",
          "Commercial growth planning",
          "Expansion and diversification strategy",
          "Business performance assessments",
          "Strategic partnership evaluations",
          "Business transformation planning",
        ],
      },
      {
        title: "Hospitality operations and performance",
        items: [
          "Operational process reviews",
          "Service delivery improvement",
          "Revenue and cost optimization strategy",
          "Supplier and vendor management processes",
          "Performance reporting and management dashboards",
          "Operational risk assessments",
          "Service model redesign",
        ],
      },
      {
        title: "Hospitality technology and innovation",
        items: [
          "Hospitality technology strategy",
          "AI-enabled guest experience assessments",
          "Digital reservation and customer management systems",
          "Hospitality automation opportunities",
          "Technology vendor evaluation",
          "Data-driven operational improvement",
          "Digital customer engagement strategy",
        ],
      },
      {
        title: "Hospitality workplace and disputes",
        items: [
          "Workplace conflict and employee relations process reviews",
          "Hospitality workforce strategy",
          "Organizational culture and leadership assessments",
          "Commercial dispute management",
          "Guest complaint escalation frameworks",
          "Vendor and supplier dispute advisory",
          "Crisis and reputational risk strategy",
        ],
      },
      {
        title: "Hospitality experience strategy",
        items: [
          "Guest journey assessments",
          "Service innovation",
          "Customer experience transformation",
          "Brand differentiation",
          "Guest loyalty strategy",
          "Reputation and service recovery planning",
        ],
      },
    ],
    description:
      "Strategy for hospitality owners and operators across commercial performance, operations, technology, workforce, and guest experience.",
    seoTitle: "Hospitality Strategy & Advisory",
    seoDescription:
      "BYNK advises hospitality owners, operators, and investors on performance, innovation, workplace issues, technology, and guest experience.",
    keywords: [
      "hospitality business strategy",
      "hotel and restaurant advisory",
      "hospitality technology strategy",
      "guest experience advisory",
    ],
    image: "/menu/industries.jpg",
    imageAlt: "A setting associated with hospitality and commercial performance",
    whyChoose: {
      intro:
        "Hospitality needs disciplined strategy, effective operations, engaged people, responsible technology, and a distinctive customer experience. BYNK connects those elements.",
      points: [
        "Business model, positioning, growth, and performance assessments.",
        "Operations, service delivery, cost, and operational risk.",
        "Hospitality technology, automation, and guest experience systems.",
        "Workforce strategy, workplace disputes, and service recovery.",
      ],
    },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
