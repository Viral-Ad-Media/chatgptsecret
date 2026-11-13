import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const handler = (req: Request) => toNextJsHandler(getAuth())[req.method as "GET" | "POST"](req);

export const GET = handler;
export const POST = handler;
