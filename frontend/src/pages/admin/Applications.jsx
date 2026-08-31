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
import { getApplications, setApplicationStatus, deleteApplication } from "@/lib/store";

const formatDate = (iso) =>
  new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

const statusColor = {
  New: "bg-brand-light text-brand",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-600",
};

export default function Applications() {
  const [items, setItems] = useState(getApplications());
  const [selected, setSelected] = useState(null);

  const updateStatus = (id, status) => {
    setApplicationStatus(id, status);
    setItems(getApplications());
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  };

  const remove = (id) => {
    deleteApplication(id);
    setItems(getApplications());
    setSelected(null);
  };

  return (
    <div data-testid="admin-applications-page">
      <h1 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
        Job Applications
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Every Careers page application lands here. {items.length} total.
      </p>

      <div className="mt-10 rounded-[1.5rem] border border-border bg-white">
        {items.length === 0 ? (
          <p className="px-7 py-16 text-center text-sm text-neutral-400" data-testid="applications-empty">
            No applications yet. Submit the Careers form on the website and it will appear here.
          </p>
        ) : (
          items.map((a) => (
            <div
              key={a.id}
              data-testid={`application-row-${a.id}`}
              className="flex flex-wrap items-center gap-4 border-b border-border px-7 py-5 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{a.name}</p>
                <p className="truncate text-xs text-neutral-500">{a.email} · {a.phone}</p>
              </div>
              <span className="hidden rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold capitalize text-neutral-600 sm:block">
                {a.interest}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor[a.status] || statusColor.New}`}>
                {a.status}
              </span>
              <span className="hidden text-xs font-semibold text-neutral-400 md:block">
                {formatDate(a.date)}
              </span>
              <button
                type="button"
                data-testid={`application-view-${a.id}`}
                onClick={() => setSelected(a)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-neutral-500 transition-colors hover:border-brand hover:text-brand"
                aria-label="View application"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent data-testid="application-detail-dialog" className="sm:max-w-lg">
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
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Area of Interest</p>
                    <p className="mt-1 font-semibold capitalize text-ink">{selected.interest}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Applied</p>
                    <p className="mt-1 font-semibold text-ink">{formatDate(selected.date)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">About the Candidate</p>
                  <p className="mt-2 rounded-xl bg-neutral-50 p-4 leading-relaxed text-ink/80">
                    {selected.message}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
                  <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v)}>
                    <SelectTrigger data-testid="application-status-select" className="w-44 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    data-testid="application-delete-button"
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
