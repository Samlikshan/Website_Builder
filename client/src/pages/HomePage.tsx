import { AnimatedBackground } from "../feature/prompt/components/AnimatedBackground";
import { Navbar } from "../feature/prompt/components/Navbar";
import { HeroSection } from "../feature/prompt/components/HeroSection";
import { WebsiteBuilder } from "../feature/prompt/components/WebsiteBuilder";
import { FeaturesSection } from "../feature/prompt/components/FeaturesSection";
import { HowItWorksSection } from "../feature/prompt/components/HowItWorksSection";
import { TestimonialsSection } from "../feature/prompt/components/TestimonialsSection";
import { Footer } from "../feature/prompt/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <WebsiteBuilder />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
