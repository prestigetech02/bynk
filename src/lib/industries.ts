export type Industry = {
  slug: string;
  title: string;
  menuDescription: string;
  seoDescription: string;
  lead: string;
  detail: string;
  points: readonly [string, string, string];
  situations: readonly [string, string, string, string];
  serviceSlugs: readonly [string, string, string, string];
};

export const industries: Industry[] = [
  {
    slug: "banks",
    title: "Banks & Financial Institutions",
    menuDescription:
      "Complex change, disputes, and technology risk inside regulated banks.",
    seoDescription:
      "BYNK helps banks work through disputes, technology change, and risk that cross Legal, Risk, Technology, and the business.",
    lead: "A new system, an AI program, or a serious dispute rarely stays inside one team. Legal, risk, technology, and the business all feel it. BYNK helps the institution decide earlier.",
    detail:
      "Banks face problems that do not fit one silo. An AI implementation can create regulatory and litigation exposure. A digital transformation can create new operational risk. A major dispute can show weaknesses in systems and governance. Employee and customer mental-health issues can also meet accommodation, privacy, conduct, and reputation. BYNK sits in those intersections so management can act before the issue hardens.",
    points: [
      "What should we do with this dispute, system, or change?",
      "How should we design it so the risk is visible?",
      "What could go wrong for customers, regulators, and the bank?",
    ],
    situations: [
      "AI and digital programs that create regulatory and litigation exposure",
      "Disputes that reveal gaps in systems, controls, and governance",
      "Third-party, vendor, and operational resilience questions",
      "Workplace and customer vulnerability issues with reputational weight",
    ],
    serviceSlugs: [
      "litigation-disputes",
      "technology-ai",
      "finance-business",
      "people-workplace",
    ],
  },
  {
    slug: "fintech",
    title: "Fintech Companies",
    menuDescription:
      "Responsible innovation and growth for emerging financial platforms.",
    seoDescription:
      "BYNK helps fintech companies look at product, risk, and dispute exposure together before growth outruns the controls.",
    lead: "The product can move faster than the controls around it. BYNK helps fintech teams see the commercial idea, the technology, and the dispute risk in one conversation.",
    detail:
      "Fintech companies are building products, partnerships, and business models while they are still learning where the risk sits. Market entry, vendor choices, and innovation governance are commercial decisions with legal and operational consequences. BYNK helps founders and leadership teams weigh the opportunity, understand the exposure, and design the controls without treating the product as an afterthought.",
    points: [
      "Is this product ready for the risk it creates?",
      "Where do governance and partnerships need to catch up?",
      "What happens if a customer, vendor, or regulator challenges it?",
    ],
    situations: [
      "Market entry and new business-model decisions",
      "Vendor, partnership, and third-party oversight",
      "Responsible AI and digital product design",
      "Disputes with customers, partners, or regulators",
    ],
    serviceSlugs: [
      "finance-business",
      "technology-ai",
      "innovation",
      "litigation-disputes",
    ],
  },
  {
    slug: "payments",
    title: "Payments & Digital Banking",
    menuDescription:
      "Product, privacy, and operational risk across digital channels.",
    seoDescription:
      "BYNK helps payments and digital banking teams manage product, privacy, vendor, and operational risk across the channel.",
    lead: "A payments product touches customers, vendors, data, and daily operations at the same time. When something fails, it is rarely only a technical issue.",
    detail:
      "Payments and digital banking run on speed, data, and third parties. A failed process can become a customer complaint, a privacy issue, a vendor dispute, and an operational incident in the same week. BYNK helps the team see those threads together: the product design, the information involved, the vendors in the chain, and the decision leaders need to make.",
    points: [
      "Where does privacy or vendor risk sit inside the product?",
      "What breaks for customers if the process fails?",
      "How should the team respond before it becomes a dispute?",
    ],
    situations: [
      "Privacy and customer data inside a digital channel",
      "Vendor and service-provider oversight",
      "Operational failures that become customer disputes",
      "New payment products that need a clearer risk design",
    ],
    serviceSlugs: [
      "technology-ai",
      "finance-business",
      "litigation-disputes",
      "innovation",
    ],
  },
  {
    slug: "capital-markets",
    title: "Capital Markets & Wealth",
    menuDescription:
      "Advisory for institutions navigating litigation and transformation.",
    seoDescription:
      "BYNK helps capital markets and wealth firms handle disputes, technology change, and governance questions with a practical plan.",
    lead: "A dispute, a technology change, or a governance question can land on the same desk. BYNK helps investment and wealth teams read it in commercial terms and choose a next step.",
    detail:
      "Capital markets and wealth firms hold client trust while they manage disputes, technology change, and decisions that have to stay defensible. A matter can involve exposure, reserves, reputation, and the question of what the firm should do differently next time. BYNK brings litigation insight and commercial judgment into that conversation, so the response is a decision, not only a legal update.",
    points: [
      "What is the real exposure, beyond the legal question?",
      "Who inside the firm needs to decide, and on what facts?",
      "What should change so the same problem does not return?",
    ],
    situations: [
      "High-value disputes and portfolio oversight",
      "Technology investments and transformation programs",
      "Governance and board decision support",
      "Reputational and client-relationship exposure",
    ],
    serviceSlugs: [
      "litigation-disputes",
      "finance-business",
      "innovation",
      "technology-ai",
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
