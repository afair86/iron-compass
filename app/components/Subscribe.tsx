import EmailCaptureForm from "./EmailCaptureForm";

export default function Subscribe() {
  return (
    <section className="px-4 pb-20">
      <div className="ic-philosophy-card max-w-4xl mx-auto text-center space-y-6">
        <h2 className="ic-home-heading text-[clamp(1.8rem,3vw,2.6rem)]">Join The 7-Day Discipline Challenge</h2>
        <p className="text-lg max-w-2xl mx-auto">Weekly signal. Tactical training. Ironclad accountability.</p>
        <div className="ic-neon-divider" />
        <div className="w-full max-w-2xl mx-auto">
          <EmailCaptureForm />
        </div>
        <p className="text-sm text-[var(--ic-text-muted)]">Zero fluff. All force.</p>
      </div>
    </section>
  );
}
