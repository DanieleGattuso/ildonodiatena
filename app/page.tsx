import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Apartments from "@/components/sections/Apartments";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Apartments />
        {/*
          Sezioni successive da implementare:
          <Features />    -> #struttura
          <Experience />  -> #territorio
          <Location />    -> #location
          <Footer />
        */}
      </main>
    </>
  );
}
