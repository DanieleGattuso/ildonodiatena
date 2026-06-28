import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Apartments from "@/components/sections/Apartments";
import Experience from "@/components/sections/Experience";
import Booking from "@/components/sections/Booking";
import Location from "@/components/sections/Location";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Apartments />
        <Experience />
        <Booking />
        <Location />
      </main>
      <Footer />
    </>
  );
}
