import Image from "next/image";
import Link from "next/link";
import PageShell from "../components/PageShell";
import AppLaunchStatus from "../components/AppLaunchStatus";
import AppScreenshot from "../components/AppScreenshot";
import {
  absoluteUrl,
  buildPageMetadata,
  productAppHref,
  serializeJsonLd,
} from "@/lib/site";
import { appSoftwareSchema } from "@/lib/appSchema";
import { launchFaq } from "@/lib/launchFaq";
import styles from "./app-overview.module.css";

export const metadata = buildPageMetadata({
  title: "Iron Compass AI App | Daily Discipline, Habits and AI Coaching",
  description:
    "Build discipline around the responsibilities you carry. Explore Iron Compass AI: daily habits, a private journal, planning tools and AI coaching. Start free.",
  path: "/download",
});

const features = [
  {
    id: "app-habits",
    title: "Keep the standard on a difficult day",
    plan: "Free",
    copy: "A habit needs a version you can still carry out when the day changes. Use Light or Full check-ins, then look at what you actually kept.",
    src: "/images/app-screens/discipline-habits.webp",
    alt: "Discipline habit cards with Light and Full check-in buttons",
    width: 640,
    height: 511,
  },
  {
    id: "app-journal",
    title: "Put the day on record",
    plan: "Journal Free · AI review Core and Elite",
    copy: "Write what happened in your private journal. On paid plans, AI journal reviews connect the entries to your recorded habits so you have something specific to examine.",
    src: "/images/app-screens/ai-journal-review.webp",
    alt: "An example AI journal review connecting recorded check-ins with the conditions behind them",
    width: 585,
    height: 410,
  },
  {
    id: "app-preparation",
    title: "Give tomorrow a first move",
    plan: "Core",
    copy: "Name the result that matters and the first move behind it. Today's preparation gives the commitments a place on a timeline, before the day fills itself.",
    src: "/images/app-screens/discipline-day-plan.webp",
    alt: "Today's preparation showing tomorrow's blocks on a timeline and a named priority",
    width: 640,
    height: 697,
  },
  {
    id: "app-strategy",
    title: "Keep the longer aim in view",
    plan: "Elite",
    copy: "Put one measurable aim into a 90-day strategy. Review the pace, the next checkpoint and the record of what you have done.",
    src: "/images/get-the-app/screens/strategy-scoreboard.webp",
    alt: "The 90-day strategy scoreboard showing weekly targets and recorded actions",
    width: 585,
    height: 1266,
  },
];
const plans = [
  {
    name: "Free",
    copy: "Habits, your next action, a private journal, your Standard and the toolkit guides.",
    href: `${productAppHref()}/auth`,
    action: "Start free",
  },
  {
    name: "Core",
    copy: "AI coaching and journal reviews, plus five planning tools for the day and the week.",
    href: "/pricing",
    action: "Explore Core",
  },
  {
    name: "Elite",
    copy: "Core and all eight tools, including 90-day strategy, Comeback protocol and 90-day review.",
    href: "/pricing",
    action: "Explore Elite",
  },
];
export default function DownloadPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { ...appSoftwareSchema, mainEntityOfPage: absoluteUrl("/download") },
      {
        "@type": "FAQPage",
        mainEntity: launchFaq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "The app",
            item: absoluteUrl("/download"),
          },
        ],
      },
    ],
  };
  return (
    <PageShell className="ic-public-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <div className={styles.page}>
        <section className={styles.hero} id="app-today">
          <div className={styles.heroCopy}>
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <span> / The app</span>
            </nav>
            <h1>Build the discipline your responsibilities demand.</h1>
            <p className={styles.lead}>
              Iron Compass AI turns the standard you set into daily practice:
              the habits you keep, the decisions you record and the next action
              you carry out.
            </p>
            <p>
              Work. Health. Family. Money. Ten life domains, one daily system.
              Start with the responsibility that needs you this week.
            </p>
            <div className="ic-cta-pair">
              <a href={`${productAppHref()}/auth`} className="ic-btn-primary">
                Start free
              </a>
              <Link href="/pricing" className="ic-btn-ghost">
                Compare plans
              </Link>
            </div>
            <AppLaunchStatus />
            <p className={styles.freeNote}>
              Free includes habits and a private journal. Planning tools and AI
              coaching are on paid plans.
            </p>
          </div>
          <figure className={styles.heroScreen}>
            <Image
              src="/images/get-the-app/screens/today.webp"
              alt="The Iron Compass AI Today screen with daily habits and a next action"
              width={585}
              height={1266}
              priority
              sizes="(min-width: 900px) 250px, 55vw"
            />
            <figcaption>
              Your responsibilities, brought into the day.
            </figcaption>
          </figure>
        </section>
        <section className={styles.practice}>
          <h2>A standard needs somewhere to be kept.</h2>
          <p className={styles.sectionIntro}>
            The public guides explain the work. The app gives you a daily place
            to do it and a record to review.
          </p>
          <div className={styles.practiceGrid}>
            <div>
              <h3>Choose the responsibility</h3>
              <p>
                Pick the domain that needs attention. Name a behaviour someone
                could see, rather than an intention only you know about.
              </p>
              <Link href="/domains">Explore the ten life domains</Link>
            </div>
            <div>
              <h3>Carry out the next action</h3>
              <p>
                Keep a small set of habits. Use the lighter version when needed,
                and keep the next move specific enough to act on.
              </p>
            </div>
            <div>
              <h3>Review the record</h3>
              <p>
                Look at what held and where the plan broke. Adjust the
                conditions, then return to the responsibility.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.features} aria-labelledby="app-features">
          <h2 id="app-features">Tools for follow-through.</h2>
          <p className={styles.sectionIntro}>
            See what the app does before you choose a plan. These are examples
            from the app, with access shown beside each feature.
          </p>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article key={feature.title} id={feature.id} className={styles.feature}>
                <div className={styles.featureCopy}>
                  <p className={styles.plan}>{feature.plan}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
                <figure>
                  <AppScreenshot
                    title={feature.title}
                    plan={feature.plan}
                    src={feature.src}
                    alt={feature.alt}
                    width={feature.width}
                    height={feature.height}
                  />
                </figure>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.plans} aria-labelledby="app-plans">
          <h2 id="app-plans">
            Start with the work. Choose the tools you need.
          </h2>
          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <article key={plan.name}>
                <h3>{plan.name}</h3>
                <p>{plan.copy}</p>
                <Link
                  href={plan.href}
                  className={
                    plan.name === "Free" ? "ic-btn-primary" : "ic-btn-ghost"
                  }
                >
                  {plan.action}
                </Link>
              </article>
            ))}
          </div>
          <p className={styles.planNote}>
            <Link href="/pricing">See current prices and trial terms</Link>. On
            iPhone, Apple shows the App Store price.
          </p>
        </section>
        <section className={styles.account}>
          <h2>One account. Your record stays with you.</h2>
          <p>
            Use the web app on your phone or computer. When the iPhone app is
            available, sign in with the same account to keep your habits,
            journal and subscription together.
          </p>
          <Link href="/privacy">Read how your information is handled</Link>
        </section>
        <section className={styles.faq} aria-labelledby="app-questions">
          <h2 id="app-questions">Before you start</h2>
          <div>
            {launchFaq.map((faq) => (
              <div key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.close}>
          <h2>Give one responsibility a place in today.</h2>
          <p>Choose a habit. Set the next action. Begin the record.</p>
          <div className="ic-cta-pair">
            <a href={`${productAppHref()}/auth`} className="ic-btn-primary">
              Start free
            </a>
            <Link href="/pricing" className="ic-btn-ghost">
              Compare plans
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
