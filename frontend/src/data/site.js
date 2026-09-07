export const LOGO_URL =
  "https://customer-assets-lqy194kg.emergentagent.net/job_a2bb8699-91f4-4b24-98c0-eb8c80b9210a/artifacts/5m3f9a8h_image.png";

export const SITE = {
  name: "Krishnendu Healthcare",
  fullName: "Krishnendu Healthcare Private Limited",
  email: "info@krishnenduhealthcare.com",
  phone: "+91 96694 23000",
  phoneHref: "tel:+919669423000",
  address:
    "Plot No. 77, Smart Industrial Park, near Natrip, Pithampur, Dist. Dhar 454774, (M.P.) India",
  hours: "Mon – Sat, 9:00 AM – 6:00 PM IST",
};

const HD = "/images/hd";
const DOC = "/images/doc";
const FACTORY = "/images/factory";

export const IMG = {
  wipes: `${HD}/baby-wipes.jpg`,
  hygiene: `${HD}/cosmetics-facial-wipes.png`,
  cosmetics: `${HD}/cosmetics-facial-wipes.png`,
  feminineCare: `${HD}/feminine-hygiene.jpg`,
  pet: `${HD}/pet-wipes.png`,
  petCare: `${HD}/pet-wipes.png`,
  baby: `${HD}/baby-wipes.jpg`,
  aboutReception: "/videos/reception.mp4",
  factoryPhoto: `${HD}/factory-photo.jpg`,
  cleanroom: `${DOC}/hero-production-line.png`,
  packing: `${DOC}/hero-wipes-machine.png`,
  prodWide: `${DOC}/hero-folding-line.png`,
  qcLab: `${FACTORY}/qc-lab.jpg`,
  microLab: `${FACTORY}/micro-lab.jpg`,
  teamOutro: `${FACTORY}/team-outro.jpg`,
  careers1: `${FACTORY}/team-outro.jpg`,
  careers2: `${HD}/factory-photo.jpg`,
  careers3: `${HD}/factory-photo.jpg`,
  lab: `${FACTORY}/micro-lab.jpg`,
};

export const SERVICES = [
  {
    slug: "/services/wipes",
    name: "Wet Wipes",
    tagline: "A promise of care & hygiene",
    desc: "Contract manufacturing of baby, refreshing, personal hygiene, bed bath, surgical and cosmetic wet wipes — microbiologically tested and made on dedicated automated lines.",
    img: IMG.wipes,
    tags: ["Baby Wipes", "Refreshing", "Personal Hygiene", "Bed Bath", "Surgical"],
  },
  {
    slug: "/services/personal-hygiene",
    name: "Cosmetics",
    tagline: "Formulated with care, finished with science",
    desc: "Contract manufacturing for baby, adult and feminine care cosmetics — from massage oils and sulphate-free washes to serums, creams and intimate wellness ranges.",
    img: IMG.hygiene,
    tags: ["Baby Care", "Bath & Body", "Feminine Care", "Hair Care", "Wellness"],
  },
  {
    slug: "/services/pet-care",
    name: "Pet Care",
    tagline: "Because pets are family",
    desc: "Pet wet wipes and grooming essentials manufactured with the same hygiene standards as our human ranges — gentle, safe and private-label ready.",
    img: IMG.pet,
    tags: ["Pet Wipes", "Grooming", "Paw & Coat", "Odour Control"],
  },
];

export const CERTIFICATIONS = [
  "FDA Approved Facility",
  "Sedex Certified",
  "ISO 9001:2015",
  "GMP Compliant",
  "Clean Room Production",
  "Micro & QC Labs",
  "Zero Human Intervention",
  "Made in India",
];

export const HERO_SLIDES = [
  {
    type: "video",
    src: "/videos/hero-main-machine.mp4",
    poster: `${DOC}/hero-production-line.png`,
    caption: "India's Trusted Wet Wipes Manufacturers",
  },
  {
    type: "video",
    src: "/videos/hero-machine-2.mp4",
    poster: `${DOC}/hero-wipes-machine.png`,
    caption: "Automated Wipes Production Lines",
  },
  {
    type: "video",
    src: "/videos/truck-entry.mp4",
    poster: `${FACTORY}/truck-entering.jpg`,
    caption: "From Our Gates to Your Shelves",
  },
  {
    type: "video",
    src: "/videos/team-outro.mp4",
    poster: `${FACTORY}/team-outro.jpg`,
    caption: "The People Behind the Promise",
  },
];

export const INTRO_VIDEO = "/videos/logo-intro-hd.mp4";
