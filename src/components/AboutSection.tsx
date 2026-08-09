import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Heart, Eye, PenTool } from "lucide-react";

export default function AboutSection() {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  
  const words = [
    { text: "stories", color: "text-[var(--accent-color)]" },
    { text: "Emotions", color: "text-[var(--accent-color)]" },
    { text: "experience", color: "text-[var(--accent-color)]" },
    { text: "connection", color: "text-[var(--accent-color)]" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  const PILLARS = [
    {
      title: "Audience Psychology",
      desc: "Every cut is a contract with the viewer's attention. I align visual beats with natural micro-intervals of interest, preventing scrolling reflexes.",
      icon: Brain
    },
    {
      title: "Emotional Pacing",
      desc: "I edit with physical pacing—matching transition flow to natural respiratory and heartbeat cycles so that tension and release feel biological.",
      icon: Heart
    },
    {
      title: "Viewer Retention",
      desc: "Retention isn't random. By planting curiosity loops and pattern interrupts at critical drop-off zones, I keep engagement curves flat.",
      icon: Eye
    },
    {
      title: "Script Architecture",
      desc: "An editor is the final script writer. I dissect raw dialogue, delete circular explanations, and re-sequence scenes for maximum narrative punch.",
      icon: PenTool
    }
  ];

  const pillarGradients = [
    "from-[var(--accent-color)]/10 via-[var(--accent-color)]/5 to-transparent",
    "from-[var(--accent-color)]/10 via-[var(--accent-color)]/5 to-transparent",
    "from-[var(--accent-color)]/10 via-[var(--accent-color)]/5 to-transparent",
    "from-[var(--accent-color)]/10 via-[var(--accent-color)]/5 to-transparent",
  ];

  return (
    <section id="about" className="relative py-12 md:py-16 bg-[var(--bg-primary)] px-3 sm:px-6 md:px-12 xl:px-16 border-t border-[var(--border-color)] overflow-hidden transition-colors duration-500">
      
      {/* Structural grid representing high-end editorial page */}
      <div className="w-full max-w-[1440px] mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Column 1: Core Statement & Editorial Side Info */}
          <div className="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-24">
            
            {/* Meta label */}
            <div className="inline-flex items-center space-x-2 bg-[var(--accent-bg-trans)] border border-[var(--accent-color)]/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[var(--accent-color)] font-bold uppercase w-fit shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
              <span>THE PHILOSOPHY</span>
            </div>
...
            {/* Accent statement */}
            <div className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[var(--text-primary)] transition-colors duration-500 space-y-4">
              {/* Part 1: I don't edit pixels. with dynamic red strikethrough line */}
              <div className="relative inline-block w-fit">
                <span className="relative inline-block">
                  "I don’t edit pixels.
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-[15%] right-[15%] top-[55%] h-[3.5px] bg-red-500 dark:bg-red-400 origin-left rounded-full"
                  />
                </span>
              </div>

              {/* Part 3: I craft [changing text] */}
              <div className="flex flex-wrap items-center gap-x-2 text-3xl sm:text-4xl md:text-5xl pt-1">
                <span className="inline-block">I craft</span>
                
                <span className="inline-block relative min-w-[160px] sm:min-w-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWordIdx}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`inline-block font-black underline decoration-3 underline-offset-4 ${words[currentWordIdx].color}`}
                    >
                      {words[currentWordIdx].text}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>

              <div className="block text-2xl sm:text-3xl text-[var(--text-secondary)] mt-1 italic font-medium">
                that people feel."
              </div>
            </div>

            {/* Short narrative */}
            <p className="text-sm font-mono text-[var(--text-secondary)] leading-relaxed max-w-sm transition-colors duration-500">
              Software is just a tool. A monkey can press buttons to split clips. A master uses the cuts to sculpt anticipation, dread, humor, and triumph.
            </p>

            {/* Vertical timeline card representing a story journey */}
            <motion.div 
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                boxShadow: "0 10px 20px -10px rgba(0,0,0,0.15), 0 0 10px -3px var(--accent-color)"
              }}
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--accent-color)]/60 rounded-xl shadow-xs space-y-4 max-w-md cursor-default transition-colors duration-150"
            >
              <span className="text-[10px] font-mono tracking-wider text-[var(--text-secondary)]">THE PRINCE PRINCIPLE</span>
              <div className="h-[2px] w-full rounded-full" style={{ background: "var(--cozy-line)" }} />
              <p className="text-xs text-[var(--text-primary)] dark:opacity-80 opacity-95 leading-relaxed italic">
                "Anyone can download a template. But standardizing visual templates creates visual noise. To be remembered, your film must breathe uniquely, carrying the viewer through an uninterrupted sensory loop."
              </p>
            </motion.div>

          </div>

          {/* Column 2: Deep Dive into the Psychological Pillars */}
          <div className="lg:col-span-7 flex flex-col space-y-12">
            
            {/* Sub-intro copy */}
            <div className="space-y-6">
              <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
                Understanding Humans is the Ultimate Editing Hack.
              </h3>
              <p className="text-base text-[var(--text-primary)] dark:opacity-80 opacity-95 leading-relaxed transition-colors duration-500">
                Before double-clicking on import bins, I ask: <em className="text-[var(--text-primary)] font-medium font-serif">What should the viewer feel right now?</em> Why would they stay for another minute? By treating raw files as raw emotional elements, I engineer experiences that keep people staring at screens until the very last frame.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                const currentGradient = pillarGradients[idx % pillarGradients.length];
                return (
                  <motion.div
                     key={idx}
                     whileHover={{ y: -8, scale: 1.02, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.25)" }}
                     transition={{ type: "spring", stiffness: 450, damping: 18 }}
                     className="relative group overflow-hidden p-6 bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--accent-color)]/60 rounded-xl transition-all duration-150 flex flex-col space-y-4 cursor-pointer"
                  >
                    {/* Inner card dynamic color change gradient glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentGradient} opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300 pointer-events-none`} />

                    <div className="relative z-10 flex flex-col space-y-4">
                      {/* Icon with elegant accent circle */}
                      <div className="w-10 h-10 rounded-full bg-[var(--accent-bg-trans)] flex items-center justify-center text-[var(--accent-color)] group-hover:scale-105 transition-all duration-250 shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <h4 className="font-display text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] uppercase tracking-wide transition-colors duration-250">
                        {pillar.title}
                      </h4>

                      <p className="text-xs text-[var(--text-primary)] dark:opacity-75 opacity-95 leading-relaxed font-normal dark:font-light transition-colors duration-250">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* Subtle light blooms for premium visual styling removed to make page responsive */}
    </section>
  );
}
