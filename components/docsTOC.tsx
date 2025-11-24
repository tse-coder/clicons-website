import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DocsTOC({
  headings,
}: {
  headings: { id: string; text: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // measure heights dynamically
  const [offsets, setOffsets] = useState<number[]>([]);

  useEffect(() => {
    const measure = () => {
      const newOffsets = linkRefs.current.map((el) =>
        el ? el.offsetTop : 0
      );
      setOffsets(newOffsets);
    };

    // measure after mount + whenever window resizes
    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, [headings]);

  // scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      let current = null;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = h.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const activeIndex = headings.findIndex((h) => h.id === active);
  const indicatorY = activeIndex >= 0 ? offsets[activeIndex] ?? 0 : 0;

  return (
    <aside className="fixed right-0 top-20 w-60 h-full overflow-y-auto p-4 hidden lg:block">
      <nav className="relative">

        {/* background line */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-muted" />

        {/* animated indicator */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="absolute left-0 w-[2px] bg-primary rounded-full"
          style={{
            height: 32,
            translateY: indicatorY,
          }}
        />

        <div className="space-y-2 ml-4">
          {headings.map((h, i) => (
            <motion.a
              key={h.id}
              href={`#${h.id}`}
              ref={(el) => {linkRefs.current[i] = el}}
              className={cn(
                "block py-2 text-sm transition-colors rounded-md",
                active === h.id
                  ? "bg-accent/40 text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/20"
              )}
              whileHover={{ x: 4 }}
            >
              {h.text}
            </motion.a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
