import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import Services from "./components/Services";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import ScrollBackground from "./components/ScrollBackground";
import ScrollEffect from "./components/ScrollAnimation";

export default function Home() {
  return (
    <ScrollBackground>
      <main className="flex min-h-screen flex-col " id="home">
        <ScrollEffect />
        <Navbar />
        <HeroSection />
        <Features />

        <div className="">
          <AchievementsSection />
          <AboutSection />
          <Services />
          <EmailSection />
        </div>
        <Footer />
      </main>
    </ScrollBackground>
  );
}
