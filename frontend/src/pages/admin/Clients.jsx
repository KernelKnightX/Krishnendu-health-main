import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getClients, addClient, deleteClient } from "@/lib/store";

export default function Clients() {
  const [items, setItems] = useState(getClients());
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    addClient({ name: name.trim(), parent: parent.trim() });
    setItems(getClients());
    setName("");
    setParent("");
    toast.success("Client added.");
  };

  const remove = (id) => {
    deleteClient(id);
    setItems(getClients());
    toast.success("Client removed.");
  };

  return (
    <div data-testid="admin-clients-page">
      <h1 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
        Clients
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Manage the client list shown on the About Us page. {items.length} total.
      </p>

      <form
        onSubmit={handleAdd}
        data-testid="client-add-form"
        className="mt-10 flex flex-col gap-4 rounded-[1.5rem] border border-border bg-white p-6 sm:flex-row sm:items-center"
      >
        <Input
          data-testid="client-name-input"
          required
          placeholder="Brand name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 flex-1 rounded-xl"
        />
        <Input
          data-testid="client-parent-input"
          placeholder="Parent company (optional)"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
          className="h-12 flex-1 rounded-xl"
        />
        <button
          type="submit"
          data-testid="client-add-button"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-bold text-white transition-colors hover:bg-brand-dark active:scale-95"
        >
          <Plus className="h-4 w-4" /> Add Client
        </button>
      </form>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((c, i) => (
          <div
            key={c.id}
            data-testid={`client-row-${c.id}`}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-white px-5 py-4 transition-colors hover:border-brand"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">
                <span className="mr-2 font-display text-xs font-bold text-brand">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                {c.name}
              </p>
              {c.parent && (
                <p className="truncate text-xs font-semibold text-neutral-400">{c.parent}</p>
              )}
            </div>
            <button
              type="button"
              data-testid={`client-delete-${c.id}`}
              onClick={() => remove(c.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label={`Delete ${c.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
