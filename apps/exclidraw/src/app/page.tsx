import Navbar from "@/app/components/landing/Navbar";
import Hero from "@/app/components/landing/Hero";
import Features from "@/app/components/landing/Features";
import Footer from "@/app/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}