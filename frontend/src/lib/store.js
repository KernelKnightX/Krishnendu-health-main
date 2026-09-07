import { db, auth, isFirebaseConfigured } from "../firebase";
import { collection, doc, setDoc, getDoc, getDocs, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const stamp = (extra) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  date: new Date().toISOString(),
  status: "New",
  ...extra,
});

// Helper: sync a collection from Firestore into localStorage key
const syncCollectionToLocal = async (collectionName, localKey, defaultValue = []) => {
  if (!isFirebaseConfigured()) return;
  try {
    const q = query(collection(db, collectionName), orderBy("date", "desc"));
    const snap = await getDocs(q);
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    write(localKey, items.length ? items : defaultValue);
  } catch (e) {
    // ignore sync errors
    console.warn("Firestore sync error for", collectionName, e);
  }
};

// Start background sync at module load
if (isFirebaseConfigured()) {
  // fire-and-forget
  (async () => {
    await Promise.all([
      syncCollectionToLocal("enquiries", "khpl_enquiries", []),
      syncCollectionToLocal("applications", "khpl_applications", []),
      syncCollectionToLocal("products", "khpl_products", null),
    ]);
    // settings and content are stored as single docs
    try {
      const sDoc = await getDoc(doc(db, "settings", "main"));
      if (sDoc.exists()) write("khpl_settings", sDoc.data());
    } catch (e) {
      console.warn("settings sync failed", e);
    }
    try {
      const cDoc = await getDoc(doc(db, "content", "main"));
      if (cDoc.exists()) write("khpl_content", cDoc.data());
    } catch (e) {
      console.warn("content sync failed", e);
    }
  })();
}

export const addEnquiry = (e) => {
  const item = stamp(e);
  const list = read("khpl_enquiries", []);
  write("khpl_enquiries", [item, ...list]);

  if (isFirebaseConfigured()) {
    // create Firestore doc with deterministic id to match local item id
    setDoc(doc(db, "enquiries", item.id), item).catch((err) => console.warn("addEnquiry firestore err", err));
  }
};
export const getEnquiries = () => read("khpl_enquiries", []);
export const setEnquiryStatus = (id, status) => {
  write(
    "khpl_enquiries",
    getEnquiries().map((e) => (e.id === id ? { ...e, status } : e))
  );
  if (isFirebaseConfigured()) {
    updateDoc(doc(db, "enquiries", id), { status }).catch((err) => console.warn("setEnquiryStatus err", err));
  }
};
export const deleteEnquiry = (id) => {
  write("khpl_enquiries", getEnquiries().filter((e) => e.id !== id));
  if (isFirebaseConfigured()) {
    deleteDoc(doc(db, "enquiries", id)).catch((err) => console.warn("deleteEnquiry err", err));
  }
};

export const addApplication = (a) => {
  const item = stamp(a);
  const list = read("khpl_applications", []);
  write("khpl_applications", [item, ...list]);
  if (isFirebaseConfigured()) {
    setDoc(doc(db, "applications", item.id), item).catch((err) => console.warn("addApplication err", err));
  }
};
export const getApplications = () => read("khpl_applications", []);
export const setApplicationStatus = (id, status) => {
  write(
    "khpl_applications",
    getApplications().map((a) => (a.id === id ? { ...a, status } : a))
  );
  if (isFirebaseConfigured()) {
    updateDoc(doc(db, "applications", id), { status }).catch((err) => console.warn("setApplicationStatus err", err));
  }
};
export const deleteApplication = (id) => {
  write("khpl_applications", getApplications().filter((a) => a.id !== id));
  if (isFirebaseConfigured()) {
    deleteDoc(doc(db, "applications", id)).catch((err) => console.warn("deleteApplication err", err));
  }
};

