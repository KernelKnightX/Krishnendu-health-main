import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label as FormLabel } from "@/components/ui/label";
import { LOGO_URL } from "@/data/site";
import { loginAdmin } from "@/lib/store";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await loginAdmin(email.trim().toLowerCase(), password);
    if (ok) {
      navigate("/admin");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4" data-testid="admin-login-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="rounded-[2rem] border border-border bg-white p-10 shadow-xl">
          <div className="mx-auto w-fit rounded-2xl bg-white">
            <img src={LOGO_URL} alt="Krishnendu Healthcare" className="h-16 w-auto object-contain" />
          </div>
          <h1 className="mt-8 text-center font-display text-3xl font-black tracking-tight text-ink">
            Admin Console
          </h1>
          <p className="mt-2 text-center text-sm text-neutral-500">
            Sign in to manage enquiries, applications and content.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5" data-testid="admin-login-form">
            <div className="space-y-2">
              <FormLabel htmlFor="admin-email">Email</FormLabel>
              <Input
                id="admin-email"
                data-testid="admin-login-email-input"
                type="email"
                required
                placeholder="admin@krishnenduhealthcare.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="admin-password">Password</FormLabel>
              <Input
                id="admin-password"
                data-testid="admin-login-password-input"
                type="password"
                required
                placeholder="••••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="h-12 rounded-xl"
              />
            </div>
            {error && (
              <p data-testid="admin-login-error" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              data-testid="admin-login-submit-button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-dark active:scale-[0.98]"
            >
              <Lock className="h-4 w-4" />
              Sign In
            </button>
          </form>
        </div>
        <a
          href="/"
          data-testid="admin-login-back-link"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-brand"
        >
          <LogIn className="h-4 w-4 rotate-180" /> Back to website
        </a>
      </motion.div>
    </div>
  );
}
