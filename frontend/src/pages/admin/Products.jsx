import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProducts, addProduct, deleteProduct } from "@/lib/store";

const categories = ["All", "Wipes", "Baby Care", "Adult Care", "Pet Care"];
const addableCategories = categories.slice(1);

export default function Products() {
  const [items, setItems] = useState(getProducts());
  const [filter, setFilter] = useState("All");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const shown = filter === "All" ? items : items.filter((p) => p.category === filter);

  const handleAdd = (e) => {
    e.preventDefault();
    addProduct({ name: name.trim(), category });
    setItems(getProducts());
    setName("");
    setCategory("");
    toast.success("Product added.");
  };

  const remove = (id) => {
    deleteProduct(id);
    setItems(getProducts());
    toast.success("Product removed.");
  };

  return (
    <div data-testid="admin-products-page">
      <h1 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
        Products
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Manage the product ranges shown across the service pages. {items.length} total.
      </p>

      <form
        onSubmit={handleAdd}
        data-testid="product-add-form"
        className="mt-10 flex flex-col gap-4 rounded-[1.5rem] border border-border bg-white p-6 sm:flex-row sm:items-center"
      >
        <Input
          data-testid="product-name-input"
          required
          placeholder="New product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 flex-1 rounded-xl"
        />
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger data-testid="product-category-select" className="h-12 rounded-xl sm:w-52">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {addableCategories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          type="submit"
          data-testid="product-add-button"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-bold text-white transition-colors hover:bg-brand-dark active:scale-95"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </form>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            data-testid={`product-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setFilter(c)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
              filter === c ? "bg-brand text-white" : "border border-border bg-white text-neutral-500 hover:border-brand hover:text-brand"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((p) => (
          <div
            key={p.id}
            data-testid={`product-row-${p.id}`}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-white px-5 py-4 transition-colors hover:border-brand"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">{p.name}</p>
              <p className="text-xs font-semibold text-neutral-400">{p.category}</p>
            </div>
            <button
              type="button"
              data-testid={`product-delete-${p.id}`}
              onClick={() => remove(p.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label={`Delete ${p.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
