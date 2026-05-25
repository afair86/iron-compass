# Iron Compass Deployment Instructions

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
