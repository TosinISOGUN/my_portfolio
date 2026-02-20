import { lazy, Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import HeroSlider from "@/components/HeroSlider";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const CoreStacksSection = lazy(() => import("@/components/CoreStacksSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  return (
    <div className="relative">
      <Sidebar />
      <main className="lg:ml-20">
        <HeroSlider />
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <AboutSection />
          <CoreStacksSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
