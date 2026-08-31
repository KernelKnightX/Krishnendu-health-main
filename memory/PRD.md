# Krishnendu Healthcare Private Limited (KHPL) — Website PRD

## Original Problem Statement
Corporate website for Krishnendu Healthcare Private Limited, an Indian contract/private-label manufacturer of wet wipes, personal hygiene and pet care products. 9 pages: Home, About Us, Capabilities, Services (overview), Wipes, Personal Hygiene, Pet Care, Careers, Contact Us. Services is a navbar dropdown (Wipes / Personal Hygiene / Pet Care) plus an overview page with 3 sections linking to each. Top reference: swarababy.com. Pending real data (mission/vision/values, brand story, product lists, factory photos/videos, footer data) — placeholder reference content used for now.

## User Personas
- B2B brand owners looking for a private-label manufacturing partner
- Job seekers applying via the Careers page
- General visitors researching the company

## Architecture
- Frontend-only React app (per user decision Aug 2026 — no backend yet; forms are simulated with success toasts)
- React 19 + react-router-dom 7, Tailwind + shadcn/ui, framer-motion (reveals/parallax), lenis (smooth scroll)
- Design: white canvas + brand orange #F26522, Cabinet Grotesk (display) + Manrope (body), editorial/award-style layout, kinetic masked hero, certifications marquee, bento category grid, orange footer
- Logo: user-uploaded orange logo used as-is in navbar/footer/favicon
- Routes: /, /about, /capabilities, /services, /services/wipes, /services/personal-hygiene, /services/pet-care, /careers, /contact

## Implemented (2026-08-19)
- All 9 pages with content from the user's KHPL WEB.docx brief
- Sticky glass navbar with Services dropdown + email/phone CTAs; mobile menu
- Home: kinetic hero with parallax image, certifications marquee, about teaser, 4-category bento, mission/vision/values manifesto, capabilities rows, CTA band
- About: brand story (placeholder), 8 facility feature cards, image strip
- Capabilities: 4 pillars, quality products grid, assurance & expertise rows, certifications
- Services overview + 3 dedicated service pages with product ranges (placeholder lists)
- Careers: general application form (frontend-only, MOCKED submit)
- Contact: info cards + inquiry form (frontend-only, MOCKED submit)
- Placeholder contact data: hello@krishnenduhealthcare.com, +91 98260 00000, Pithampur MP address

## Updates (2026-08-19, iteration 2)
- Floating WhatsApp chat button added site-wide (wa.me link with prefilled message, placeholder number)
- Inner-page hero headings changed to single-line format (About, Capabilities, Services, Wipes, Hygiene, Pet Care, Careers, Contact); hero subtext widened to max-w-4xl

## Updates (iteration 3)
- Home rebuilt swarababy.com-style: full-screen (100vh) autoplay hero slider with 3 images + 1 video (factory production line, self-hosted at /public/videos/facility-line.mp4, Mixkit free license), short captions per slide, slide indicators, no long text on hero
- Certificates scrolling strip added right below hero (FDA, Sedex, ISO 9001:2015, GMP, Micro & QC Labs, CDSCO, Skin-Safe, Export Ready badge cards, auto-scroll marquee)
- Navbar switches to white text over the dark home hero, dark text after scroll
- Hero stats moved into the "Who we are" section
- NOTE: test sandbox browser lacks H.264 codecs so video playback could not be visually verified there; file serves correctly with video/mp4 + range support and has a poster fallback

## Updates (iteration 4)
- Home animations upgraded: count-up stats (04 / 100% / 20+ brand partners / 24x7), parallax + scale-reveal images in Who We Are, manifesto and capability rows slide in from the left, hover states added
- About Us: dedicated "Our Clients" section — scrolling marquee of parent companies + 20 numbered client tiles (Supples/Solimo/Presto/Mamabear-Amazon, Miss n Chief-Flipkart, CIR-Piramal, Baby Hug-FirstCry, Pigeon, BonnyBoo-Medplus, Cuddle-Swara, Yellow Hippo-Vishal, Juniorrs, Iksu, Morrison, Shills, Glam 21, Bumtum, Mothercare-Reliance, Tuco, Bodyguard-Sirona)
- REAL product lists integrated: Wipes page (14 wipe/towel SKUs), Personal Hygiene page (11 Baby Care + 21 Adult Care numbered lists), Pet Care page (5 SKUs)