const SEED_PRODUCTS = [
  ...["Baby Wet Wipes", "Baby Hand & Mouth Wipes", "Refreshing Wipes", "Bath Towels", "Face & Body Bath Towel", "Shampoo Bath Towel", "Nail Polish Remover Wipes", "Makeup Remover Wipes", "Surface Cleaning Wipes", "Sanitizing Wipes", "Intimate Hygiene Wipes", "Sexual Wellness Wipes", "Delay Wipes", "Pet Wet Wipes"].map((name) => ({ name, category: "Wipes" })),
  ...["Baby Wet Wipes", "Baby Hand & Mouth Wipes", "Baby Massage Oil", "Baby Hair Oil", "Baby Head-to-Toe Body Wash", "Baby Liquid Cleanser", "Baby Liquid Detergent", "Baby Shampoo", "Baby Lotion", "Baby Nappy Rash Cream", "Baby Mosquito Repellent Spray"].map((name) => ({ name, category: "Baby Care" })),
  ...["Refreshing Wipes", "Bath Towels", "Face & Body Bath Towel", "Shampoo Bath Towel", "Nail Polish Remover Wipes", "Makeup Remover Wipes", "Surface Cleaning Wipes", "Sanitizing Wipes", "Intimate Hygiene Wipes", "Sexual Wellness Wipes", "Delay Wipes", "Adult Mosquito Repellent Spray", "Adult Massage Oil", "Adult Hair Oil", "Adult Head-to-Toe Body Wash", "Adult Liquid Cleanser", "Adult Liquid Detergent", "Adult Lotion", "Adult Creams", "Adult Face Serums", "Adult Shampoos"].map((name) => ({ name, category: "Adult Care" })),
  ...["Pet Wet Wipes", "Pet Dry Shampoo", "Pet Liquid Shampoo", "Pet Nose & Paw Butter", "Pet Perfumes"].map((name) => ({ name, category: "Pet Care" })),
].map((p, i) => ({ id: `seed-${i}`, ...p }));

export const getProducts = () => {
  const stored = read("khpl_products", null);
  if (stored) return stored;
  write("khpl_products", SEED_PRODUCTS);
  return SEED_PRODUCTS;
};
export const addProduct = (p) => {
  const item = { id: `p-${Date.now()}`, ...p };
  write("khpl_products", [item, ...(getProducts() || [])]);
  if (isFirebaseConfigured()) {
    setDoc(doc(db, "products", item.id), item).catch((err) => console.warn("addProduct err", err));
  }
};
export const deleteProduct = (id) => {
  write("khpl_products", (getProducts() || []).filter((p) => p.id !== id));
  if (isFirebaseConfigured()) {
    deleteDoc(doc(db, "products", id)).catch((err) => console.warn("deleteProduct err", err));
  }
};

const SEED_CLIENTS = [
  { name: "Amazon", parent: "Supples · Solimo · Presto · Mamabear" },
  { name: "Iksu", parent: "Lifestyle Group" },
  { name: "Morrison", parent: "JL Morrison India Limited" },
  { name: "Mothercare", parent: "Reliance" },
  { name: "Miss n Chief", parent: "Flipkart" }, { name: "CIR", parent: "Piramal" },
  { name: "Baby Hug", parent: "FirstCry" }, { name: "Pigeon", parent: "Pigeon India Pvt Ltd" },
  { name: "BonnyBoo", parent: "Medplus" }, { name: "Cuddle", parent: "Swara Baby Products" },
  { name: "Yellow Hippo", parent: "Vishal Mega Mart" }, { name: "Juniors", parent: "Baby Shop" },
  { name: "Shills", parent: "Shills Professional" }, { name: "Glam 21", parent: "Cosmoline" },
  { name: "Bumtum", parent: "Familycare Consumer Pvt Ltd" },
  { name: "Tuco", parent: "Unbottle Pvt. Ltd." }, { name: "Bodyguard", parent: "Sirona" },
].map((c, i) => ({ id: `seed-c-${i}`, ...c }));

export const getClients = () => {
  const stored = read("khpl_clients", null);
  if (stored) return stored;
  write("khpl_clients", SEED_CLIENTS);
  return SEED_CLIENTS;
};
export const addClient = (c) =>
  write("khpl_clients", [{ id: `c-${Date.now()}`, ...c }, ...getClients()]);
