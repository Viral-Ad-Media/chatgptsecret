import type { Metadata } from "next";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <h1 className="font-display text-3xl font-extrabold">Admin sign in</h1>
      <p className="mt-2 text-neutral-600">Manage posts on ChatGPT Secret.</p>
      {error === "forbidden" ? (
        <p className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">That account isn&apos;t an administrator.</p>
      ) : null}
      <SignInForm />
    </div>
  );
}
