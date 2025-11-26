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
   - Environment Variables: (add if needed)

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
