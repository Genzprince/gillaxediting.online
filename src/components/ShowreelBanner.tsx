import { motion } from "motion/react";
import { Clock, Sparkles, Eye, Award, Zap } from "lucide-react";

export default function ShowreelBanner() {
  return (
    <div className="w-full bg-[var(--bg-primary)] overflow-hidden relative font-sans">

      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-16 py-12 md:py-16 relative z-10">

        <div className="relative rounded-3xl overflow-hidden border border-neutral-900 bg-neutral-950/80 shadow-2xl">

          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/70 to-transparent z-10" />

          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <div className="absolute inset-6 border border-white/[0.015] rounded-2xl pointer-events-none">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/5" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/5" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/5" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-10">
                <div className="w-3 h-[1px] bg-white/30 absolute" />
                <div className="h-3 w-[1px] bg-white/30 absolute" />
              </div>
            </div>
          </div>

          <div className="relative z-20 p-6 sm:p-10 md:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[440px]">

            <div className="lg:col-span-7 space-y-6">

              <div className="inline-flex items-center space-x-2 bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-neutral-400 font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                <span>EXPERIENCE & Skill Level</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
                  PRINCE CREATIVE <br className="hidden sm:inline" />
                  <span className="inline-block relative px-4 py-1 leading-normal">
                    {/* Orbiting border via rotating conic-gradient */}
                    <span
                      className="absolute inset-0 rounded-lg p-[1.5px] pointer-events-none"
                      style={{ background: "conic-gradient(from var(--orbit-angle, 0deg), transparent 60%, white 75%, transparent 90%)", animation: "orbit-border 3s linear infinite", borderRadius: "8px" }}
                    >
                      <span className="block w-full h-full rounded-lg" style={{ background: "#0a0a0a" }} />
                    </span>
                    <span
                      className="relative bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(90deg, #737373 0%, #ffffff 50%, #737373 100%)" }}
                    >
                      SHOWREEL 2026
                    </span>
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-lg leading-relaxed">
                 A collection of client projects and personal work, showcasing my editing style, creative process, and technical skills.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-y border-neutral-900/60 py-5 max-w-md">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-neutral-500">
                    <Eye className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider leading-none">Combine Views</span>
                  </div>
                  <p className="text-xl font-display font-black text-white">35M+</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-neutral-500">
                    <Zap className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider leading-none">AVG. RETENTION</span>
                  </div>
                  <p className="text-xl font-display font-black text-white">82%</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-neutral-500">
                    <Award className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider leading-none">Hours Edited</span>
                  </div>
                  <p className="text-xl font-display font-black text-white">500+</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="relative inline-flex items-center justify-center space-x-3 bg-neutral-900/90 border border-neutral-800 text-neutral-400 font-mono text-[11px] font-black tracking-widest uppercase py-4 px-8 rounded-xl shadow-inner cursor-not-allowed opacity-80 select-none"
                >
                  <Clock className="w-4 h-4 text-neutral-500 relative z-10" />
                  <span className="relative z-10">COMING SOON</span>
                </button>
              </div>

            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                whileHover={{ y: -4, scale: 1.015, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.5)" }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="relative group overflow-hidden w-full max-w-sm bg-neutral-950 border border-neutral-900 p-8 rounded-2xl space-y-5 cursor-pointer transition-all duration-200"
              >
                {/* Orbiting border effect — same as SHOWREEL 2026 */}
                <span
                  className="absolute inset-0 rounded-2xl p-[1.5px] pointer-events-none z-0"
                  style={{ background: "conic-gradient(from var(--orbit-angle, 0deg), transparent 60%, white 75%, transparent 90%)", animation: "orbit-border 3s linear infinite", borderRadius: "16px" }}
                >
                  <span className="block w-full h-full rounded-2xl" style={{ background: "#030303" }} />
                </span>

                <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 font-black block uppercase">
                    EDIT SPECIFICATIONS
                  </span>

                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[12px] font-bold text-white">
                        <span>Editing Style</span>
                        <span className="text-neutral-300 font-mono">High Retention</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-light leading-relaxed">Fast pacing • Seamless cuts • Motion-driven transitions • Visual storytelling • Rhythm-based editing</p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[12px] font-bold text-white">
                        <span>Motion Graphics</span>
                        <span className="text-neutral-300 font-mono">Premium Animation</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-light leading-relaxed">Kinetic typography • UI animations • 2D motion design • Tracking • Clean compositing</p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[12px] font-bold text-white">
                        <span>Sound Design</span>
                        <span className="text-neutral-300 font-mono">100% Custom</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-light leading-relaxed">Layered ambience • Custom risers • Impact hits • Precision SFX • Clean audio mix</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-900/60 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase">SOFTWARE USED</span>
                    <span className="text-[9px] font-mono text-white bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">PREMIERE & AE</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
