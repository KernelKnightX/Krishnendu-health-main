import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
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
import { getContent, saveContent } from "@/lib/store";

export default function Content() {
  const [content, setContent] = useState(getContent());

  const setSlide = (i, patch) => {
    const heroSlides = content.heroSlides.map((s, idx) => (idx === i ? { ...s, ...patch } : s));
    setContent({ ...content, heroSlides });
  };

  const setStory = (i, value) => {
    const brandStory = content.brandStory.map((p, idx) => (idx === i ? value : p));
    setContent({ ...content, brandStory });
  };

  const handleSave = () => {
    saveContent(content);
    toast.success("Content saved. The public site updates on next page load.");
  };

  return (
    <div data-testid="admin-content-page" className="max-w-4xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Content Manager
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Update hero slides, images and key text across the website.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          data-testid="content-save-button"
          className="flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark active:scale-95"
        >
          <Save className="h-4 w-4" /> Save All Changes
        </button>
      </div>

      <section className="mt-10 rounded-[1.5rem] border border-border bg-white p-8" data-testid="content-hero-editor">
        <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
          Homepage Hero Slides
        </h2>
        <p className="mt-1 text-xs text-neutral-400">
          4 slides rotate on the homepage. Paste any image/video URL or use the factory clips already on the site.
        </p>
        <div className="mt-6 space-y-6">
          {content.heroSlides.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border p-6" data-testid={`hero-slide-editor-${i}`}>
              <p className="font-display text-sm font-bold tracking-[0.2em] text-brand">
                SLIDE {i + 1}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <FormLabel>Caption</FormLabel>
                  <Input
                    data-testid={`hero-slide-${i}-caption-input`}
                    value={s.caption}
                    onChange={(e) => setSlide(i, { caption: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel>Media URL (image or video)</FormLabel>
                  <Input
                    data-testid={`hero-slide-${i}-src-input`}
                    value={s.src}
                    onChange={(e) => setSlide(i, { src: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel>Poster Image URL</FormLabel>
                  <Input
                    data-testid={`hero-slide-${i}-poster-input`}
                    value={s.poster || ""}
                    onChange={(e) => setSlide(i, { poster: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel>Media Type</FormLabel>
                  <Select value={s.type} onValueChange={(v) => setSlide(i, { type: v })}>
                    <SelectTrigger data-testid={`hero-slide-${i}-type-select`} className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[1.5rem] border border-border bg-white p-8" data-testid="content-manifesto-editor">
        <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
          Mission, Vision & Values
        </h2>
        <div className="mt-6 space-y-5">
          {[
            { key: "mission", label: "Our Mission", testId: "content-mission-input" },
            { key: "vision", label: "Our Vision", testId: "content-vision-input" },
            { key: "values", label: "Our Values", testId: "content-values-input" },
          ].map((f) => (
            <div key={f.key} className="space-y-2">
              <FormLabel>{f.label}</FormLabel>
              <Textarea
                data-testid={f.testId}
                rows={3}
                value={content[f.key]}
                onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
                className="rounded-xl"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[1.5rem] border border-border bg-white p-8" data-testid="content-story-editor">
        <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
          Brand Story (About Us page)
        </h2>
        <div className="mt-6 space-y-5">
          {content.brandStory.map((p, i) => (
            <div key={i} className="space-y-2">
              <FormLabel>Paragraph {i + 1}</FormLabel>
              <Textarea
                data-testid={`content-story-${i}-input`}
                rows={4}
                value={p}
                onChange={(e) => setStory(i, e.target.value)}
                className="rounded-xl"
              />
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={handleSave}
        data-testid="content-save-button-bottom"
        className="mt-8 flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark active:scale-95"
      >
        <Save className="h-4 w-4" /> Save All Changes
      </button>
    </div>
  );
}
