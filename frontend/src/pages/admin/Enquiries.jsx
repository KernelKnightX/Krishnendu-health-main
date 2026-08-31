import { useState } from "react";
import { Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEnquiries, setEnquiryStatus, deleteEnquiry } from "@/lib/store";

const formatDate = (iso) =>
  new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

const statusColor = {
  New: "bg-brand-light text-brand",
  "In Progress": "bg-amber-100 text-amber-700",
  Closed: "bg-green-100 text-green-700",
};

export default function Enquiries() {
  const [items, setItems] = useState(getEnquiries());
  const [selected, setSelected] = useState(null);

  const updateStatus = (id, status) => {
    setEnquiryStatus(id, status);
    setItems(getEnquiries());
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  };

  const remove = (id) => {
    deleteEnquiry(id);
    setItems(getEnquiries());
    setSelected(null);
  };

  return (
    <div data-testid="admin-enquiries-page">
      <h1 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
        Enquiries
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Every Contact Us submission lands here. {items.length} total.
      </p>

      <div className="mt-10 rounded-[1.5rem] border border-border bg-white">
        {items.length === 0 ? (
          <p className="px-7 py-16 text-center text-sm text-neutral-400" data-testid="enquiries-empty">
            No enquiries yet. Submit the Contact form on the website and it will appear here.
          </p>
        ) : (
          items.map((e) => (
            <div
              key={e.id}
              data-testid={`enquiry-row-${e.id}`}
              className="flex flex-wrap items-center gap-4 border-b border-border px-7 py-5 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{e.name}</p>
                <p className="truncate text-xs text-neutral-500">{e.email} · {e.phone}</p>
              </div>
              <span className="hidden rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-600 sm:block">
                {e.inquiry}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor[e.status] || statusColor.New}`}>
                {e.status}
              </span>
              <span className="hidden text-xs font-semibold text-neutral-400 md:block">
                {formatDate(e.date)}
              </span>
              <button
                type="button"
                data-testid={`enquiry-view-${e.id}`}
                onClick={() => setSelected(e)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-neutral-500 transition-colors hover:border-brand hover:text-brand"
                aria-label="View enquiry"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent data-testid="enquiry-detail-dialog" className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-extrabold tracking-tight">
                  {selected.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Email</p>
                    <p className="mt-1 font-semibold text-ink">{selected.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Phone</p>
                    <p className="mt-1 font-semibold text-ink">{selected.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Inquiry For</p>
                    <p className="mt-1 font-semibold text-ink">{selected.inquiry}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Received</p>
                    <p className="mt-1 font-semibold text-ink">{formatDate(selected.date)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Message</p>
                  <p className="mt-2 rounded-xl bg-neutral-50 p-4 leading-relaxed text-ink/80">
                    {selected.message}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
                  <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v)}>
                    <SelectTrigger data-testid="enquiry-status-select" className="w-44 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    data-testid="enquiry-delete-button"
                    onClick={() => remove(selected.id)}
                    className="flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
