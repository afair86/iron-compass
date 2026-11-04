import Image from "next/image";
import Link from "next/link";
import { appContextDetails, type AppContext } from "@/lib/articleAppContext";

export default function AppValuePanel({
  context = "daily",
}: {
  context?: AppContext;
}) {
  const details = appContextDetails(context);
  return (
    <section
      className="ic-app-value"
      aria-label={`${details.label} in the Iron Compass AI app`}
    >
      <div className="ic-app-value__copy">
        <p className="ic-app-value__label">In the Iron Compass AI app</p>
        <h2>{details.title}</h2>
        <p>{details.description}</p>
        {details.features.length > 0 ? (
          <ul>
            {details.features.map((feature) => (
              <li key={feature.text}>
                <span className="ic-app-value__plan">{feature.plan}</span>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ic-app-value__note">
            Habits and the private journal are free to start. Planning tools and
            AI coaching are on paid plans.
          </p>
        )}
        <div className="ic-cta-pair">
          <a href="/app/auth" className="ic-btn-primary">
            Start free
          </a>
          <Link href="/pricing" className="ic-btn-ghost">
            Compare plans
          </Link>
        </div>
        <Link className="ic-app-value__guide" href={details.guideHref}>
          {context === "leadership"
            ? "Read the Discipline guide"
            : context === "ai"
              ? "Read the AI guides"
              : details.label === "Daily practice"
                ? "Read the domain guides"
                : `Read the ${details.label} guide`}
        </Link>
      </div>
      <figure className="ic-app-value__screen">
        <Image
          src={details.screenshot.src}
          alt={details.screenshot.alt}
          width={details.screenshot.width}
          height={details.screenshot.height}
          sizes="(min-width: 900px) 300px, 75vw"
        />
        <figcaption>
          {details.label} in the app <span>{details.plan}</span>
        </figcaption>
      </figure>
    </section>
  );
}
