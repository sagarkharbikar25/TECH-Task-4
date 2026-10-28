import { useState, useEffect } from "react";
import { CustomPreloader } from "./components/animation/CustomPreloader";
import { SmoothScrollProvider } from "./components/animation/SmoothScrollProvider";
import { Navbar } from "./components/sections/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { FlagshipPinSection } from "./components/sections/FlagshipPinSection";
import { BentoGridSection } from "./components/sections/BentoGridSection";
import { InteractiveTeammateMatcher } from "./components/sections/InteractiveTeammateMatcher";
import { SpeakerLineupSection } from "./components/sections/SpeakerLineupSection";
import { FaqSection } from "./components/sections/FaqSection";
import { FinalCtaSection } from "./components/sections/FinalCtaSection";
import { Footer } from "./components/sections/Footer";
import { SectionTransitionDivider } from "./components/ui/SectionTransitionDivider";
import { ScrollSectorTracker } from "./components/ui/ScrollSectorTracker";
import { RegistrationModal } from "./components/ui/RegistrationModal";
import { fetchLiveStats } from "./lib/api";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTechfestScrollMotion } from "./hooks/useTechfestScrollMotion";

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("General VIP Fest Pass");
  const [registeredCount, setRegisteredCount] = useState(1424);

  // Initialize IIT Bombay Techfest-inspired motion & panel stacking architecture
  useTechfestScrollMotion();

  useEffect(() => {
    fetchLiveStats().then((data) => {
      if (data && data.registeredCount) {
        setRegisteredCount(data.registeredCount);
      }
    });
  }, []);

  const handlePreloaderComplete = () => {
    setPreloaderDone(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  const handleOpenRegister = (category?: string) => {
    if (category) setModalCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#08080C] text-[#FFF3E6] selection:bg-[#00F0FF]/30 selection:text-white">
      {/* 1. Kinetic Scramble Preloader */}
      {!preloaderDone && (
        <CustomPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* 2. Virtual Smooth Scroll Container */}
      <SmoothScrollProvider>
        {/* Navigation HUD */}
        <Navbar
          onOpenRegister={() => handleOpenRegister("General VIP Fest Pass")}
          registeredCount={registeredCount}
        />

        {/* Desktop Fixed Sector Navigation Rail */}
        <ScrollSectorTracker />

        <main className="relative z-10">
          {/* Hero Section & 3D Interactive WebGL Quantum Core */}
          <HeroSection
            onOpenRegister={() => handleOpenRegister("General VIP Fest Pass")}
            registeredCount={registeredCount}
            onRegisteredCountUpdate={(count) => setRegisteredCount(count)}
          />

          {/* Section Transition 01 -> 02 */}
          <SectionTransitionDivider
            fromSector="01"
            toSector="02"
            label="WARPING TO COMBAT CORRIDORS"
          />

          {/* Pinning Flagship Battle Arenas (Horizontal Scrub) */}
          <FlagshipPinSection
            onSelectEvent={(eventName) => handleOpenRegister(eventName)}
          />

          {/* Section Transition 02 -> 03 */}
          <SectionTransitionDivider
            fromSector="02"
            toSector="03"
            label="INITIALIZING BENTO MATRIX"
          />

          {/* Asymmetrical Bento Grid Portfolio */}
          <BentoGridSection
            onSelectEvent={(eventName) => handleOpenRegister(eventName)}
          />

          {/* Section Transition 03 -> 04 */}
          <SectionTransitionDivider
            fromSector="03"
            toSector="04"
            label="CONNECTING SQUAD DISCOVERY ENGINE"
          />

          {/* Interactive Teammate & Squad Matcher Tool */}
          <InteractiveTeammateMatcher
            onJoinSquadWaitlist={() => handleOpenRegister("Squad Matcher Pool")}
          />

          {/* Section Transition 04 -> 05 */}
          <SectionTransitionDivider
            fromSector="04"
            toSector="05"
            label="TUNING GLOBAL ORACLE FREQUENCIES"
          />

          {/* Global Keynote Speakers Stage */}
          <SpeakerLineupSection />

          {/* Section Transition 05 -> 06 */}
          <SectionTransitionDivider
            fromSector="05"
            toSector="06"
            label="LOADING OPERATIVE SECURITY PROTOCOLS"
          />

          {/* Protocol FAQ Accordion */}
          <FaqSection />

          {/* Section Transition 06 -> 07 */}
          <SectionTransitionDivider
            fromSector="06"
            toSector="07"
            label="AUTHENTICATING FINAL ACCESS PORTAL"
          />

          {/* Final Call Matrix Portal */}
          <FinalCtaSection
            onOpenRegister={() => handleOpenRegister("VIP Quantum Pass")}
            onRegisteredCountUpdate={(count) => setRegisteredCount(count)}
          />
        </main>

        {/* Cyberpunk Telemetry Footer */}
        <Footer />
      </SmoothScrollProvider>

      {/* Global Interactive Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCategory={modalCategory}
        onSuccessCountUpdate={(count) => setRegisteredCount(count)}
      />
    </div>
  );
}

export default App;
