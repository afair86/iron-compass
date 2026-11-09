# Free website-to-subscription measurement plan

6 November 2026. Owner confirmed there is no existing website analytics setup and requested a free plan. This document is a plan, not installed tracking. No analytics account, paid service, cookie, collection endpoint or third-party script was added by the optimisation work.

## Recommendation

Use one owner-controlled **Google Analytics 4 Standard** property for the website and web app, with a small direct integration rather than a tag-manager stack. Google describes the standard tools as [free of charge](https://marketingplatform.google.com/about/analytics/). Estimated licence cost: **$0/month**; no Analytics 360, advertising, session replay, paid dashboard or data warehouse is needed. Account setup and implementation are separate from this UI preview. Allow roughly half a day for website-only setup and one further day for verified app/signup/payment integration and QA, depending on existing provider hooks.

Why this rather than automatically enabling Vercel Analytics: the website currently has no tracker to reuse. Vercel's [custom events require Pro/Enterprise](https://vercel.com/docs/analytics/custom-events), and its [event-based billing](https://vercel.com/docs/analytics/limits-and-pricing) can add usage cost. Page views alone cannot measure app subscriptions. This is not a recommendation to change hosting or add a second analytics platform.

## Minimal funnel and event contract

| Event | Exact trigger | Allowed context | Source of truth |
| --- | --- | --- | --- |
| page_view | First view and genuine client route change, once each | Normalised public pathname; allowlisted campaign source/medium/campaign | Website/web app |
| view_app_screen | A user opens an app-example dialog | Fixed feature slug; public page group | Website |
| app_open | User activates an app/signup/plan link | Fixed CTA placement and destination category; plan enum if present | Website; intent only |
| sign_up | Account creation succeeds | Registration method only | App's successful registration response; never a Start free click |
| begin_checkout | A real checkout session opens | Free/Core/Elite enum, month/year interval | App/payment integration; never pricing-page view |
| purchase | Provider-confirmed successful subscription payment | Unique transaction reference, currency, paid value and plan | Verified Stripe/RevenueCat/provider path, with transaction deduplication |

Use Google's [recommended sign_up, begin_checkout and purchase definitions](https://support.google.com/analytics/answer/9267735). Do not count trial starts, returning-member logins, website clicks or failed payments as paid subscriptions. Separate first subscription payments from renewals in the report. Native-app attribution and cross-device identity need separate evidence; do not infer them from website clicks.

## Collection boundaries

- Start with consent-controlled measurement, advertising/personalisation disabled. Explain the exact provider, data and controls in the privacy policy before activation. Do not send analytics when opted out or where policy requires opt-in and it has not been given. This is a product design boundary, not a completed legal assessment.
- Send **no names, email addresses, account identifiers, journal text, tool answers, health/financial inputs, form contents or full URLs/query strings**. Public blog/domain paths can reveal sensitive interests: use allowlisted page groups for those pages rather than article titles or slugs in automatic collection. Normalise page_location and page_referrer before sending so automatic defaults do not leak raw paths or queries. Do not enable automatic form, site-search, outbound-link or advertising collection without reviewing its payload.
- Keep one web stream across the website and same-origin /app; configure it once in each application and verify single page views across navigation. Do not add attribution tokens or member identifiers to public links. Payment-provider cross-domain attribution must be separately configured and tested.
- Keep actual billing and account records as the source of truth. Analytics will undercount people who decline tracking or block scripts; document the denominator as measured/consenting visits. Analytics attribution is not an exact accounting ledger.

## First report and deployment gate

Report weekly: measured public visits → app_open → successful sign_up → first paid subscription, split by mobile/desktop, campaign and CTA placement. Show absolute counts as well as rates, plus screenshot-view engagement. Report cost per new paying subscriber only after advertising spend and billing totals reconcile; do not invent lifetime value or ROI.

Validate in a test property with synthetic activity: one click produces one intent event; registration failure produces no sign_up; test payment produces one purchase despite webhook retry; navigating between site and app preserves the intended journey; opting out stops collection; no sensitive values appear in payloads. Preview traffic should use a test stream or be excluded. Mark sign_up and first purchase as key events only after these checks.

Observe at least two weeks before deciding what to change. That provides a starting pattern, not automatic statistical significance. Low traffic needs longer observation. Start with one reversible experiment based on the largest observed drop-off; do not add an A/B platform or claim a conversion improvement from this preview alone.

Next action: owner creates/selects the free GA4 property and public measurement ID, then authorises the separately scoped website/app measurement integration. No private credentials are needed in chat.
