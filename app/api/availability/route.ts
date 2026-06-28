import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { getBookedRanges } from "@/lib/db";
import { getApartment } from "@/lib/data";

export const runtime = "edge";

/** GET /api/availability?apartment=atena → intervalli occupati per il calendario. */
export async function GET(request: NextRequest) {
  const apartmentId = request.nextUrl.searchParams.get("apartment");

  if (!apartmentId || !getApartment(apartmentId)) {
    return NextResponse.json(
      { error: "Appartamento non valido." },
      { status: 400 }
    );
  }

  try {
    const { DB } = getEnv();
    const bookedRanges = await getBookedRanges(DB, apartmentId);
    return NextResponse.json(
      { bookedRanges },
      { headers: { "Cache-Control": "public, max-age=60" } }
    );
  } catch (err) {
    console.error("availability error", err);
    return NextResponse.json(
      { error: "Errore nel recupero della disponibilità." },
      { status: 500 }
    );
  }
}
