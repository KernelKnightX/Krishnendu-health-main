import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Package,
  Users,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { LOGO_URL } from "@/data/site";
import { isAdminLoggedIn, logoutAdmin } from "@/lib/store";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true, testId: "admin-nav-dashboard" },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox, testId: "admin-nav-enquiries" },
  { to: "/admin/applications", label: "Applications", icon: Briefcase, testId: "admin-nav-applications" },
  { to: "/admin/products", label: "Products", icon: Package, testId: "admin-nav-products" },
  { to: "/admin/clients", label: "Clients", icon: Users, testId: "admin-nav-clients" },
  { to: "/admin/content", label: "Content", icon: FileText, testId: "admin-nav-content" },
  { to: "/admin/settings", label: "Settings", icon: Settings, testId: "admin-nav-settings" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-neutral-100" data-testid="admin-layout">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-20 flex-col bg-ink lg:w-64">
        <div className="flex h-20 items-center justify-center border-b border-white/10 px-4 lg:justify-start">
          <div className="rounded-xl bg-white p-1.5">
            <img src={LOGO_URL} alt="KHPL" className="h-9 w-auto object-contain" />
          </div>
          <span className="ml-3 hidden font-display text-sm font-extrabold tracking-tight text-white lg:block">
            Admin Console
          </span>
        </div>
        <nav className="flex-1 space-y-1 p-3" aria-label="Admin">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              data-testid={n.testId}
              className={({ isActive }) =>
                `flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 lg:justify-start ${
                  isActive ? "bg-brand text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <n.icon className="h-5 w-5 shrink-0" />
              <span className="hidden lg:block">{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-white/10 p-3">
          <a
            href="/"
            data-testid="admin-view-site-link"
            className="flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white lg:justify-start"
          >
            <ExternalLink className="h-5 w-5 shrink-0" />
            <span className="hidden lg:block">View Website</span>
          </a>
          <button
            type="button"
            onClick={handleLogout}
            data-testid="admin-logout-button"
            className="flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/60 transition-colors duration-200 hover:bg-red-500/20 hover:text-red-300 lg:justify-start"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>
      <main className="ml-20 flex-1 p-6 sm:p-10 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
