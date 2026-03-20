# IEEE SOA Student Branch — Website

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (available for extended animations)
- **Custom Canvas** — 5-layer animated background (nebula aurora, cursor aurora, warped grid, particle network, math glyphs)

---

## Adding Logos

Replace the placeholder divs in these files with actual `<Image>` tags:

### Navbar (`components/Navbar.tsx`)
```tsx
// Find the comment block and replace with:
<Image
  src="/logos/sb.png"
  alt="IEEE SOA SB"
  width={120}
  height={36}
  className="logo-blend"
/>
```

### Loader (`components/Loader.tsx`)
```tsx
<Image src="/logos/sb.png" className="logo-blend" width={22} height={22} alt="SB" />
<Image src="/logos/cs.png" className="logo-blend" width={22} height={22} alt="CS" />
```

### CS Page (`app/cs/page.tsx`)
```tsx
<Image src="/logos/cs.png" alt="IEEE CS" width={80} height={80} className="logo-blend" />
```

Place your logo files in `/public/logos/`:
- `sb.png` — Student Branch logo
- `cs.png` — Computer Society logo

The `.logo-blend` CSS class applies `mix-blend-mode: screen` + radial mask to dissolve the white background into the dark site.

---

## Adding Team Photos

1. Place member photos in `/public/team/` (e.g. `aryan-chopra.jpg`)
2. Open `lib/data.ts`
3. Find the `SB_TEAM` or `CS_TEAM` array
4. Change `photo: null` to `photo: "/team/aryan-chopra.jpg"` for the relevant member
5. In `components/TeamCard.tsx`, uncomment the `<Image>` tag and remove the `<span>` fallback

---

## Updating Content

All site content lives in **`lib/data.ts`** — edit that single file to update:

- Site name, email, location, branch number
- Domain/discipline cards
- Events (add new ones to the `EVENTS` array)
- Team members (SB + CS)
- CS chapter mandate cards
- Focus areas list

---

## Project Structure

```
ieee-soa/
├── app/
│   ├── layout.tsx          # Root layout — fonts, cursor, bg canvas, navbar
│   ├── page.tsx            # Home page (hero + domain grid)
│   ├── about/page.tsx      # About page
│   ├── events/page.tsx     # Events page
│   ├── cs/page.tsx         # CS Chapter page
│   ├── team/page.tsx       # Team page (SB / CS tabs)
│   └── contact/page.tsx    # Contact form
├── components/
│   ├── BackgroundCanvas.tsx  # 5-layer animated canvas (runs on every page)
│   ├── Cursor.tsx            # Custom cursor + lagged ring
│   ├── Loader.tsx            # Animated splash screen
│   ├── Navbar.tsx            # Sticky navigation
│   ├── Ticker.tsx            # Scrolling marquee
│   ├── Footer.tsx            # Footer
│   ├── Toast.tsx             # Toast notifications
│   ├── SectionHeader.tsx     # Reusable section header with glitch effect
│   ├── DomainCard.tsx        # Discipline/domain cards
│   └── TeamCard.tsx          # Team member cards
├── hooks/
│   └── useReveal.ts          # Scroll-triggered reveal hook
├── lib/
│   └── data.ts               # ALL site content — edit here
├── public/
│   ├── logos/                # Drop sb.png and cs.png here
│   └── team/                 # Drop member photos here
└── styles/
    └── globals.css           # Design tokens, animations, global styles
```

---

## Deployment

```bash
npm run build
npm run start
```

Or deploy to **Vercel** — zero config, just connect the repo.

---

## Design System

| Token | Value |
|---|---|
| `--bg` | `#04060B` (void black) |
| `--ink` | `#F2F0FF` (off-white) |
| `--a1` | `#C8FF00` (acid yellow — primary accent) |
| `--a2` | `#FF2D55` (red — hackathon / danger) |
| `--a3` | `#00D4FF` (cyan — CS / info) |
| `--a4` | `#9B5FFF` (violet — competition / accent) |

Fonts: **Oxanium** (display) · **Space Mono** (labels/mono) · **Rajdhani** (body)
