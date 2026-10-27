import { Reveal } from "@/components/motion/Reveal";
import {
  LeadershipMemberCard,
  type LeadershipMember,
} from "@/components/leadership/LeadershipMemberCard";

const team: LeadershipMember[] = [
  {
    name: "Oyindamola Aladejana",
    nameAccent: "Aladejana",
    role: "Founder & Principal",
    imageSrc: "/about/MDCEO.jpeg",
    imageAlt: "Oyindamola Aladejana, Founder and Principal of BYNK Advisory",
    imagePosition: "object-[center_18%]",
    preview:
      "Oyindamola Aladejana is a finance and technology lawyer and strategic advisor working at the intersection of technology, litigation, innovation, and financial services. Licensed to practise law in Nigeria and Ontario, Canada, she brings a multidisciplinary perspective to the legal, technological, and business challenges facing financial institutions.",
    paragraphs: [
      "She is the founder of BYNK and helps financial institutions assess disputes, quantify litigation risk, develop strategy, and prepare for complex litigation. Her work in legal technology looks at how artificial intelligence, data, and emerging technologies can change legal decision-making and risk management inside financial institutions.",
      "Before founding BYNK, Oyindamola was in-house counsel at a commercial bank, advising internal and external stakeholders on litigation management, technology, business risk, and related strategic matters. That seat gives her a practical view of how legal, risk, technology, and business functions meet inside highly regulated institutions.",
      "She holds a Master’s degree in Financial Innovation & Technology from Smith School of Business at Queen’s University, and a Master’s degree in International & Commercial Law, specializing in Financial Services, from the University of Buckingham. She is also a Certified Counterintelligence Threat Analyst and an AI governance professional, with credentials that include CRISC, CAMS, and the Oxford Fintech Programme at Saïd Business School, University of Oxford.",
    ],
    credentials: [
      {
        label: "Licensed to practise",
        value: "Nigeria and Ontario, Canada",
      },
      {
        label: "Financial innovation",
        value:
          "Masters of Science, Financial Innovation and Technology, Queens University Smith School of Business, Ontario, Canada",
      },
      {
        label: "Commercial law",
        value:
          "Masters of Laws (Financial Services Specialist), University of Buckingham, Buckingham, United Kingdom",
      },
      {
        label: "Risk and technology",
        value:
          "CRISC - Certified in Risk and Information Systems Control\nCAMS - Certified Anti Money Laundering Specialist\nAIGP - Artificial Intelligence Governance Professional",
      },
    ],
  },
  {
    name: "Jamila Garba Ibrahim",
    nameAccent: "Garba Ibrahim",
    role: "Lead Legal Consultant, Africa & North America",
    imageSrc: "/about/Jamila.jpeg",
    imageAlt:
      "Jamila Garba Ibrahim, Lead Legal Consultant for Africa and North America at BYNK Advisory",
    imagePosition: "object-[center_20%]",
    preview:
      "Jamila Garba Ibrahim is a seasoned legal practitioner and corporate governance professional with over ten years’ experience in legal advisory, board and corporate secretariat operations, regulatory compliance, strategic planning, and executive administration. She currently serves as the Lead Legal Consultant, Africa & North America.",
    paragraphs: [
      "She currently serves as the Assistant Manager, Legal Services and Corporate Secretariat at an Incentive-Based Risk Sharing institution where she supports corporate governance processes, provides legal and regulatory research, reviews legal instruments, and contributes to the effective implementation of Board and Management decisions.",
      "Throughout her career, she has demonstrated strong capabilities in legal drafting, policy development, stakeholder engagement, operational coordination, litigation support, and institutional administration. Her professional experience also includes working with the United Nations Industrial Development Organization (UNIDO), where she contributed to project coordination, legal research, regulatory documentation, and stakeholder engagement under the National Quality Infrastructure Project for Nigeria.",
      "She holds a Bachelor of Laws (LL.B) degree from the University of Lagos, a Barrister-at-Law (BL) qualification from the Nigerian Law School, and a Master of Laws (LL.M) degree from Nile University of Nigeria. She is an Associate of the Chartered Institute of Secretaries and Administrators and an Associate of the Chartered Institute of Arbitrators, United Kingdom.",
      "Jamila is committed to promoting sound corporate governance, legal excellence, institutional accountability, and strategic organisational development through professionalism, integrity, and results-oriented leadership.",
    ],
    credentials: [
      {
        label: "Practice",
        value: "Legal Practitioner | Corporate Governance | Strategic Administrator",
      },
      {
        label: "Education",
        value: "LL.B, University of Lagos · BL, Nigerian Law School · LL.M, Nile University",
      },
      {
        label: "Memberships",
        value: "ACIS · ACIArb (United Kingdom)",
      },
      {
        label: "Experience",
        value: "UNIDO National Quality Infrastructure Project, Nigeria",
      },
    ],
  },
];

export function LeadershipProfile() {
  return (
    <section
      className="w-full bg-white"
      aria-labelledby="leadership-team-heading"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal from="up" duration={1000}>
          <div className="max-w-[46rem]">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
              Our team
            </p>
            <h2
              id="leadership-team-heading"
              className="mt-3 text-[clamp(2rem,3.8vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#080a12]"
            >
              Leadership behind{" "}
              <span
                className="font-normal italic text-[#3b82f6]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                clearer decisions
              </span>
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-[#3d4b5c]">
              Meet the practitioners guiding BYNK’s work across law, governance,
              technology, and institutional risk.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 lg:mt-14 lg:gap-8">
          {team.map((member, index) => (
            <Reveal
              key={member.name}
              delay={index * 100}
              from="up"
              duration={1100}
            >
              <LeadershipMemberCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
