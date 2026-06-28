import { getRequestContext } from "@cloudflare/next-on-pages";
import type { CloudflareEnv } from "@/lib/types";

/**
 * Restituisce i binding/secret Cloudflare a runtime.
 * Va chiamata SOLO dentro route handler con `runtime = "edge"`.
 */
export function getEnv(): CloudflareEnv {
  return getRequestContext().env as unknown as CloudflareEnv;
}
