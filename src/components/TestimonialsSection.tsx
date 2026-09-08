import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Tosin approaches frontend engineering with a product mindset that's rare to find. He doesn't just build what's asked, he questions whether it's the right thing to build and then ships it faster than expected. His work on our enterprise dashboards raised the bar for what the team thought was possible.",
    name: "Team Lead",
    title: "AFT Solutions Limited",
  },
  {
    quote:
      "Working with Tosin means getting someone who cares about the details users notice: the loading states, the empty states, the transition timing. The product felt finished in a way that our previous iterations didn't.",
    name: "Project Manager",
    title: "Client Project",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="section-padding bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="What People Say" subtitle="Testimonials" />

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="skill-card relative overflow-hidden"
            >
              <Quote
                size={48}
                className="absolute -top-2 -right-2 text-primary/10 rotate-180"
              />
              <div className="relative">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Detailed references available on request.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
