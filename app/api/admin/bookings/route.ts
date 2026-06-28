import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { listBookings } from "@/lib/db";

export const runtime = "edge";

/** GET /api/admin/bookings → elenco prenotazioni. Protetto da ADMIN_TOKEN. */
export async function GET(request: NextRequest) {
  const { DB, ADMIN_TOKEN } = getEnv();

  if (!ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Area admin non configurata (ADMIN_TOKEN mancante)." },
      { status: 503 }
    );
  }

  const provided =
    request.headers.get("x-admin-token") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (provided !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  try {
    const bookings = await listBookings(DB);
    return NextResponse.json(
      { bookings },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("admin list error", err);
    return NextResponse.json(
      { error: "Errore nel recupero delle prenotazioni." },
      { status: 500 }
    );
  }
}
