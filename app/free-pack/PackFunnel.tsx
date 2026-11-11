"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { FREE_PACK_DOWNLOAD, PACK_EMAIL_CONSENT, PACK_EMAIL_CONSENT_VERSION, PACK_EXPERIMENT, freeRecommendations, packCta, type PackVariant } from "@/lib/freePack";
import { submitPublicForm, submissionError } from "@/lib/formResponse";

type GrowthWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
const GA_ID = process.env.NEXT_PUBLIC_PACK_GA4_ID || "";
const measurementAvailable = /^G-[A-Z0-9]+$/.test(GA_ID);
const experimentEnabled = process.env.NEXT_PUBLIC_PACK_EXPERIMENT_ENABLED === "true";

export default function PackFunnel({ emailEnabled, providerName }: { emailEnabled: boolean; providerName: string }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "accepted">("idle");
  const [error, setError] = useState("");
  const [alreadyRecorded, setAlreadyRecorded] = useState(false);
  const [measurement, setMeasurement] = useState(false);
  const [variant, setVariant] = useState<PackVariant>("control");
  const [topic, setTopic] = useState<keyof typeof freeRecommendations>("daily");
  const submitting = useRef(false);
  const measured = useRef(false);
  const recommendation = freeRecommendations[topic];

  function track(name: "pack_exposure" | "pack_request_accepted" | "pack_download" | "pack_app_open" | "pack_guide_open") {
    if (!measured.current) return;
    (window as GrowthWindow).gtag?.("event", name, { experiment_id: PACK_EXPERIMENT, variant, page_location: "https://ironcompassai.com/free-pack", page_referrer: "" });
  }
  function allowMeasurement() {
    if (!measurementAvailable || measured.current) return;
    let selected: PackVariant = "control";
    if (experimentEnabled) {
      try {
        const saved = sessionStorage.getItem(PACK_EXPERIMENT);
        selected = saved === "control" || saved === "practice" ? saved : crypto.getRandomValues(new Uint32Array(1))[0] % 2 ? "practice" : "control";
        sessionStorage.setItem(PACK_EXPERIMENT, selected);
      } catch { /* A session-only assignment still works without storage. */ }
    }
    setVariant(selected);
    const w = window as GrowthWindow;
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
    w.dataLayer = w.dataLayer || [];
    w.gtag = w.gtag || function (...args: unknown[]) { w.dataLayer!.push(args); };
    w.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    w.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    w.gtag("js", new Date());
    w.gtag("config", GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: "https://ironcompassai.com/free-pack", page_referrer: "", cookie_expires: 0 });
    w.gtag("event", "pack_exposure", { experiment_id: PACK_EXPERIMENT, variant: selected, page_location: "https://ironcompassai.com/free-pack", page_referrer: "" });
    if (!document.getElementById("pack-measurement")) { const script = document.createElement("script"); script.id = "pack-measurement"; script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`; document.head.appendChild(script); }
    measured.current = true;
    setMeasurement(true);
  }
  function stopMeasurement() {
    measured.current = false;
    // Disable this property immediately; no denied-consent pings or new queued events.
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
    (window as GrowthWindow).gtag?.("consent", "update", { analytics_storage: "denied" });
    document.getElementById("pack-measurement")?.remove();
    try { sessionStorage.removeItem(PACK_EXPERIMENT); } catch { /* Storage may be denied. */ }
    for (const name of ["_ga", `_ga_${GA_ID.replace("G-", "")}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`;
    }
    setMeasurement(false);
    setVariant("control");
  }
  async function requestPack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("pending"); setError("");
    try {
      const result = await submitPublicForm("/api/free-pack", { email, consent, consentVersion: PACK_EMAIL_CONSENT_VERSION, ...(measurement && experimentEnabled ? { variant } : {}) });
      const failure = submissionError(result.responseOk, result.body, "Could not confirm your request. Use the pack below or try again.");
      const receipt = (result.body as { status?: string })?.status;
      if (failure || (receipt !== "confirmation_pending" && receipt !== "already_recorded")) { setError(failure || "Could not confirm your request. Use the pack below."); setStatus("idle"); return; }
      setAlreadyRecorded(receipt === "already_recorded");
      setStatus("accepted"); if (receipt === "confirmation_pending") track("pack_request_accepted");
    } catch { setError("Could not confirm your request. Your email is still here. Try again or use the pack below."); setStatus("idle"); }
    finally { submitting.current = false; }
  }
  return <>
    <section className="ic-panel space-y-5" aria-labelledby="pack-email-heading">
      <h2 id="pack-email-heading" className="ic-section-heading">Keep the pack. Put it to work.</h2>
      {emailEnabled ? status === "accepted" ? <p role="status">{alreadyRecorded ? "This pack request has already been recorded. Repeating the form does not restart a completed or cancelled sequence. You can use the pack below, or contact us if you need help." : "Check your inbox for the confirmation email. The three follow-up notes start only after you confirm. You can use the pack below now."}</p> : <form onSubmit={requestPack} aria-busy={status === "pending"} aria-describedby={error ? "pack-email-error" : undefined} className="space-y-4">
        <label htmlFor="pack-email">Email address</label>
        <input className="pack-input" id="pack-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} disabled={status === "pending"} />
        <label className="pack-consent"><input type="checkbox" checked={consent} required onChange={e => setConsent(e.target.checked)} disabled={status === "pending"} /><span>{PACK_EMAIL_CONSENT}</span></label>
        <button className="ic-btn-primary" disabled={status === "pending"}>{status === "pending" ? "Submitting…" : packCta[variant]}</button>
        {error && <p id="pack-email-error" role="alert">{error} <Link href="/contact">Get help</Link></p>}
        <p className="text-sm">Email delivery is handled by {providerName}. Confirm the email before the sequence begins. No ongoing newsletter is included. <Link href="/privacy">Privacy details</Link>.</p>
      </form> : <p>Email delivery is not enabled yet. The complete pack is available below, without an email address or account.</p>}
      <a className="ic-btn-ghost" href={FREE_PACK_DOWNLOAD} download onClick={() => track("pack_download")}>Download the free pack</a>
      <p className="text-sm">Opens as a standalone HTML worksheet. Print it or use your browser’s “Save as PDF”. No entries are sent to Iron Compass.</p>
    </section>
    <section className="ic-panel-outline space-y-4" aria-labelledby="pack-next-heading">
      <h2 id="pack-next-heading" className="ic-section-heading">Choose what would help next</h2>
      <label htmlFor="pack-topic">What do you want to practise?</label>
      <select className="pack-input" id="pack-topic" value={topic} onChange={e => setTopic(e.target.value as keyof typeof freeRecommendations)}>{Object.entries(freeRecommendations).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}</select>
      <p>Your choice stays in this page. It is not added to an email profile.</p>
      <div aria-live="polite"><h3>{recommendation.title}</h3><p>{recommendation.copy}</p><Link href={recommendation.href} className="ic-btn-ghost" onClick={() => track("pack_guide_open")}>Use the free guide</Link></div>
      <p>If a daily place for your record would help, explore the app before deciding.</p>
      <Link href="/download" onClick={() => track("pack_app_open")} className="ic-btn-primary">Explore the app</Link>
    </section>
    <section className="ic-panel-muted space-y-3" aria-label="Optional measurement">
      <h2 className="ic-section-heading">Optional measurement</h2>
      <p>Help us compare two versions of the pack’s email button. With your permission, Google Analytics receives this page’s fixed address, the button version and actions such as download or app-link clicks. It does not receive your email, worksheet answers or guide preference. Google also processes technical connection information. Email consent is separate.</p>
      {measurementAvailable ? measurement ? <button type="button" className="ic-btn-ghost" onClick={stopMeasurement}>Stop measurement</button> : <button type="button" className="ic-btn-ghost" onClick={allowMeasurement}>Allow optional measurement</button> : <p>Measurement is not enabled. No analytics script is loaded by this page.</p>}
    </section>
  </>;
}
