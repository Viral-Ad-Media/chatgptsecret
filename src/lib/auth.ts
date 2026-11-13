import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb, schema } from "@/db";
import { isAdminEmail } from "./admin";

function createAuth() {
  return betterAuth({
    database: drizzleAdapter(getDb(), {
      provider: "pg",
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    emailAndPassword: { enabled: true, minPasswordLength: 10 },
    databaseHooks: {
      user: {
        create: {
          // The site has no public accounts: only emails listed in
          // ADMIN_EMAILS can register.
          before: async (u) => {
            if (!isAdminEmail(u.email)) {
              throw new APIError("FORBIDDEN", {
                message: "Sign-ups are limited to site administrators.",
              });
            }
            return { data: u };
          },
        },
      },
    },
    plugins: [nextCookies()],
  });
}

type Auth = ReturnType<typeof createAuth>;
let cached: Auth | undefined;

export function getAuth(): Auth {
  cached ??= createAuth();
  return cached;
}

export async function getSession() {
  return getAuth().api.getSession({ headers: await headers() });
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (!isAdminEmail(session.user.email)) redirect("/sign-in?error=forbidden");
  return session;
}
