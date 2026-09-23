# Iron Compass brand mark (approved)

Canonical compass mark for **website** (`iron-compass`) and **product app** (`iron-compass-ai`).

## Files

| Path | Use |
|------|-----|
| `brand/iron-compass-mark-source.png` | Full square source (black field) |
| `brand/iron-compass-mark.png` | Transparent mark for reuse |
| `public/iron-compass-logo-icon.png` | Website header mark |
| `public/iron-compass-logo.png` | General lockup/mark |
| `public/iron-compass-logo-og.png` | Open Graph / social |
| `app/icon.png` | Favicon / app icon |

App UI renders the **full-color** PNG in the header and `CompassMark` (no CSS mask — that strips metal/blue glow).

## Apply / refresh assets

From the website repo:

```bash
node scripts/apply-brand-mark.mjs
# or with a new source file:
node scripts/apply-brand-mark.mjs path/to/new-mark.png
```

## AI-generated photography (subtle branding)

From now on, blog / marketing AI images should include the compass **subtly** — not as a giant watermark.

Prefer one of:

- a small metallic compass mark on a notebook, mug, wall plaque, desk object, or pin
- a faint reflection or embossed detail in metal/leather
- soft out-of-focus background emblem

Avoid: huge glowing holograms, readable fake UI, covering faces, or stock “logo stamp” overlays.

See `content/blog/_standards/IRON-COMPASS-BLOG-EDITORIAL-AND-IMPLEMENTATION-GUIDE.md` (Imagery).
