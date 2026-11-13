"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const res =
      mode === "sign-in"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ email, password, name: String(form.get("name") || email) });
    setPending(false);
    if (res.error) {
      setError(res.error.message ?? "Something went wrong.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  const input = "mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      {mode === "sign-up" ? (
        <label className="block text-sm font-medium">
          Name
          <input name="name" className={input} autoComplete="name" />
        </label>
      ) : null}
      <label className="block text-sm font-medium">
        Email
        <input name="email" type="email" required className={input} autoComplete="email" />
      </label>
      <label className="block text-sm font-medium">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={10}
          className={input}
          autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button disabled={pending} className="w-full rounded-full bg-brand py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
        {pending ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create admin account"}
      </button>
      <button
        type="button"
        onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
        className="w-full text-sm text-neutral-600 hover:text-ink"
      >
        {mode === "sign-in" ? "First time? Create the admin account" : "Already have an account? Sign in"}
      </button>
    </form>
  );
}
