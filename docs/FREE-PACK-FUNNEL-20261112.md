# Free pack, starter sequence and conversion experiment

Owner scope12November2026: use free complementary guides or develop a free pack to earn voluntary email subscriptions. No new paid standalone product, price or app/billing change. Owner confirmed no sending account or verified domain sender exists. Therefore live sending, real opt-in collection and analytics activation are pending; code and fixtures do not prove a working provider account.

## What is built

`/free-pack` contains a complete seven-day follow-through worksheet, standalone offline HTML download, optional separate email consent and reader-selected free-guide recommendations. Pack works without email, analytics or an app account. The recommendation choice stays in the browser, is not recorded in a contact profile and is not included in analytics. Existing public guides remain open. Footer adds one resource link; approved homepage structure/design remain.

The four actual message drafts are `packCampaign` in `lib/freePack.ts`: welcome after confirmation, difficult-day plan on day2, weekly review on day5 and next-step/free app overview on day8. Sequence then stops. No ongoing newsletter, discounts, fabricated urgency, testimonials, purchased list or automatic re-subscription. `duePackMessages` is an executable policy used in suppression/deduplication tests; it is not itself a deployed scheduler.

## Email integration and provider setup

The website already has a Resend contact adapter, but production has no sending credentials configured. [Resend](https://resend.com/pricing) is a candidate for the initial free-tier setup, not a provisioned account. Its [native automations](https://resend.com/features/automations/) can own durable sequence state and waits. Confirm actual account limits, sender DNS, consent/unsubscribe behaviour and overage controls before choosing/activating. Starter cost target$0 within verified account limits; no paid plan or automatic overage authorised. No second analytics platform or new database introduced. GA4 Standard follows the existing free measurement plan.

`growth/free-pack-flow.json` is an explicitly disabled provider-neutral implementation blueprint, **not** a Resend-importable automation or an active campaign. A tested provider-owned workflow/adapter still needs configuring once the sending account exists. Do not silently replace this with a process-memory queue, temporary Vercel files, app DB access or a new paid automation service.

`POST /api/free-pack` is disabled unless the explicit campaign flag, HTTPS webhook,32+character secret and verification record are set. It preserves the existing subscribe/contact routes. It validates same-origin bounded JSON, email, explicit versioned consent and allowlisted variant. Server timestamps the exact consent copy and signs timestamp+body with HMAC-SHA256. Stable HMAC idempotency key covers recipient+pack, without putting email in a URL or log. Timeout8s, no redirected provider calls or automatic retries. Only matching `{ok:true, requestId:<same>, status:"confirmation_pending"}` produces a success state. That means a queued confirmation, not confirmed subscription or actual delivery.

Receiving adapter requirements: verify signature constant-time and reject timestamps older than5minutes; enforce edge rate limits/abuse controls; atomically durably deduplicate the key before saving consent/queuing confirmation; never send notes before explicit confirmation; preserve unsubscribes/bounces/complaints and check current state after every wait; atomically reserve each send to prevent duplicate workers; return the strict acknowledgement only after durable persistence. Do not reactivate previously suppressed recipients. Stop on partial/unknown provider results. A retry must recover the same saved request, not create another enrollment. These provider-side requirements are **activation blockers**, not claimed complete by the HTTP adapter.

Every message needs accurate sender identity/contact and a working visible unsubscribe. Suppress immediately on request, including waiting messages. Do not require an account login. Follow [ACMA consent, identification and unsubscribe guidance](https://www.acma.gov.au/avoid-sending-spam); legal applicability review and provider acceptance remain activation work. No email/contact identity is invented. No actual recipient, DNS record, private credential or member data is touched in tests.

## One bounded conversion experiment

Experiment `pack-cta-v1`: control “Email me the free pack”; variant “Start my seven-day practice”. Everything else, including consent and pack access, stays the same. Default off. Eligible audience is pack-page visitors who explicitly allow optional measurement; conclusions apply to that consenting audience only. Opt-out visitors get control and no analytics requests. Session assignment uses cryptographic randomness after consent, with sessionStorage when available and no fingerprint. One experiment at a time.

Primary metric: **sessions with a provider-accepted pack request / exposed consenting sessions**, deduplicated by session in GA4 exploration—not raw event counts. Secondary: pack download, free-guide click and app-overview click. Accepted request is not confirmed email, app registration, checkout or payment. Confirmed opt-in counts come from provider confirmation records by variant; app signup/first paid subscription need a separately owned, server-confirmed app/payment event integration. Do not claim this website branch measures subscription revenue.

`NEXT_PUBLIC_PACK_GA4_ID` and explicit visitor choice are both required before the Google tag loads. Disable Enhanced Measurement, advertising/signals, automatic form/outbound/search events and provider email open/click tracking in account setup. Event payloads carry only a fixed pack URL, fixed event/experiment and button variant—no email, free-text input, guide preference or raw query/referrer. Browser payload inspection and consent withdrawal must pass in the actual test property before activation. Privacy notice scopes this new optional collection; GA4 account retention/access settings still need review.

Use a minimum14-day fixed observation window and a sample-size calculation based on the measured baseline and chosen meaningful difference before starting. Do not infer significance from14days or declare a winner from a handful of requests. Export deduplicated sessions, accepted requests, confirmed opt-ins, errors and unsubscribe rates. If traffic is too low, keep the simpler version and run a sequential usability improvement instead of pretending a test is conclusive. Stop on opt-out leakage, provider errors, complaints, accessibility regressions or contradictory acknowledgement.

## Activation order

1. Owner-controlled free-tier sending account; review terms through normal authorised setup; verify domain/sender and contact identity without sharing keys in chat.
2. Configure provider-owned confirmation/sequence/suppression/idempotency and sending caps; import reviewed message text with real sender/unsubscribe fields. Send only to an authorised test inbox first.
3. Create/select the free GA4 property/test stream and inspect exact event payloads and consent withdrawal. Complete provider/retention disclosure. Confirm app-team handoff if paid conversion measurement is needed.
4. Stage/test website and actual provider end to end, record rollback/stop controls, then obtain applicable production/send activation approval. Do not enable flags merely because local fixtures pass.

Rollback: turn campaign flag off and stop the provider workflow; disable experiment/measurement flags; preserve suppression records. Existing pack remains usable. Production stays unchanged until release approval.
