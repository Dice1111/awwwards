import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar></Navbar>
      <Hero></Hero>
      <About></About>
      <section className="w-full overflow-hidden h-dvh bg-blue-500" />
    </main>
  );
}
