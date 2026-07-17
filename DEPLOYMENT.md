# Iron Compass Deployment Instructions

## Product web app (`/app`)

The marketing site can serve the product PWA at **`/app`** by proxying to the APP frontend deployment.

1. Deploy APP `frontend/` per `C:\Users\adamf\APP\frontend\DEPLOY_WEB_APP.md`.
2. In **this** Vercel project → Environment Variables → Production:
   - `PRODUCT_APP_UPSTREAM_URL` = your APP Vercel URL (no trailing slash)
3. Redeploy marketing (`npm run deploy`).

Until step 2–3 are done, **Open App** links hit a 404. Optional: set `NEXT_PUBLIC_PRODUCT_APP_URL` to a live subdomain instead.

---

## Deploy from Cursor (agent) — one-time setup

So the AI can run **`npm run deploy`** from this repo without the Vercel dashboard:

1. **Create a Vercel token**  
   [vercel.com/account/tokens](https://vercel.com/account/tokens) → **Create** → name e.g. `Cursor iron-compass` → copy the token (shown once).

2. **Add it to `.env.local`** (gitignored — never commit):
   ```
   VERCEL_TOKEN=paste_your_token_here
   ```
   If `.env.local` does not exist, copy `.env.example` to `.env.local` first.

3. **Verify** (you or the agent):
   ```bash
   npm run deploy:check
   ```
   Should print `Deploy setup OK` and `Vercel project link: yes`.

4. **Deploy anytime**:
   ```bash
   npm run deploy
   ```
   This runs `npm run build`, then deploys to **production** on Vercel.

**Notes**

- The saved CLI login expired; `VERCEL_TOKEN` replaces `vercel login` for automation.
- **Paste the token only in `.env.local`** — not in Cursor chat (Vercel may revoke exposed tokens).
- Remove any old `VERCEL_OIDC_TOKEN` line from `.env.local`; it can block deploys.
- `npm run deploy` ships your **local files** (including uncommitted changes). To update GitHub too, commit and push separately.
- If deploy says the token is invalid, create a new token and update `.env.local`.

---

## Deploying to Vercel (Recommended)

1. **Push your code to GitHub, GitLab, or Bitbucket.**
   - Make sure your latest changes are committed and pushed.

2. **Go to [vercel.com/import](https://vercel.com/import) and import your repository.**
   - Select your repo and follow the prompts.
   - Vercel will auto-detect Next.js and Tailwind CSS.

3. **Configure Project Settings:**
   - Framework Preset: `Next.js`
   - Root Directory: `/` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
   - Environment Variables: see [Email capture](#email-capture-production) below

### Email capture (production)

Homepage and `/download` forms POST to `/api/subscribe`. Without at least one provider configured, submissions return **503**.

**Recommended: Resend audience** (built-in, no middleware)

1. Sign in at [resend.com](https://resend.com) and create an **Audience** (e.g. "Iron Compass Waitlist").
2. Copy the audience ID from the audience URL or settings.
3. Create an API key with **Audiences → Full access** (or full account key for simplicity).
4. In Vercel → Project → **Settings → Environment Variables**, add for **Production** (and Preview if you test there):

   | Name | Value |
   |------|--------|
   | `RESEND_API_KEY` | `re_...` |
   | `RESEND_AUDIENCE_ID` | audience UUID |

5. Redeploy. Test from `/download` — you should see a success message and the contact in Resend.

**Alternative: webhook** (ConvertKit, Beehiiv, Zapier, Make, etc.)

1. Create a webhook that accepts JSON POST with `{ email, source, subscribedAt }`.
2. Set only `SUBSCRIBE_WEBHOOK_URL` in Vercel (leave Resend vars empty).
3. Webhook takes priority if both are set.

**Local dev:** copy `.env.example` to `.env.local` and fill one provider. Restart `npm run dev` after changes.

**Optional app store links** (shown on `/download` when set):

- `NEXT_PUBLIC_IOS_APP_URL`
- `NEXT_PUBLIC_ANDROID_APP_URL`

4. **Click "Deploy".**
   - Vercel will build and deploy your site.
   - After deployment, your site will be live at a Vercel URL (e.g., `https://iron-compass.vercel.app`).

5. **(Optional) Set up a custom domain.**
   - In the Vercel dashboard, go to your project > Settings > Domains.
   - Add your custom domain and follow the DNS instructions.

---

## Local Production Build (for testing)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the app:
   ```bash
   npm run build
   ```
3. Start the production server:
   ```bash
   npm start
   ```
4. Visit [http://localhost:3000](http://localhost:3000) to verify.

---

## Notes
- The `vercel.json` file is included for custom routing and build configuration.
- All blog posts are in `/content/blog/` as MDX files.
- For other platforms (Netlify, etc.), see their Next.js deployment docs.

---

For any issues, check the Vercel build logs or Next.js documentation.
