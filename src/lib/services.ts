export type Service = {
  slug: string;
  title: string;
  description: string;
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
    slug: "technology-ai",
    title: "Technology & AI Advisory",
    description:
      "AI strategy, governance, and responsible adoption frameworks for financial institutions and fintech operators.",
    seoTitle: "Technology & AI Advisory for Banks & Fintech",
    seoDescription:
      "BYNK Advisory helps financial institutions and fintech companies adopt AI responsibly—with governance, technology strategy, and human judgment.",
    keywords: [
      "AI advisory for banks",
      "fintech AI governance",
      "responsible AI adoption",
      "technology advisory Canada",
    ],
    image: "/practice/tech-ai.jpg",
    imageAlt: "Artificial intelligence and technology systems",
    heroImage: "/services/technology-ai-hero.png",
    heroImageAlt: "Abstract AI network globe with circuit pathways",
    whyChoose: {
      intro:
        "BYNK helps your people adopt AI with clarity and care—so technology serves judgment, trust, and the teams who use it every day.",
      points: [
        "Guidance shaped around the real questions your leaders and operators are asking.",
        "AI strategies designed with your people, culture, and risk appetite in mind.",
        "Human judgment beside technical fluency—so decisions feel owned, not outsourced.",
        "Practical frameworks that protect customers, colleagues, and institutional trust.",
      ],
    },
  },
  {
    slug: "litigation-disputes",
    title: "Litigation & Disputes Strategy",
    description:
      "Pre-litigation strategy and dispute-risk intelligence that turns uncertainty into clearer decisions.",
    seoTitle: "Litigation & Disputes Strategy for Financial Institutions",
    seoDescription:
      "BYNK Advisory provides pre-litigation strategy and dispute-risk intelligence so banking and fintech leaders can decide with clarity under pressure.",
    keywords: [
      "litigation strategy financial services",
      "dispute risk advisory",
      "pre-litigation consulting",
      "bank dispute strategy",
    ],
    image: "/practice/litigation.jpg",
    imageAlt: "Legal books and litigation strategy setting",
    whyChoose: {
      intro:
        "BYNK stands with your leadership when disputes feel personal, urgent, and unclear—turning pressure into a path your people can follow.",
      points: [
        "Advice rooted in the human stakes behind every claim, not only the paperwork.",
        "Strategies built around your team’s capacity, appetite, and institutional realities.",
        "Clear insight that helps decision-makers act with steadiness under pressure.",
        "Dispute intelligence that protects people, reputation, and long-term relationships.",
      ],
    },
  },
  {
    slug: "innovation-risk",
    title: "Innovation Risk Sprint",
    description:
      "Horizon scanning, scenario planning, and innovation governance for complex change programs.",
    seoTitle: "Innovation Risk Sprint for Banks & Fintech",
    seoDescription:
      "BYNK Advisory runs innovation risk sprints that help institutions move fast without flying blind—scenario planning, horizon scanning, and governance.",
    keywords: [
      "innovation risk sprint",
      "fintech innovation governance",
      "horizon scanning financial services",
      "scenario planning banks",
    ],
    image: "/practice/innovation.jpg",
    imageAlt: "Leadership team collaborating on innovation strategy",
    whyChoose: {
      intro:
        "BYNK helps innovators and risk leaders move together—so ambition does not leave people exposed, and caution does not stall progress.",
      points: [
        "Sprints focused on the tensions your teams actually feel between speed and safety.",
        "Scenarios designed around your institution’s people, products, and obligations.",
        "Shared language that brings Legal, Risk, Tech, and the business into one room.",
        "Innovation governance that frees teams to build without flying blind.",
      ],
    },
  },
  {
    slug: "mental-health-risk",
    title: "Workplace Mental Health Risk",
    description:
      "Mental-health law, accommodation, and reputational risk advisory for regulated workplaces.",
    seoTitle: "Workplace Mental Health Risk Advisory",
    seoDescription:
      "BYNK Advisory helps regulated workplaces manage mental-health law, accommodation, and reputational risk with empathy and institutional clarity.",
    keywords: [
      "workplace mental health risk",
      "mental health accommodation advisory",
      "HR legal risk financial services",
      "employee mental health governance",
    ],
    image: "/practice/mental-health.jpg",
    imageAlt: "Professional workplace support conversation",
    whyChoose: {
      intro:
        "BYNK treats workplace mental health as both a human duty and an institutional risk—supporting people while protecting the organization that employs them.",
      points: [
        "Recommendations grounded in real employee experiences and manager realities.",
        "Strategies tailored to your culture, obligations, and leadership capacity.",
        "Counsel that helps HR and Legal decide with empathy and clarity.",
        "Practical steps that reduce harm, strengthen trust, and manage reputational risk.",
      ],
    },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
