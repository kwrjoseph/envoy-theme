# Envoy Medical — HubSpot CMS Theme Project

## Project Overview
Building and maintaining HubSpot CMS theme and pages for Envoy Medical (hearing device company). The project consists of static HTML templates being converted to a HubSpot CMS theme with modules and templates.

## HubSpot Account
- **Account ID:** 4188804
- **Account Name:** envoy-medical
- **Sandbox URL:** https://www-envoymedical-com.sandbox.hs-sites.com/
- **Live Site:** https://www.envoymedical.com
- **GitHub Repo:** https://github.com/kwrjoseph/envoy-theme.git

## Repository Structure
```
envoy/                          ← Git root (main branch)
├── .claude/                    ← Claude workspace config
├── .git/
├── .gitignore
├── CLAUDE.md                   ← HubSpot CMS build guide (reference doc)
├── config.json                 ← Project config
├── setup.sh                    ← Setup script
├── src/                        ← Static HTML templates (was envoy-2026)
│   ├── advocacy.html           ← Advocacy page (interactive tracker, latest version)
│   ├── header.html             ← Main header with mega menu
│   ├── footer.html             ← Main footer
│   ├── landing-header.html     ← Landing page header
│   ├── landing-footer.html     ← Landing page footer
│   ├── about.html
│   ├── contact.html
│   ├── careers.html
│   ├── esteem.html
│   ├── cochlear-implants.html
│   ├── hearing-loss.html
│   ├── ... (30+ template files)
│   ├── modules/                ← Empty (modules not yet built)
│   └── exmaple/                ← Example/reference files
├── envoy-theme/                ← HubSpot CMS theme (in progress)
└── envoy-back-up-old/          ← Old theme backup
```

## HubSpot CLI
- **Global install path:** `/Users/kjoseph/.npm-global/bin/hs`
- **Version:** @hubspot/cli@8.1.0
- **Usage:** `/Users/kjoseph/.npm-global/bin/hs cms upload <local> <remote> --account=4188804`
- The `hs` command is NOT in PATH — must use full path or `npx`

### Common Commands
```bash
# Upload single file
/Users/kjoseph/.npm-global/bin/hs cms upload src/advocacy.html advocacy.html --account=4188804

# Upload entire theme
/Users/kjoseph/.npm-global/bin/hs cms upload envoy-theme envoy-theme --account=4188804

# Watch mode
/Users/kjoseph/.npm-global/bin/hs watch --account=4188804 envoy-theme envoy-theme
```

## Brand Guidelines

### Colors
- **Brand Navy:** `#002d74` (primary, headings, buttons, CTAs)
- **Brand Grey:** `#53575a` (body text — NOT black, NOT #0f172a)
- **Light Blue:** `#f0f7ff` (backgrounds)
- **Accent:** `#0056b3`

### Typography
- **Font:** Inter (Google Fonts) — weights 300-900
- **Headings:** font-weight 800-900, color `#53575a`
- **Body:** color `#53575a`

### Design Patterns
- Rounded corners (2rem-3.5rem for cards, 9999px for buttons/pills)
- Subtle hover animations (translateY, box-shadow)
- Dark navy gradient sections for hero/featured areas
- Dot pattern overlays on dark backgrounds

## Advocacy Page (src/advocacy.html)
The most complex page — key features:

### Interactive Legislative Progress Tracker
- Tracks H.R. 1921 / S. 983 (Hearing Device Coverage Clarification Act)
- 5-step chevron timeline: Introduced → Passed by House → Passed by Senate → Passed by President → Becomes Law
- Currently at "Introduced" stage (first chevron active with glow animation)
- CSS `clip-path: polygon()` for chevron shapes
- Mobile: switches to vertical dot timeline at 768px
- `IntersectionObserver` for scroll-triggered stagger animations
- Date callouts: March 6 2025 (House) and March 13 2025 (Senate)

### PDF Downloads
- Uses `fetch` → `blob` → `URL.createObjectURL` for forced downloads
- Fallback: `<a download>` attribute for same-origin files
- PDF paths use relative `/hubfs/Advocacy/...` on HubSpot

### Key URLs
- **Advocacy form (shared):** `https://2hs3o.share.hsforms.com/27x4ZrzEJTfKmSwjm86rjQg`
- **Embedded form:** portalId `4188804`, formId `ef1e19af-3109-4df2-a64b-08e6f3aae342`
- **H.R. 1921:** `https://www.congress.gov/bill/119th-congress/house-bill/1921`
- **S. 983:** `https://www.congress.gov/bill/119th-congress/senate-bill/983`

### CSS Prefixing
- All custom classes use `adv-` prefix to avoid conflicts with existing site CSS
- Feature cards use z-index management (1 default, 10 on hover) to fix overlap

## Tech Stack
- **Tailwind CSS** (CDN) for layout/spacing in templates
- **Font Awesome 5.15.4** (CDN) for icons — FA5 because live site uses "Font Awesome 5 Pro"
- **Inter font** (Google Fonts)
- **Vanilla JavaScript** for interactions
- **HubSpot Forms** embed for lead capture

## File Paths on HubSpot CDN
- Pattern: `https://4188804.fs1.hubspotusercontent-na1.net/hubfs/4188804/...`
- Relative (same-origin): `/hubfs/Advocacy/...`
- PDFs:
  - `/hubfs/Advocacy/Sample%20Letter%20Template%20-%20Advocacy%20021726F.pdf`
  - `/hubfs/Advocacy/Call%20Script%20to%20Congressmans%20office%20Final%20021726.pdf`

## Known Issues & Fixes
1. **Font Awesome icons not showing:** Add FA5 CDN link explicitly — HubSpot body override modules don't always load FA
2. **Card hover overlap:** Use `position: relative; z-index: 1` default, `z-index: 10` on hover
3. **PDF opens in new tab instead of downloading:** Use fetch→blob→createObjectURL, not `window.open()`
4. **`hs` not found:** Use full path `/Users/kjoseph/.npm-global/bin/hs`
5. **Reserved field name "label":** Never use `"name": "label"` in HubSpot fields.json
6. **`{% icon %}` tag errors:** Use `<i class="fas fa-name">` instead

## HubSpot CMS Reference
The full HubSpot CMS build guide (module structure, field types, HubL syntax, template patterns, upload commands) is in `/CLAUDE.md` at the project root.