export const deleteClient = (id) =>
  write("khpl_clients", getClients().filter((c) => c.id !== id));

export const getSettings = () =>
  read("khpl_settings", {
    email: "info@krishnenduhealthcare.com",
    phone: "+91 96694 23000",
    address: "Plot No. 77, Smart Industrial Park, near Natrip, Pithampur, Dist. Dhar 454774, (M.P.) India",
    whatsapp: "919669423000",
  });
export const saveSettings = (s) => {
  write("khpl_settings", s);
  if (isFirebaseConfigured()) {
    setDoc(doc(db, "settings", "main"), s).catch((err) => console.warn("saveSettings err", err));
  }
};

export const ADMIN_EMAIL = "admin@krishnenduhealthcare.com";
export const ADMIN_PASSWORD = "KHPLadmin@2026";
export const isAdminLoggedIn = () => !!localStorage.getItem("khpl_admin_session");
export const loginAdmin = async (email, password) => {
  // If Firebase is configured, attempt Firebase Auth. Otherwise, fall back to local constants.
  if (isFirebaseConfigured()) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("khpl_admin_session", JSON.stringify({ email, ts: Date.now() }));
      return true;
    } catch (e) {
      console.warn("Firebase sign-in failed", e);
      return false;
    }
  }
  // local fallback
  if (email && password && email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("khpl_admin_session", JSON.stringify({ email: ADMIN_EMAIL, ts: Date.now() }));
    return true;
  }
  return false;
};
export const logoutAdmin = async () => {
  if (isFirebaseConfigured()) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("signOut failed", e);
    }
  }
  localStorage.removeItem("khpl_admin_session");
};

const DEFAULT_CONTENT = {
  heroSlides: [
    { type: "video", src: "/videos/hero-main-machine.mp4", poster: "/images/doc/hero-production-line.png", caption: "India's Trusted Wet Wipes Manufacturers" },
    { type: "video", src: "/videos/hero-machine-2.mp4", poster: "/images/doc/hero-wipes-machine.png", caption: "Automated Wipes Production Lines" },
    { type: "video", src: "/videos/truck-entry.mp4", poster: "/images/factory/truck-entering.jpg", caption: "From Our Gates to Your Shelves" },
    { type: "video", src: "/videos/team-outro.mp4", poster: "/images/factory/team-outro.jpg", caption: "The People Behind the Promise" },
  ],
  mission:
    "To manufacture safe, science-backed wet wipes and hygiene essentials for babies, adults and pets on FDA-approved automated lines — giving every brand partner a manufacturing facility they can trust without compromise.",
  vision:
    "To be India's most trusted contract manufacturing partner for hygiene and personal care — a world-class plant where leading brands are made, and where Made in India stands for uncompromising quality.",
  values:
    "Safety before speed — no batch ships until our labs approve it. The same rigorous protocols at every scale, from pilot runs to full production. Full transparency in documentation and compliance. Care in every detail, from formulation to pack seal.",
  brandStory: [
    "Krishnendu Healthcare began with a simple observation — the hygiene products Indian families reach for every day, from a baby's first wet wipe to a traveller's sanitizing wipe, were either imported at a premium or made without the rigour they deserved. We set out to change that.",
    "From our world-class facility in Pithampur, Madhya Pradesh, we built a plant where wipes and personal care products are made the way medicine is made — in designated clean rooms, on automated lines with zero human intervention, and tested batch by batch in our own micro and QC labs.",
    "Today, products manufactured by Krishnendu Healthcare sit on the shelves of Amazon, Flipkart, FirstCry and Reliance, under brands that millions of households trust. Our clients put their name on the pack — we put our promise inside it.",
  ],
};

export const getContent = () => ({ ...DEFAULT_CONTENT, ...read("khpl_content", {}) });
export const saveContent = (c) => {
  write("khpl_content", c);
  if (isFirebaseConfigured()) {
    setDoc(doc(db, "content", "main"), c).catch((err) => console.warn("saveContent err", err));
  }
};
