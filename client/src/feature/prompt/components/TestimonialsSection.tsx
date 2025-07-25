import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Startup Founder",
    avatar: "/api/placeholder/40/40",
    content:
      "Built my SaaS landing page in minutes. The AI understood exactly what I needed and delivered a conversion-optimized design.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Freelance Designer",
    avatar: "/api/placeholder/40/40",
    content:
      "As a designer, I was skeptical. But the quality and attention to detail blew me away. It's like having a senior developer on demand.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "E-commerce Owner",
    avatar: "/api/placeholder/40/40",
    content:
      "Launched my online store in under an hour. The AI even optimized the checkout flow for better conversions. Incredible!",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Digital Agency CEO",
    avatar: "/api/placeholder/40/40",
    content:
      "We use this for rapid prototyping with clients. It's revolutionized our workflow and impressed every single client.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Content Creator",
    avatar: "/api/placeholder/40/40",
    content:
      "Finally, a tool that gets it right the first time. My portfolio site looks professionally designed and loads lightning fast.",
    rating: 5,
  },
  {
    name: "Alex Kumar",
    role: "Tech Entrepreneur",
    avatar: "/api/placeholder/40/40",
    content:
      "The code quality is production-ready. Clean, semantic, and optimized. It's like having a full development team.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the community of creators, entrepreneurs, and agencies who
            trust AI Builder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-background group"
            >
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
