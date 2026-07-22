"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    image: "/assets/hero-pharmacy-night.png",
    alt: "Монос Эмийн сан - шөнийн харагдац",
    title: "Read Our Blog",
    description:
      "Our blog takes the message from the weekend and lays out next right steps, so you can hear a message and do a message in practical ways.",
  },
  {
    id: 2,
    image: "/assets/hero-pharmacy-day.jpg",
    alt: "Монос Эмийн сан - өдрийн харагдац",
    title: "Read Our Blog",
    description:
      "Our blog takes the message from the weekend and lays out next right steps, so you can hear a message and do a message in practical ways.",
  },
  {
    id: 3,
    image: "/assets/hero-beauty.jpg",
    alt: "Монос Гоо сайхны булан",
    title: "Read Our Blog",
    description:
      "Our blog takes the message from the weekend and lays out next right steps, so you can hear a message and do a message in practical ways.",
  },
  {
    id: 4,
    image: "/assets/hero-store.jpg",
    alt: "Монос дэлгүүрийн дотоод",
    title: "Read Our Blog",
    description:
      "Our blog takes the message from the weekend and lays out next right steps, so you can hear a message and do a message in practical ways.",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [isHovered]);

  const goToPrev = () =>
    setActive((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const goToNext = () => setActive((prev) => (prev + 1) % heroSlides.length);

  const currentSlide = heroSlides[active];

  return (
    <div
      className="group relative w-full overflow-hidden rounded-xl border border-default bg-background-tertiary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[420px] w-full sm:h-[560px] lg:h-[410px]">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1008px) 1007px, 100vw"
            className={cn(
              "object-cover transition-opacity duration-700 ease-out",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center",
            "bg-[#001233]/0 backdrop-blur-0 transition-all duration-500 ease-out",
            "group-hover:bg-[rgba(0,0,0,0.4)] group-hover:backdrop-blur-[2px]",
          )}
        >
          <div
            className={cn(
              "max-w-xl translate-y-2 px-6 text-center opacity-0 transition-all duration-500 ease-out",
              "group-hover:translate-y-0 group-hover:opacity-100",
            )}
          >
            <h3 className="text-background text-[20px] font-semibold">
              {currentSlide.title}
            </h3>
            <p className="body-1-regular mt-3 text-background text-[15px]">
              {currentSlide.description}
            </p>
          </div>
        </div>

        <Button
          type="button"
          aria-label="Өмнөх слайд"
          variant="brandSecondary"
          onClick={goToPrev}
          className={cn(
            "absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center sm:left-8",
            "opacity-0 pointer-events-none transition-all duration-300",
            "group-hover:opacity-100 group-hover:pointer-events-auto",
            "hover:bg-black/40 hover:backdrop-blur-[2px]",
          )}
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2} />
        </Button>

        <Button
          type="button"
          aria-label="Дараагийн слайд"
          variant="brandSecondary"
          onClick={goToNext}
          className={cn(
            "absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center sm:right-8",
            "opacity-0 pointer-events-none transition-all duration-300",
            "group-hover:opacity-100 group-hover:pointer-events-auto",
            "hover:bg-black/40 hover:backdrop-blur-[2px]",
          )}
        >
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </Button>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`${index + 1}-р слайд руу шилжих`}
            onClick={() => setActive(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 focus-ring",
              index === active
                ? "w-6 bg-brand-500"
                : "w-2 bg-white/60 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}
