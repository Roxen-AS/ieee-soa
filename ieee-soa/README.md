# IEEE SOA Student Branch — Website

## Quick Start

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## EmailJS Setup (Contact Form)

The contact form sends submissions directly to your email via EmailJS — no backend needed.

### Step 1 — Create EmailJS account
Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up (free tier: 200 emails/month).

### Step 2 — Create a Service
- Dashboard → Email Services → Add New Service
- Connect your Gmail / Outlook
- Note down the **Service ID**

### Step 3 — Create a Template
- Dashboard → Email Templates → Create New Template
- Use these variables in your template:
  ```
  From: {{from_name}} <{{reply_to}}>
  Enrollment: {{enrollment}}
  Branch: {{branch}}  |  Year: {{year}}
  Phone: {{phone}}
  Message: {{message}}
  ```
- Note down the **Template ID**

### Step 4 — Get your Public Key
- Dashboard → Account → General → Public Key

### Step 5 — Add keys to project
Copy `.env.local.example` to `.env.local` and fill in your keys:
```bash
cp .env.local.example .env.local
```
Then edit `.env.local`:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

---

## Adding Logos

Logos are already included in `/public/logos/`:
- `sb_black.png` — SB logo (shown in dark mode)
- `sb_white.png` — SB logo (shown in light mode)
- `cs_black.png` — CS logo (shown in dark mode, CS page)
- `cs_white.png` — CS logo (shown in light mode, CS page)

The `.logo-dark` / `.logo-light` CSS classes handle switching automatically.

---

## Adding Team Photos

1. Drop photos into `/public/team/` — square images, min 200×200px.
   Naming: `firstname-lastname.jpg`

2. In `lib/data.ts`, update `photo: null` to `photo: "/team/firstname-lastname.jpg"`

3. In `components/UI.tsx`, the `TeamCard` component already handles `member.photo` —
   if it's set, it renders the `<img>` tag. No other changes needed.

---

## Updating Content

Everything lives in **`lib/data.ts`** — edit only this file for:
- Site name, email, location, branch number
- Domain/discipline cards (6 items)
- Events list
- SB Team members (9 cards)
- CS Team members (9 cards)
- CS mandate cards

---

## Project Structure

```
ieee-soa/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── events/page.tsx
│   ├── cs/page.tsx
│   ├── team/page.tsx
│   └── contact/page.tsx    # EmailJS wired
│
├── components/
│   ├── BackgroundCanvas.tsx  # 5-layer animated canvas
│   ├── Cursor.tsx            # Custom cursor + ring
│   ├── Loader.tsx            # 3D sphere splash screen
│   ├── Navbar.tsx            # Top bar + always-dark floating pill
│   └── UI.tsx                # SectionHeader, DomainCard, TeamCard,
│                             #   Ticker, Footer, Toast
│
├── hooks/useReveal.ts        # Scroll reveal hook
├── lib/data.ts               # ALL content — edit here
├── public/logos/             # sb_black/white, cs_black/white PNGs
├── public/team/              # Drop team photos here
├── styles/globals.css        # Design tokens + animations
├── .env.local.example        # Copy → .env.local, fill EmailJS keys
└── README.md
```

---

## Deployment (Vercel)

```bash
# Push to GitHub, connect at vercel.com — zero config
# Add env vars in Vercel dashboard under Settings → Environment Variables
```

Or manually:
```bash
npm run build && npm run start
```

---

## Design Tokens

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#04060B` | `#F0F4FF` |
| `--ink` | `#F2F0FF` | `#0A0E1A` |
| `--a1` | `#C8FF00` | `#2E7D00` |
| `--a2` | `#FF2D55` | `#CC0033` |
| `--a3` | `#00D4FF` | `#0055AA` |
| `--a4` | `#9B5FFF` | `#5B16C8` |

**Fonts:** Oxanium (display) · Space Mono (labels) · Rajdhani (body)

**Nav pill:** Always dark (`rgba(10,12,20,0.88)`) in both modes — intentional.
