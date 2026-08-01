import ParallaxBackground from "./components/ParallaxBackground";
import LogoRow from "./components/LogoRow";

import syntestLogo from "./assets/syntest-logo.png"; // or png

/**
 * Tiny trick to match that “powered by / your saliva” wrap in Figma.
 * Replace with <br /> if you prefer.
 */
function MeaningfulBreak() {
  return <span className="hidden sm:inline"> </span>;
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-white text-ink overflow-hidden">
      <ParallaxBackground />

      <header className="relative z-20">
        <div className="w-full px-4 sm:px-6 md:px-8 pt-6 pb-4 flex items-center">
          <img src={syntestLogo} alt="SynTest" className="h-[76px] sm:h-[86px] w-auto" />
        </div>
      </header>

      <main className="relative z-10 pb-3">
        <section className="relative min-h-[78vh] flex items-center">
          <div className="relative w-full">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <h1 className="text-[26px] sm:text-[34px] lg:text-[40px] font-medium tracking-tight">
                <span>The future of molecular screening starts </span>
                <span className="text-tealSoft">starts</span>
                <MeaningfulBreak />
                <span className="text-tealSoft">with saliva</span>
                <span>.</span>
              </h1>

              <p className="mt-5 text-sm sm:text-base text-slate-600">
                Building the infrastructure for point-of-care molecular screening, beginning with a 5-minute saliva test for early oral cancer.
              </p>

              <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base text-slate-600">
                Too many diseases are detected too late. We're building a new generation of rapid point-of-care molecular diagnostics, beginning with a 5-minute saliva test for early oral cancer and expanding to additional diseases over time.
              </p>

              <div className="mt-8 flex items-center justify-center gap-6">
                <a
                  href="https://calendar.app.google/d6qnaCpwDtKpnmFFA"
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm shadow-sm hover:shadow transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a Call
                </a>

                <a
                  href="mailto:aruesha@syntestlabs.com"
                  className="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900"
                >
                  For dentists &amp; partners
                </a>
              </div>
            </div>

            <div className="mt-14 pb-1 sm:pb-2">
              <LogoRow />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
