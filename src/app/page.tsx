import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import HowItWork from "@/components/HowItWork";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <HowItWork />
    </main>
  );
}
