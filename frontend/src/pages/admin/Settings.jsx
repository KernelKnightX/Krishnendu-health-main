import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label as FormLabel } from "@/components/ui/label";
import { getSettings, saveSettings } from "@/lib/store";

export default function Settings() {
  const [form, setForm] = useState(getSettings());

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings(form);
    toast.success("Settings saved.");
  };

  return (
    <div data-testid="admin-settings-page" className="max-w-2xl">
      <h1 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
        Settings
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Site-wide contact details. These will power the live website once the backend is connected.
      </p>

      <form
        onSubmit={handleSubmit}
        data-testid="settings-form"
        className="mt-10 space-y-6 rounded-[1.5rem] border border-border bg-white p-8"
      >
        <div className="space-y-2">
          <FormLabel htmlFor="settings-email">Public Email</FormLabel>
          <Input
            id="settings-email"
            data-testid="settings-email-input"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="h-12 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="settings-phone">Public Phone</FormLabel>
          <Input
            id="settings-phone"
            data-testid="settings-phone-input"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="h-12 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="settings-whatsapp">WhatsApp Number (with country code)</FormLabel>
          <Input
            id="settings-whatsapp"
            data-testid="settings-whatsapp-input"
            required
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            className="h-12 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="settings-address">Factory Address</FormLabel>
          <Textarea
            id="settings-address"
            data-testid="settings-address-input"
            required
            rows={3}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="rounded-xl"
          />
        </div>
        <button
          type="submit"
          data-testid="settings-save-button"
          className="flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark active:scale-95"
        >
          <Save className="h-4 w-4" /> Save Settings
        </button>
      </form>
    </div>
  );
}