## Updates (iteration 5)
- Final copy written by agent: mission/vision/values (home manifesto) and 3-paragraph brand story (About) — Pithampur, MP location referenced
- User-uploaded cleanroom lab photo (DSC01509.webp) placed as the large image in Home "01 — Who we are"
- Contact page: Google Maps embed (Pithampur, MP) added; Footer: LinkedIn + WhatsApp social icons
- Google Drive folder (FINAL VIDEO CLIPS, ~50 factory shoot MP4s) integrated: downloaded 5 clips (production room wideshot, packing machine, QC lab, micro lab, team outro), compressed with static ffmpeg (ARM64 build at /app/ffmpeg-static — pod wipes /usr on restart!) to 2-4MB web mp4s in /public/videos/, extracted 5 stills to /public/images/factory/
- Hero slider now uses REAL factory media: 3 video slides (prod-wide, machine-packing, team-outro) + 1 QC lab still; About story/strip and Careers photos now use real factory stills; Capabilities page has a micro-lab video strip
- Static ffmpeg note: apt installs do NOT persist (pod restarts wipe system dirs) — always use /app/ffmpeg-static/bin/ffmpeg
- Remaining Drive clips (~45 more: drone, logo zoom, stamp, mixing, EDI RO, loading dock etc.) available for future gallery/video sections

## Updates (iteration 6)
- Home hero slide 3 changed to "truck entering" clip (caption: From Our Gates to Your Shelves) — hero is now 4 real factory videos
- About Us: new "05 — Facility Tour" video gallery with 3 real clips (drone aerial, mixing & formulation, EDI RO water system), compressed to ~2-6MB web mp4s
- Cookie consent banner added (bottom-left card, Accept/Decline, persists choice in localStorage key khpl_cookie_consent)

## Updates (iteration 7)
- Privacy Policy page added at /privacy-policy (6 sections: collection, use, cookies, third-party, security, rights + contact card), linked from cookie banner "Learn more" and footer Quick Links. Site is now 10 pages.

## Updates (iteration 8)
- Complete frontend-only Admin Console at /admin (dark sidebar layout, separate from public site chrome):
  - /admin/login — mock auth (admin@krishnenduhealthcare.com / KHPLadmin@2026, session in localStorage)
  - Dashboard — stat cards (enquiries, applications, products, clients) + recent enquiries
  - Enquiries inbox — Contact form submissions persist via localStorage and appear instantly; view dialog, status (New/In Progress/Closed), delete
  - Applications inbox — Careers form submissions; status (New/Shortlisted/Rejected), delete
  - Products manager — 51 seeded SKUs across Wipes/Baby/Adult/Pet, category filters, add/delete
  - Clients manager — 20 seeded clients, add/delete
  - Settings — public email/phone/WhatsApp/address editor (localStorage until backend)
- Public Contact + Careers forms now write to localStorage store (src/lib/store.js) so admin inboxes show real submissions
- App restructured with PublicLayout (navbar/footer/WhatsApp/cookies) vs admin routes without public chrome

## Updates (iteration 9)
- Brand intro splash: LOGO ZOOM drone clip trimmed to final 7.5s logo reveal (/videos/logo-intro.mp4, 1.9MB), plays full-screen on first homepage load per session (sessionStorage khpl_intro_seen), Skip Intro button, fades out
- Admin Content Manager at /admin/content: edit all 4 hero slides (caption, media URL, poster URL, video/image type), mission/vision/values text, and 3 brand-story paragraphs — saved to localStorage (khpl_content), public Home + About pages read from the content store (getContent in src/lib/store.js) so edits go live on next page load

## Backlog (pending from user)
- P0: Real mission/vision/values copy; brand story; product lists; factory photos/videos (shoot on Tuesday); footer data
- P0: Backend for contact + career forms (user said "will let u know later") — DB storage and/or email delivery (Resend)
- P1: Hero video once factory footage arrives; certificate badge images
- P2: News/blogs section like swarababy; SEO audit; WhatsApp chat link

## Next Tasks
1. Swap placeholder copy/images when user sends real data
2. Wire forms to FastAPI + MongoDB (+ optional email) when backend is approved
