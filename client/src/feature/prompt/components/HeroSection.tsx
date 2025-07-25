import { Button } from "./ui/button";
import { Play } from "lucide-react";
import heroBg from "../../../assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Added pt-16 for navbar space */}
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Build Websites with{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            AI Magic
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Transform your ideas into stunning websites in minutes. No coding
          required. Just describe what you want, and watch AI bring your vision
          to life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" variant="gradient" className="min-w-[140px]">
            Try Now
          </Button>
          <Button size="lg" variant="premium" className="min-w-[140px]">
            <Play className="w-4 h-4 mr-2" />
            See How It Works
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
    </section>
  );
};
