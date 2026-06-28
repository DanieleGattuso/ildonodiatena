"use client";

import { useEffect, useState } from "react";
import { Lock, RefreshCw, LogOut } from "lucide-react";
import type { Booking } from "@/lib/types";
import { formatEuro } from "@/lib/booking";
import { cn } from "@/lib/utils";

const TOKEN_KEY = "ida_admin_token";

const statusStyles: Record<string, string> = {
  confirmed: "bg-olive-100 text-olive-700",
  pending: "bg-sand-200 text-terracotta-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      setToken(saved);
      void load(saved);
    }
  }, []);

  async function load(t: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/bookings", {
        headers: { "x-admin-token": t },
      });
      const data = (await res.json()) as { bookings?: Booking[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Errore.");
      localStorage.setItem(TOKEN_KEY, t);
      setBookings(data.bookings ?? []);
      setAuthed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore.");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
    setToken("");
    setBookings([]);
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void load(token);
          }}
          className="w-full max-w-sm rounded-2xl border border-olive-100 bg-white p-8 shadow-xl shadow-olive-900/5"
        >
          <Lock className="mx-auto h-10 w-10 text-terracotta-500" />
          <h1 className="mt-4 text-center font-serif text-2xl font-semibold text-olive-900">
            Area riservata
          </h1>
          <p className="mt-2 text-center text-sm text-olive-600">
            Inserisci il token di accesso per gestire le prenotazioni.
          </p>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Admin token"
            className="mt-6 w-full rounded-xl border border-olive-200 px-4 py-3 outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100"
          />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !token}
            className="mt-4 w-full rounded-full bg-terracotta-500 px-6 py-3 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-terracotta-600 disabled:opacity-50"
          >
            {loading ? "Verifica…" : "Accedi"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-semibold text-olive-900">
            Prenotazioni
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => void load(token)}
              className="inline-flex items-center gap-2 rounded-full border border-olive-200 px-4 py-2 text-sm text-olive-700 hover:bg-olive-50"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Aggiorna
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-olive-200 px-4 py-2 text-sm text-olive-700 hover:bg-olive-50"
            >
              <LogOut className="h-4 w-4" />
              Esci
            </button>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-8 overflow-x-auto rounded-2xl border border-olive-100 bg-white shadow-sm">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-olive-50 text-xs uppercase tracking-wider text-olive-600">
              <tr>
                <th className="px-4 py-3">Appartamento</th>
                <th className="px-4 py-3">Ospite</th>
                <th className="px-4 py-3">Check-in</th>
                <th className="px-4 py-3">Check-out</th>
                <th className="px-4 py-3">Notti</th>
                <th className="px-4 py-3">Totale</th>
                <th className="px-4 py-3">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-olive-50">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-olive-500">
                    Nessuna prenotazione.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="text-olive-800">
                    <td className="px-4 py-3 capitalize">{b.apartment_id}</td>
                    <td className="px-4 py-3">
                      <div>{b.guest_name}</div>
                      <div className="text-xs text-olive-500">{b.guest_email}</div>
                    </td>
                    <td className="px-4 py-3">{b.check_in}</td>
                    <td className="px-4 py-3">{b.check_out}</td>
                    <td className="px-4 py-3">{b.nights}</td>
                    <td className="px-4 py-3">{formatEuro(b.amount_total)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium",
                          statusStyles[b.status] ?? "bg-olive-100 text-olive-700"
                        )}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
