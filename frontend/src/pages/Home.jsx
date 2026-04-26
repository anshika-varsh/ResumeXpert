import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────── tiny SVG primitives ─────────────── */
const Sparkle = ({ size = 13, color = "#2563EB" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
  </svg>
);

const Check = ({ size = 8, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ChevRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

/* ─────────────── NAVBAR ─────────────── */
function Navbar({ navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Home",         href: "#home" },
    { label: "Features",     href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 #e5e7eb" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)" }}>
            <Sparkle size={14} color="white" />
          </div>
          <span className="font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "15px" }}>
            AI Resume <span style={{ color: "#2563EB" }}>Builder</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-purple-600 transition font-medium"
            >
              🔐 Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-purple-600 transition font-medium"
            >
              📝 Signup
            </button>

        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" onClick={() => setOpen(!open)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-gray-700" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button 
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="flex-1 text-center py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Login
            </button>
            <button 
              onClick={() => {
                navigate("/signup");
                setOpen(false);
              }}
              className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90" 
              style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)" }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────────── RESUME MOCKUP ─────────────── */
function ResumeMockup() {
  return (
    <div className="relative w-full max-w-xs mx-auto select-none">
      {/* glow */}
      <div
        className="absolute -inset-8 rounded-3xl opacity-50 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center,#BFDBFE,transparent 70%)" }}
      />

      {/* card */}
      <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,.10)" }}>
        {/* browser bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50/80">
          <div className="flex gap-1.5">
            {["#FC5753","#FDBD41","#33C748"].map((c) => (
              <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="flex gap-1.5">
            {["Download","Print","Email"].map((a) => (
              <span key={a} className="border border-gray-200 bg-white rounded-full px-2 py-0.5 text-gray-500" style={{ fontSize: "10px" }}>{a}</span>
            ))}
          </div>
        </div>

        <div className="p-5">
          {/* name block */}
          <div className="mb-4 pb-3 border-b-2 border-blue-500">
            <div className="h-4 w-28 rounded bg-gray-800 mb-1.5" />
            <div className="h-2.5 w-20 rounded bg-blue-400 mb-2" />
            <div className="flex gap-2">
              {[70,85,60].map((w) => <div key={w} className="h-1.5 bg-gray-200 rounded-full" style={{ width: w + "px" }} />)}
            </div>
          </div>

          {/* ATS score */}
          <div className="mb-4 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-gray-500">ATS Score</span>
              <span style={{ color: "#2563EB" }}>94 / 100</span>
            </div>
            <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: "94%", background: "linear-gradient(90deg,#3B82F6,#6366F1)" }} />
            </div>
          </div>

          {/* sections */}
          {[
            { label: "Work History", rows: [78,62] },
            { label: "Skills", chips: ["React","Python","SQL","AWS"] },
            { label: "Education", rows: [68] },
          ].map((sec) => (
            <div key={sec.label} className="mb-3.5">
              <div className="font-bold text-blue-600 uppercase tracking-wider mb-1.5" style={{ fontSize: "8.5px" }}>{sec.label}</div>
              {sec.chips ? (
                <div className="flex flex-wrap gap-1">
                  {sec.chips.map((sk) => (
                    <span key={sk} className="flex items-center gap-1 border border-gray-200 bg-white rounded-full px-2 py-0.5 text-gray-700" style={{ fontSize: "10px" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />{sk}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="space-y-1.5">
                  {sec.rows.map((w,j) => (
                    <div key={j} className="flex gap-2 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                      <div className="h-1.5 bg-gray-100 rounded-full" style={{ width: w + "%" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* footer row */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check size={8} color="#10B981" />
              </span>
              AI Verified
            </span>
            <button className="text-xs font-bold text-white px-3 py-1 rounded-full" style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)" }}>Download</button>
          </div>
        </div>
      </div>

      {/* floating: job match */}
      <div className="absolute -left-10 top-1/3 bg-white rounded-2xl border border-gray-100 shadow-lg px-3 py-2 flex items-center gap-2" style={{ minWidth: "128px" }}>
        <span className="text-xl">🎯</span>
        <div>
          <div className="text-xs font-bold text-gray-800 leading-tight">Job Match</div>
          <div className="text-xs font-semibold" style={{ color: "#10B981" }}>91% Match</div>
        </div>
      </div>

      {/* floating: AI improved */}
      <div className="absolute -right-8 bottom-20 bg-white rounded-2xl border border-gray-100 shadow-lg px-3 py-2 flex items-center gap-2" style={{ minWidth: "128px" }}>
        <span className="text-xl">✨</span>
        <div>
          <div className="text-xs font-bold text-gray-800 leading-tight">AI Improved</div>
          <div className="text-xs font-semibold" style={{ color: "#2563EB" }}>12 Bullets</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 65% 50%,#EFF6FF,transparent 70%), radial-gradient(ellipse 50% 40% at 10% 85%,#F0F9FF,transparent 60%), #fff",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div style={{ animation: "fadeUp .65s ease both" }}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border"
            style={{ background: "#EFF6FF", borderColor: "#BFDBFE" }}
          >
            <Sparkle size={12} color="#2563EB" />
            <span className="text-xs font-bold" style={{ color: "#1D4ED8" }}>AI-Powered Resume Platform</span>
          </div>

          <h1
            className="font-extrabold text-gray-900 leading-[1.1] mb-5"
            style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(2.1rem,5vw,3.4rem)" }}
          >
            Build a{" "}
            <span style={{ color: "#2563EB" }}>Recruiter‑Trusted</span>
            <br />AI Verified Resume
          </h1>

          <p className="text-gray-500 leading-relaxed mb-8 max-w-md" style={{ fontSize: "16px" }}>
            Create professional, ATS-optimised resumes powered by AI — with verified skill badges and real-time job-match scoring that recruiters actually trust.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-px"
              style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)", boxShadow: "0 6px 20px rgba(37,99,235,.35)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              Build My Resume
            </button>
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 transition-all"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M10 8l6 4-6 4V8z" />
              </svg>
              See Demo
            </button>
          </div>

          {/* trust avatars */}
          <div className="flex items-center gap-5">
            <div className="flex -space-x-2">
              {[["AK","#3B82F6"],["JL","#8B5CF6"],["SR","#10B981"],["MO","#F59E0B"]].map(([init,bg]) => (
                <div key={init} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs" style={{ background: bg }}>{init}</div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_,i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
              </div>
              <p className="text-gray-400 font-medium" style={{ fontSize: "12px" }}>Loved by 10,000+ professionals</p>
            </div>
          </div>
        </div>

        {/* Right mockup */}
        <div style={{ animation: "fadeUp .75s .1s ease both" }}>
          <ResumeMockup />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── AI BADGE ─────────────── */
function AiBadge() {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 border"
      style={{ background: "#EFF6FF", borderColor: "#BFDBFE" }}
    >
      <Sparkle size={11} color="#2563EB" />
      <span className="font-bold" style={{ color: "#1D4ED8", fontSize: "11px" }}>AI-powered</span>
    </div>
  );
}

/* ─────────────── FEATURE CARD PREVIEWS ─────────────── */
function StepPreview() {
  return (
    <div className="mt-5 rounded-xl border border-gray-100 bg-white overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}>
      {[
        { done: true,  label: "Step 1 • Personal Details" },
        { done: true,  label: "Step 2 • Professional Summary" },
        { done: false, label: "Step 3 • Skills" },
      ].map((s) => (
        <div key={s.label} className={"flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 text-xs" + (!s.done ? " bg-gray-50/70" : "")}>
          {s.done ? (
            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#10B981" }}>
              <Check size={8} />
            </span>
          ) : (
            <span className="w-5 h-5 rounded-full border-2 border-dashed border-blue-400 flex-shrink-0" />
          )}
          <span className={s.done ? "text-gray-500 font-medium" : "text-gray-900 font-semibold"}>{s.label}</span>
        </div>
      ))}
      <div className="px-4 py-3 flex flex-wrap gap-1.5">
        {["Management Skills +","Leadership +","Computer Skills +","Analytical Thinking +"].map((sk) => (
          <span key={sk} className="border border-gray-200 bg-white rounded-full px-2.5 py-1 text-gray-600" style={{ fontSize: "11px" }}>{sk}</span>
        ))}
      </div>
    </div>
  );
}

function WriterPreview() {
  return (
    <div className="mt-5 rounded-xl border border-gray-100 bg-white p-4" style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}>
      <div className="font-bold text-gray-800 mb-0.5" style={{ fontSize: "13px" }}>Professional Summary</div>
      <p className="text-gray-400 mb-2.5" style={{ fontSize: "11px" }}>Write 2-4 short sentences to interest the reader…</p>
      <div className="flex gap-1 mb-3">
        {["B","I","U","S"].map((f) => (
          <button key={f} className="w-6 h-6 rounded border border-gray-200 hover:bg-gray-50 font-bold text-gray-400 flex items-center justify-center" style={{ fontSize: "11px" }}>{f}</button>
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed" style={{ fontSize: "11.5px" }}>
        Experienced Business Development Manager bringing{" "}
        <span className="underline font-semibold" style={{ color: "#2563EB", textDecorationColor: "#93C5FD" }}>significant value and genuine passion</span>{" "}
        for management, with a proven track record of driving growth…
      </p>
    </div>
  );
}

function JobLinkPreview() {
  return (
    <div className="mt-5 rounded-xl border border-gray-100 bg-white p-4" style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}>
      <div className="flex items-center gap-2.5 mb-3.5 p-2.5 rounded-lg border border-gray-100 bg-gray-50">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
        <span className="text-gray-400 flex-1" style={{ fontSize: "12px" }}>Paste a job link…</span>
        <button className="text-xs font-bold text-white px-2.5 py-1 rounded-lg" style={{ background: "#2563EB", fontSize: "11px" }}>Analyse</button>
      </div>
      <div className="space-y-2.5">
        {[
          ["Required Skills", ["React","TypeScript","Node.js"], "#EFF6FF","#2563EB"],
          ["Your Match",      ["React ✓","TypeScript ✓","Node.js ✓"], "#F0FDF4","#10B981"],
        ].map(([label, tags, bg, color]) => (
          <div key={label}>
            <div className="font-semibold mb-1.5" style={{ fontSize: "10.5px", color: "#6B7280" }}>{label}</div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: "10.5px", background: bg, color }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScorePreview() {
  return (
    <div className="mt-5 rounded-xl border border-gray-100 bg-white p-4" style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-gray-800" style={{ fontSize: "13px" }}>Resume Score</span>
        <span className="font-extrabold" style={{ color: "#2563EB", fontSize: "22px" }}>94</span>
      </div>
      {[
        { label: "ATS Compatibility", pct: 96, color: "#10B981" },
        { label: "Keyword Match",     pct: 88, color: "#2563EB" },
        { label: "Readability",       pct: 92, color: "#8B5CF6" },
      ].map((row) => (
        <div key={row.label} className="mb-3">
          <div className="flex justify-between mb-1" style={{ fontSize: "11px" }}>
            <span className="text-gray-500 font-medium">{row.label}</span>
            <span className="font-bold" style={{ color: row.color }}>{row.pct}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: row.pct + "%", background: row.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── FEATURES SECTION ─────────────── */
function Features() {
  return (
    <section id="features" className="py-24" style={{ background: "#F8FAFF" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#2563EB" }}>Powerful Features</span>
          <h2 className="font-extrabold text-gray-900 mb-4 leading-tight" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            Way beyond a resume builder…
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto" style={{ fontSize: "15px" }}>
            From guided writing to AI skill verification — everything you need to stand out and get hired faster.
          </p>
        </div>

        {/* Row 1 — wide + narrow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
          {/* wide */}
          <div
            className="md:col-span-3 bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ boxShadow: "0 2px 14px rgba(0,0,0,.05)" }}
          >
            <AiBadge />
            <h3 className="font-extrabold text-gray-900 mt-4 mb-2" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "1.3rem" }}>
              Step-by-step guidance
            </h3>
            <p className="text-gray-500 max-w-xs leading-relaxed" style={{ fontSize: "14px" }}>
              No need to think much. We guide you through every section — what to add and where. Clear and simple.
            </p>
            <button className="mt-4 text-sm font-bold flex items-center gap-1.5 group" style={{ color: "#2563EB" }}>
              Create my resume <span className="transition-transform group-hover:translate-x-1"><ChevRight /></span>
            </button>
            <StepPreview />
          </div>

          {/* narrow — AI writes */}
          <div
            className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ boxShadow: "0 2px 14px rgba(0,0,0,.05)" }}
          >
            <AiBadge />
            <h3 className="font-extrabold text-gray-900 mt-4 mb-2" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "1.3rem" }}>
              AI writes for you
            </h3>
            <p className="text-gray-500 leading-relaxed" style={{ fontSize: "14px" }}>
              Speak into the mic and AI fixes mistakes. Click to add professional phrases instantly.
            </p>
            <WriterPreview />
          </div>
        </div>

        {/* Row 2 — two equal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            className="bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ boxShadow: "0 2px 14px rgba(0,0,0,.05)" }}
          >
            <AiBadge />
            <h3 className="font-extrabold text-gray-900 mt-4 mb-2" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "1.3rem" }}>
              Paste any job link
            </h3>
            <p className="text-gray-500 leading-relaxed" style={{ fontSize: "14px" }}>
              Drop in a job posting URL and our AI instantly highlights skill gaps and matches, tailoring your resume automatically.
            </p>
            <JobLinkPreview />
          </div>

          <div
            className="bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ boxShadow: "0 2px 14px rgba(0,0,0,.05)" }}
          >
            <AiBadge />
            <h3 className="font-extrabold text-gray-900 mt-4 mb-2" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "1.3rem" }}>
              Resume score analyser
            </h3>
            <p className="text-gray-500 leading-relaxed" style={{ fontSize: "14px" }}>
              Get an instant ATS score with actionable suggestions covering readability, keywords, and recruiter appeal.
            </p>
            <ScorePreview />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── HOW IT WORKS ─────────────── */
const STEPS = [
  {
    n: "01",
    title: "Choose a Template",
    desc: "Pick an ATS-friendly template built to impress employers and pass resume-scanning software with ease.",
    iconPaths: [
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2",
      "M9 5a2 2 0 002 2h2a2 2 0 002-2",
      "M9 12h6M9 16h4",
    ],
  },
  {
    n: "02",
    title: "AI Enhances Your Content",
    desc: "Click or tap to add job-specific content written by AI — bullet points, summaries, and skill suggestions.",
    iconPaths: ["M12 2a10 10 0 100 20 10 10 0 000-20z","M12 6v6l4 2"],
  },
  {
    n: "03",
    title: "Download & Apply",
    desc: "Export a polished, recruiter-ready resume as PDF, DOCX, or TXT and start applying with confidence today.",
    iconPaths: ["M12 2v14","M7 11l5 5 5-5","M3 21h18"],
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#2563EB" }}>Simple Process</span>
          <h2 className="font-extrabold text-gray-900 mb-4 leading-tight" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            Build Your Winning Resume in{" "}
            <span style={{ color: "#2563EB" }}>3 Easy Steps</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto" style={{ fontSize: "15px" }}>
            From blank page to interview-ready in minutes — guided by AI every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* dashed connector line */}
          <div
            className="hidden md:block absolute border-t-2 border-dashed border-blue-100 pointer-events-none"
            style={{ top: "56px", left: "calc(16.66% + 28px)", right: "calc(16.66% + 28px)" }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="relative bg-white border border-gray-100 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ boxShadow: "0 2px 14px rgba(0,0,0,.05)" }}
            >
              {/* ghost number */}
              <div
                className="absolute top-4 right-5 font-extrabold text-gray-100 leading-none pointer-events-none select-none"
                style={{ fontSize: "56px", fontFamily: "Bricolage Grotesque,sans-serif" }}
              >
                {step.n}
              </div>

              {/* icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white"
                style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)", boxShadow: "0 6px 18px rgba(37,99,235,.28)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {step.iconPaths.map((d, j) => <path key={j} d={d} />)}
                </svg>
              </div>

              <h3 className="font-extrabold text-gray-900 mb-2.5" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "1.1rem" }}>
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed" style={{ fontSize: "14px" }}>{step.desc}</p>

              {/* connector chevron */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex absolute -right-3.5 top-14 z-20 w-7 h-7 bg-white border border-gray-100 rounded-full items-center justify-center shadow-sm text-gray-400">
                  <ChevRight />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="px-9 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-px"
            style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)", boxShadow: "0 6px 20px rgba(37,99,235,.30)" }}
          >
            Build my resume
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MINI FEATURES GRID ─────────────── */
const MINI_FEATURES = [
  { emoji: "🚀", bg: "#FFF7ED", title: "Build in minutes",              desc: "Create or update your resume with powerful AI. No writing experience needed." },
  { emoji: "🎨", bg: "#F0FDF4", title: "ATS-friendly templates",        desc: "Pick from 100+ templates customisable to match your style and industry." },
  { emoji: "✍️", bg: "#EFF6FF", title: "Professional content suggestions", desc: "Overcome writer's block with job-specific bullet points written by AI analysts." },
  { emoji: "🔍", bg: "#FDF4FF", title: "ATS compatibility scan",         desc: "Analyse your resume for 30+ ATS issues and implement expert-recommended fixes." },
  { emoji: "💡", bg: "#FFFBEB", title: "Resume examples library",        desc: "Browse professionally made samples for your job title or industry as inspiration." },
  { emoji: "🏆", bg: "#F0FDF4", title: "Outperform the competition",     desc: "Access career coaching, expert webinars, and networking guidance to land your next role." },
];

function MiniFeatures() {
  return (
    <section className="py-24" style={{ background: "#F8FAFF" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#2563EB" }}>Everything You Need</span>
          <h2 className="font-extrabold text-gray-900 mb-4 leading-tight" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            Get Hired Faster With{" "}
            <span style={{ color: "#2563EB" }}>AI Resume Builder</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MINI_FEATURES.map((f) => (
            <div key={f.title} className="group">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: f.bg }}
              >
                {f.emoji}
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "1.05rem" }}>
                {f.title}
              </h3>
              <p className="text-gray-500 leading-relaxed" style={{ fontSize: "14px" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CTA BAND ─────────────── */
function CtaBand() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="rounded-3xl px-8 py-14 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden"
          style={{ background: "linear-gradient(120deg,#EFF6FF 0%,#EEF2FF 60%,#F0FDF4 100%)" }}
        >
          {/* blobs */}
          <div className="absolute -top-14 -right-14 w-60 h-60 rounded-full opacity-40 blur-3xl pointer-events-none" style={{ background: "#BFDBFE" }} />
          <div className="absolute bottom-0 left-1/3 w-44 h-44 rounded-full opacity-25 blur-2xl pointer-events-none" style={{ background: "#C7D2FE" }} />

          {/* copy */}
          <div className="relative flex-1">
            <h2 className="font-extrabold text-gray-900 mb-3 leading-tight" style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
              Join over <span style={{ color: "#2563EB" }}>10,000+</span> resume makers
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm" style={{ fontSize: "15px" }}>
              Start now and get hired faster. No credit card required — free forever plan available.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-px"
                style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)", boxShadow: "0 6px 20px rgba(37,99,235,.3)" }}
              >
                Create my resume
              </button>
              <button className="border border-gray-200 bg-white px-7 py-3.5 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
                See a demo
              </button>
            </div>
          </div>

          {/* company pills */}
          <div className="relative flex-shrink-0">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-3">Land roles at top companies</div>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Amazon", letter: "a", bg: "#FF9900" },
                { name: "Google", letter: "G", bg: "#4285F4" },
                { name: "Airbnb", letter: "A", bg: "#FF5A5F" },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-2.5" style={{ minWidth: "155px" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: c.bg }}>
                    {c.letter}
                  </div>
                  <span className="font-semibold text-gray-800 text-sm flex-1">{c.name}</span>
                  <ChevRight />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  const cols = [
    { head: "Product", links: ["Features","How It Works","Templates","Resume Score"] },
    { head: "Company", links: ["About","Blog","Careers","Contact"] },
    { head: "Legal",   links: ["Privacy Policy","Terms","Cookies"] },
  ];
  const socials = [
    { label: "Twitter",  d: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
    { label: "LinkedIn", d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
    { label: "GitHub",   d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm" style={{ background: "linear-gradient(135deg,#2563EB,#4F46E5)" }}>
                <Sparkle size={13} color="white" />
              </div>
              <span className="font-extrabold text-gray-900" style={{ fontFamily: "Bricolage Grotesque,sans-serif" }}>
                AI Resume <span style={{ color: "#2563EB" }}>Builder</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ maxWidth: "190px" }}>
              The most trusted AI-powered resume platform for modern job seekers.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.head}>
              <h4 className="font-bold text-gray-900 text-sm mb-4">{col.head}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-gray-400 text-sm hover:text-gray-700 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2025 AI Resume Builder. All rights reserved.</p>
          <div className="flex items-center gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label} href="#" aria-label={s.label}
                className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors shadow-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── ROOT ─────────────── */
export default function Home() {
  const navigate = useNavigate();
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; margin: 0; background: white; color: #111827; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Navbar navigate={navigate} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <MiniFeatures />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}