import About from "@/components/sections/About";
import Feature from "@/components/sections/Feature";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Story from "@/components/sections/Story";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Feature />
      <Story />
      <section className="w-full overflow-hidden h-dvh bg-blue-500" />
    </main>
  );
}
