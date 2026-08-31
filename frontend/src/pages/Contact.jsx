import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send, Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHero, SectionHead, Reveal } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label as FormLabel } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE } from "@/data/site";
import { addEnquiry } from "@/lib/store";

const infoCards = [
  { icon: Mail, label: "Email Us", value: SITE.email, href: `mailto:${SITE.email}`, testId: "contact-email-card" },
  { icon: Phone, label: "Call Us", value: SITE.phone, href: SITE.phoneHref, testId: "contact-phone-card" },
  { icon: MapPin, label: "Visit Us", value: SITE.address, testId: "contact-address-card" },
  { icon: Clock, label: "Working Hours", value: SITE.hours, testId: "contact-hours-card" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [inquiry, setInquiry] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      addEnquiry({ ...form, inquiry });
      setSending(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      setInquiry("");
      toast.success("Message sent! We'll get back to you within 24 hours.");
    }, 900);
  };

  const field = "h-12 rounded-xl border-border bg-white focus-visible:ring-brand";

  return (
    <div data-testid="contact-page">
      <PageHero
        index="05"
        label="Contact Us"
        lines={[
          <>
            Let&apos;s talk <span className="text-brand">hygiene.</span>
          </>,
        ]}
        desc="Whether you're launching a new brand or scaling an existing one, our team is ready to talk formulations, capacity and timelines."
      />

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead index="01" label="Get in touch" title="We reply within a day." />
            <div className="mt-12 space-y-4">
              {infoCards.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.06}>
                  <div
                    data-testid={c.testId}
                    className="flex items-start gap-5 rounded-[1.5rem] border border-border bg-white p-6 transition-colors duration-300 hover:border-brand"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light">
                      <c.icon className="h-5 w-5 text-brand" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="mt-1 block text-base font-bold text-ink transition-colors duration-200 hover:text-brand"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-base font-semibold leading-relaxed text-ink">
                          {c.value}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              data-testid="contact-form"
              className="rounded-[2rem] border border-border bg-white p-8 sm:p-12"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel htmlFor="contact-name">Your Name</FormLabel>
                  <Input
                    id="contact-name"
                    data-testid="contact-name-input"
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={field}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="contact-email">Email</FormLabel>
                  <Input
                    id="contact-email"
                    data-testid="contact-email-input"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={field}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="contact-phone">Phone Number</FormLabel>
                  <Input
                    id="contact-phone"
                    data-testid="contact-phone-input"
                    type="tel"
                    required
                    placeholder="+91"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={field}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel>Inquiry For</FormLabel>
                  <Select value={inquiry} onValueChange={setInquiry} required>
                    <SelectTrigger data-testid="contact-inquiry-select" className={field}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wipes">Wet Wipes</SelectItem>
                      <SelectItem value="personal-hygiene">Personal Hygiene & Cosmetics</SelectItem>
                      <SelectItem value="pet-care">Pet Care</SelectItem>
                      <SelectItem value="private-label">Private Label / Contract Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <FormLabel htmlFor="contact-message">Message</FormLabel>
                  <Textarea
                    id="contact-message"
                    data-testid="contact-message-input"
                    required
                    rows={5}
                    placeholder="Tell us about your product idea, volumes and timelines."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="rounded-xl border-border bg-white focus-visible:ring-brand"
                  />
                </div>
              </div>
              <button
                type="submit"
                data-testid="contact-form-submit-button"
                disabled={sending}
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-dark active:scale-95 disabled:opacity-60"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-border">
            <iframe
              title="Krishnendu Healthcare location map"
              data-testid="contact-map"
              src="https://www.google.com/maps?q=Pithampur,%20Madhya%20Pradesh,%20India&output=embed"
              className="h-[420px] w-full"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
