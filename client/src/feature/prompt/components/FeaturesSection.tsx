import { Card } from "./ui/card";
import { Zap, Palette, Code, Sparkles, Globe, Rocket } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Generate complete websites in under 60 seconds with our advanced AI engine.",
  },
  {
    icon: Palette,
    title: "Beautiful Designs",
    description:
      "Professional templates and color schemes that adapt to your brand identity.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description:
      "Semantic HTML, optimized CSS, and modern JavaScript - ready for production.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description:
      "Leverages cutting-edge AI models to understand and implement your vision.",
  },
  {
    icon: Globe,
    title: "Responsive",
    description:
      "Every website is fully responsive and optimized for all devices by default.",
  },
  {
    icon: Rocket,
    title: "Deploy Instantly",
    description:
      "One-click deployment to popular hosting platforms with automatic optimization.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Modern Websites
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create stunning websites that convert
            visitors into customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-secondary group hover:scale-[1.02]"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
