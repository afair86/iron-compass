type FormRecoveryNoticeProps = {
  id: string;
  error: string;
  kind: "contact" | "signup";
};

/** A failed acknowledgement is not proof of delivery or non-delivery. Never retry automatically. */
export default function FormRecoveryNotice({ id, error, kind }: FormRecoveryNoticeProps) {
  return (
    <div className="space-y-3 text-left">
      <p id={id} role="alert" className="text-sm text-red-300">
        {error}{" "}
        {kind === "contact"
          ? "Your details are still here. Review them before trying again."
          : "Your email is still here. You can review it and try again when ready."}
      </p>
      <a
        className="ic-btn-ghost"
        href={kind === "contact" ? "mailto:adam.fairclough86@gmail.com" : "/contact"}
      >
        {kind === "contact" ? "Email us instead" : "Get help"}
      </a>
    </div>
  );
}
