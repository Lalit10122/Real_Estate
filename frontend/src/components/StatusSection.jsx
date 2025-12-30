import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const statsRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const stats = countersRef.current;

    stats.forEach((stat, index) => {
      const target = stat.dataset.target;
      const isPercentage = target.includes("%");
      const numericTarget = parseInt(target.replace(/[^0-9]/g, ""));

      // Animate the number
      gsap.fromTo(
        stat,
        { innerText: 0 },
        {
          innerText: numericTarget,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: function () {
            const value = Math.ceil(this.targets()[0].innerText);
            if (isPercentage) {
              stat.innerText = value + "%";
            } else {
              stat.innerText = value.toLocaleString() + "+";
            }
          },
          delay: index * 0.2, // Stagger effect
        }
      );

      // Animate the container
      gsap.fromTo(
        stat.parentElement,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay: index * 0.15,
        }
      );
    });
  }, []);

  const stats = [
    { value: "1000+", label: "Properties Listed" },
    { value: "2500+", label: "Happy Customers" },
    { value: "500+", label: "Properties Sold" },
    { value: "98%", label: "Customer Satisfaction" },
  ];

  return (
    <section
      ref={statsRef}
      className="
        hidden md:block
        w-full bg-gradient-to-br from-gray-50 via-white to-gray-50
        py-16 sm:py-20"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative inline-block">
                {/* Decorative background circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full blur-2xl opacity-20 scale-150"></div>

                {/* Number */}
                <h3
                  ref={(el) => (countersRef.current[index] = el)}
                  data-target={stat.value}
                  className="relative text-4xl sm:text-5xl lg:text-6xl font-bold  bg-clip-text text-black"
                >
                  0
                </h3>
              </div>

              {/* Label */}
              <p className="text-neutral-600 text-base sm:text-lg font-medium">
                {stat.label}
              </p>

              {/* Animated underline */}
              <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-gray-400 to-black rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}