import { Link } from "react-router-dom";
import { Inbox, Briefcase, Package, Users, ArrowUpRight } from "lucide-react";
import { getEnquiries, getApplications, getProducts, getClients } from "@/lib/store";

const formatDate = (iso) =>
  new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

export default function Dashboard() {
  const enquiries = getEnquiries();
  const applications = getApplications();
  const products = getProducts();
  const clients = getClients();
  const newCount = enquiries.filter((e) => e.status === "New").length;

  const stats = [
    { label: "Total Enquiries", value: enquiries.length, sub: `${newCount} new`, icon: Inbox, to: "/admin/enquiries", testId: "stat-enquiries" },
    { label: "Job Applications", value: applications.length, sub: "from careers page", icon: Briefcase, to: "/admin/applications", testId: "stat-applications" },
    { label: "Products Listed", value: products.length, sub: "4 categories", icon: Package, to: "/admin/products", testId: "stat-products" },
    { label: "Clients", value: clients.length, sub: "on About page", icon: Users, to: "/admin/clients", testId: "stat-clients" },
  ];

  return (
    <div data-testid="admin-dashboard">
      <h1 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Welcome back. Here's what's happening on the website.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            data-testid={s.testId}
            className="group rounded-[1.5rem] border border-border bg-white p-7 transition-colors duration-300 hover:border-brand"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-light">
                <s.icon className="h-5 w-5 text-brand" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-neutral-300 transition-colors duration-300 group-hover:text-brand" />
            </div>
            <p className="mt-6 font-display text-4xl font-black tracking-tight text-ink">{s.value}</p>
            <p className="mt-1 text-sm font-bold text-ink">{s.label}</p>
            <p className="text-xs font-semibold text-neutral-400">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-[1.5rem] border border-border bg-white">
        <div className="flex items-center justify-between border-b border-border px-7 py-5">
          <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
            Recent Enquiries
          </h2>
          <Link
            to="/admin/enquiries"
            data-testid="dashboard-view-all-enquiries"
            className="text-sm font-bold text-brand hover:underline"
          >
            View all
          </Link>
        </div>
        {enquiries.length === 0 ? (
          <p className="px-7 py-12 text-center text-sm text-neutral-400" data-testid="dashboard-no-enquiries">
            No enquiries yet — submissions from the Contact page will appear here instantly.
          </p>
        ) : (
          <div>
            {enquiries.slice(0, 5).map((e) => (
              <div key={e.id} className="flex flex-wrap items-center gap-4 border-b border-border px-7 py-4 last:border-b-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{e.name}</p>
                  <p className="truncate text-xs text-neutral-500">{e.message}</p>
                </div>
                <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand">
                  {e.inquiry || "General"}
                </span>
                <span className="text-xs font-semibold text-neutral-400">{formatDate(e.date)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
