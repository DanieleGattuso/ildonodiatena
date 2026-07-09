"use client";

import { useEffect, useMemo, useState } from "react";
import { DayPicker, type DateRange, type Matcher } from "react-day-picker";
import { it as itLocale, enUS } from "date-fns/locale";
import { Loader2, CalendarDays, Users, AlertCircle } from "lucide-react";
import "react-day-picker/style.css";

import { apartments } from "@/lib/data";
import type { BookedRange } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { nightsBetween, toDateString, formatEuro } from "@/lib/booking";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type BookingProps = {
  lang: Locale;
  dict: Dictionary["booking"];
};

function parseDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** 6. Prenota — calendario disponibilità + dati ospite + checkout Stripe. */
export default function Booking({ lang, dict }: BookingProps) {
  const [apartmentId, setApartmentId] = useState(apartments[0].id);
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apartment = apartments.find((a) => a.id === apartmentId)!;

  useEffect(() => {
    let active = true;
    setRange(undefined);
    fetch(`/api/availability?apartment=${apartmentId}`)
      .then((r) => r.json() as Promise<{ bookedRanges?: BookedRange[] }>)
      .then((data) => {
        if (active) setBookedRanges(data.bookedRanges ?? []);
      })
      .catch(() => active && setBookedRanges([]));
    return () => {
      active = false;
    };
  }, [apartmentId]);

  const disabledDays: Matcher[] = useMemo(() => {
    const matchers: Matcher[] = [{ before: new Date() }];
    for (const b of bookedRanges) {
      const to = parseDate(b.to);
      to.setDate(to.getDate() - 1);
      matchers.push({ from: parseDate(b.from), to });
    }
    return matchers;
  }, [bookedRanges]);

  const { checkIn, checkOut, nights, total } = useMemo(() => {
    if (!range?.from || !range?.to) {
      return { checkIn: "", checkOut: "", nights: 0, total: 0 };
    }
    const ci = toDateString(range.from);
    const co = toDateString(range.to);
    const n = nightsBetween(ci, co);
    return { checkIn: ci, checkOut: co, nights: n, total: n * apartment.pricePerNight };
  }, [range, apartment.pricePerNight]);

  const canSubmit =
    nights > 0 && name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apartmentId,
          checkIn,
          checkOut,
          guests,
          name,
          email,
          lang,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? dict.errorGeneric);
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.errorGeneric);
      setLoading(false);
    }
  }

  return (
    <section id="prenota" className="bg-bordeaux-700 py-24 md:py-32">
      <Container>
        <SectionHeading
          title={dict.title}
          description={dict.description}
          onDark
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 bg-surface-50 p-6 md:p-10 lg:grid-cols-2">
          <div>
            <label className="mb-3 block text-sm font-medium text-ink-700">
              {dict.apartment}
            </label>
            <div className="mb-6 grid grid-cols-2 gap-3">
              {apartments.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setApartmentId(a.id)}
                  className={cn(
                    "border px-4 py-3 text-left transition-colors",
                    a.id === apartmentId
                      ? "border-bordeaux-600 bg-bordeaux-50"
                      : "border-surface-300 hover:border-ink-400"
                  )}
                >
                  <span className="block font-serif text-lg text-ink-950">
                    {a.name}
                  </span>
                  <span className="text-sm text-ink-700">
                    {formatEuro(a.pricePerNight)} {dict.perNight}
                  </span>
                </button>
              ))}
            </div>

            <div className="border border-surface-300 bg-white p-2">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={disabledDays}
                locale={lang === "it" ? itLocale : enUS}
                numberOfMonths={1}
                weekStartsOn={1}
                className="mx-auto w-fit text-ink-950"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
                  {dict.name}
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-surface-300 bg-white px-4 py-3 text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-bordeaux-600"
                  placeholder={dict.namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
                  {dict.email}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-surface-300 bg-white px-4 py-3 text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-bordeaux-600"
                  placeholder={dict.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="guests" className="mb-1.5 block text-sm font-medium text-ink-700">
                  {dict.guests}
                </label>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full appearance-none border border-surface-300 bg-white py-3 pl-11 pr-4 text-ink-950 outline-none transition focus:border-bordeaux-600"
                  >
                    {Array.from({ length: apartment.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? dict.guest : dict.guestsPlural}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-surface-200 pt-5">
              <div className="flex items-center gap-2 text-sm text-ink-700">
                <CalendarDays className="h-4 w-4" />
                {nights > 0 ? (
                  <span>
                    {checkIn} → {checkOut} · {nights}{" "}
                    {nights === 1 ? dict.night : dict.nightsPlural}
                  </span>
                ) : (
                  <span>{dict.selectDates}</span>
                )}
              </div>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-sm text-ink-700">{dict.total}</span>
                <span className="font-serif text-3xl text-ink-950">
                  {formatEuro(total)}
                </span>
              </div>
            </div>

            {error && (
              <p className="mt-4 flex items-center gap-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-none" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-bordeaux-600 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-bordeaux-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bordeaux-600"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {dict.redirecting}
                </>
              ) : (
                dict.submit
              )}
            </button>
            <p className="mt-3 text-center text-xs text-ink-700">{dict.secure}</p>
          </form>
        </div>
      </Container>
    </section>
  );
}
