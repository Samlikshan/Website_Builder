import { Card } from "./ui/card";
import { MessageSquare, Wand2, Globe, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Describe Your Vision",
    description:
      "Tell our AI what kind of website you want. Be as detailed or simple as you like - our AI understands natural language perfectly.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "AI Works Its Magic",
    description:
      "Our advanced AI analyzes your requirements and generates a complete website with modern design, clean code, and optimized performance.",
  },
  {
    icon: Globe,
    step: "03",
    title: "Review & Customize",
    description:
      "Preview your website and make any adjustments. Change colors, fonts, sections, or content with simple commands.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Scale",
    description:
      "Deploy your website instantly to the web. Get hosting, SSL certificates, and CDN automatically configured for optimal performance.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From idea to live website in minutes. Our AI handles all the
            technical complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}

              <Card className="relative z-10 p-8 border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-secondary text-center group hover:scale-[1.02]">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-primary font-bold text-sm tracking-wide">
                    STEP {step.step}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
