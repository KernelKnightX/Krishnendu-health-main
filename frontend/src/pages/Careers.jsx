import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send, GraduationCap, HeartPulse, TrendingUp, Users } from "lucide-react";
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
import { IMG } from "@/data/site";
import { addApplication } from "@/lib/store";

const perks = [
  { icon: TrendingUp, title: "Grow With Us", desc: "A young, fast-scaling company where your work visibly shapes the future." },
  { icon: HeartPulse, title: "Safety-First Culture", desc: "Work inside a facility where safety and hygiene standards protect everyone." },
  { icon: GraduationCap, title: "Learn From Experts", desc: "Train alongside R&D scientists, quality specialists and production veterans." },
  { icon: Users, title: "One Team", desc: "A dynamic environment where innovation, safety and excellence drive everything we do." },
];

export default function Careers() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [interest, setInterest] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      addApplication({ ...form, interest });
      setSending(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      setInterest("");
      toast.success("Application received! Our HR team will reach out soon.");
    }, 900);
  };

  const field =
    "h-12 rounded-xl border-border bg-white focus-visible:ring-brand";

  return (
    <div data-testid="careers-page">
      <PageHero
        index="04"
        label="Careers"
        lines={[
          <>
            Build the future <span className="text-brand">of clean.</span>
          </>,
        ]}
        desc="Be part of a world-class manufacturing team shaping the future of wet wipes and personal care in India. Join us to grow your career while contributing to products that make a difference every day."
      />

      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {[IMG.teamOutro, IMG.qcLab, IMG.microLab].map((src, i) => (
            <Reveal key={src} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-[2rem] border border-border">
                <img
                  src={src}
                  alt="The people of Krishnendu Healthcare"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="01"
            label="Why KHPL"
            title="A place where good people make great products."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.07}>
                <div className="h-full rounded-[1.5rem] border border-border bg-white p-8 transition-colors duration-300 hover:border-brand">
                  <p.icon className="h-6 w-6 text-brand" />
                  <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              index="02"
              label="Apply now"
              title="Tell us where you fit."
              desc="We hire across production, quality, R&D, supply chain and sales. Share your details and our HR team will get in touch when a matching role opens."
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              data-testid="career-form"
              className="rounded-[2rem] border border-border bg-white p-8 sm:p-12"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel htmlFor="career-name">Full Name</FormLabel>
                  <Input
                    id="career-name"
                    data-testid="career-name-input"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={field}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="career-email">Email</FormLabel>
                  <Input
                    id="career-email"
                    data-testid="career-email-input"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={field}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="career-phone">Phone</FormLabel>
                  <Input
                    id="career-phone"
                    data-testid="career-phone-input"
                    type="tel"
                    required
                    placeholder="+91"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={field}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel>Area of Interest</FormLabel>
                  <Select value={interest} onValueChange={setInterest} required>
                    <SelectTrigger data-testid="career-interest-select" className={field}>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production & Operations</SelectItem>
                      <SelectItem value="quality">Quality Assurance</SelectItem>
                      <SelectItem value="rnd">Research & Development</SelectItem>
                      <SelectItem value="supply-chain">Supply Chain</SelectItem>
                      <SelectItem value="sales">Sales & Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <FormLabel htmlFor="career-message">About You</FormLabel>
                  <Textarea
                    id="career-message"
                    data-testid="career-message-input"
                    required
                    rows={5}
                    placeholder="Tell us about your experience and the kind of role you're looking for."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="rounded-xl border-border bg-white focus-visible:ring-brand"
                  />
                </div>
              </div>
              <button
                type="submit"
                data-testid="career-form-submit-button"
                disabled={sending}
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-dark active:scale-95 disabled:opacity-60"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {sending ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
