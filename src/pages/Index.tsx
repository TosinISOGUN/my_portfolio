import { lazy, Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import HeroSlider from "@/components/HeroSlider";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const TechnicalProficiency = lazy(() => import("@/components/TechnicalProficiency"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const JourneySection = lazy(() => import("@/components/JourneySection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  return (
    <div className="relative">
      <Sidebar />
      <main className="lg:ml-20">
        <HeroSlider />
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <AboutSection />
          <TechnicalProficiency />
          <ProjectsSection />
          <JourneySection />
          <ContactSection />
          {/* Global Bottom Spacer for Mobile Browser Controls */}
          <div className="h-16 md:h-10 lg:h-0 w-full safe-area-bottom" />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
