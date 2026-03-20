import { useState } from "react";

/* ── shared micro-components ── */
const Sparkle = ({ size = 14, color = "#2563EB" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.84l6.08-6.08C34.42 3.02 29.5 1 24 1 14.82 1 7.06 6.48 3.62 14.28l7.08 5.5C12.38 13.5 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.14-3.14-.4-4.62H24v8.74h12.42c-.54 2.88-2.18 5.32-4.64 6.96l7.14 5.54C43.14 37.04 46.1 31.24 46.1 24.5z" />
    <path fill="#FBBC05" d="M10.7 28.28A14.6 14.6 0 019.5 24c0-1.48.26-2.92.7-4.28l-7.08-5.5A23.94 23.94 0 001 24c0 3.86.92 7.5 2.62 10.72l7.08-6.44z" />
    <path fill="#34A853" d="M24 47c6.48 0 11.92-2.14 15.9-5.82l-7.14-5.54c-2 1.34-4.56 2.14-8.76 2.14-6.26 0-11.62-4-13.3-9.5l-7.08 6.44C7.06 41.52 14.82 47 24 47z" />
  </svg>
);

/* ── LEFT PANEL — AI Resume Illustration ── */
function LoginIllustration() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg,#0F172A 0%,#1E3A8A 55%,#1D4ED8 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Animated mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob blob-1" style={{ position:"absolute", width:340, height:340, borderRadius:"50%", background:"rgba(99,102,241,.18)", top:-80, left:-60, animation:"blobFloat 8s ease-in-out infinite" }} />
        <div className="blob blob-2" style={{ position:"absolute", width:260, height:260, borderRadius:"50%", background:"rgba(59,130,246,.14)", bottom:80, right:-80, animation:"blobFloat 10s 2s ease-in-out infinite" }} />
        <div className="blob blob-3" style={{ position:"absolute", width:180, height:180, borderRadius:"50%", background:"rgba(16,185,129,.12)", bottom:"35%", left:"10%", animation:"blobFloat 7s 1s ease-in-out infinite" }} />
        {/* subtle grid */}
        <svg width="100%" height="100%" style={{ opacity:.06, position:"absolute", inset:0 }}>
          <defs>
            <pattern id="lgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lgrid)" />
        </svg>
      </div>

      {/* Logo */}
      <div className="relative z-10 p-8">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"rgba(255,255,255,.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.2)" }}>
            <Sparkle size={16} color="white" />
          </div>
          <span className="text-white font-extrabold text-base tracking-tight" style={{ fontFamily:"Bricolage Grotesque,sans-serif" }}>
            AI Resume <span style={{ color:"#93C5FD" }}>Builder</span>
          </span>
        </div>
      </div>

      {/* Main illustration */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8">
        <div style={{ animation:"slideUp .9s ease both" }}>
          {/* Central resume-AI visual */}
          <svg viewBox="0 0 360 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:340 }}>
            {/* Resume document */}
            <rect x="60" y="40" width="200" height="260" rx="12" fill="white" fillOpacity=".08" stroke="white" strokeOpacity=".18" strokeWidth="1.5" />
            <rect x="60" y="40" width="200" height="260" rx="12" fill="url(#cardGrad)" />
            {/* Header bar */}
            <rect x="60" y="40" width="200" height="52" rx="12" fill="white" fillOpacity=".06" />
            <circle cx="96" cy="66" r="16" fill="white" fillOpacity=".15" />
            <circle cx="96" cy="66" r="10" fill="white" fillOpacity=".2" />
            {/* name lines */}
            <rect x="120" y="56" width="80" height="7" rx="3.5" fill="white" fillOpacity=".6" />
            <rect x="120" y="69" width="55" height="5" rx="2.5" fill="white" fillOpacity=".3" />
            {/* Section: experience */}
            <rect x="76" y="110" width="40" height="4" rx="2" fill="#93C5FD" fillOpacity=".8" />
            <rect x="76" y="120" width="164" height="3" rx="1.5" fill="white" fillOpacity=".25" />
            <rect x="76" y="128" width="140" height="3" rx="1.5" fill="white" fillOpacity=".18" />
            <rect x="76" y="136" width="155" height="3" rx="1.5" fill="white" fillOpacity=".18" />
            {/* Section: skills */}
            <rect x="76" y="155" width="32" height="4" rx="2" fill="#6EE7B7" fillOpacity=".8" />
            <rect x="76" y="166" width="44" height="16" rx="8" fill="white" fillOpacity=".1" stroke="white" strokeOpacity=".2" strokeWidth="1" />
            <rect x="126" y="166" width="44" height="16" rx="8" fill="white" fillOpacity=".1" stroke="white" strokeOpacity=".2" strokeWidth="1" />
            <rect x="176" y="166" width="44" height="16" rx="8" fill="white" fillOpacity=".1" stroke="white" strokeOpacity=".2" strokeWidth="1" />
            <rect x="76" y="188" width="44" height="16" rx="8" fill="white" fillOpacity=".1" stroke="white" strokeOpacity=".2" strokeWidth="1" />
            {/* ATS score bar */}
            <rect x="76" y="220" width="164" height="4" rx="2" fill="white" fillOpacity=".08" />
            <rect x="76" y="220" width="148" height="4" rx="2" fill="url(#scoreGrad)" />
            <rect x="76" y="213" width="40" height="4" rx="2" fill="#93C5FD" fillOpacity=".7" />
            {/* Footer lines */}
            <rect x="76" y="244" width="120" height="3" rx="1.5" fill="white" fillOpacity=".2" />
            <rect x="76" y="252" width="90" height="3" rx="1.5" fill="white" fillOpacity=".14" />
            {/* AI sparkle badge */}
            <rect x="192" y="282" width="68" height="18" rx="9" fill="#1D4ED8" fillOpacity=".9" stroke="white" strokeOpacity=".2" strokeWidth="1" />
            <text x="206" y="295" fill="white" fontSize="8" fontFamily="DM Sans,sans-serif" fontWeight="600">✦ AI Verified</text>

            {/* Floating card 1 — score */}
            <g style={{ animation:"cardFloat1 4s ease-in-out infinite" }}>
              <rect x="220" y="60" width="115" height="56" rx="10" fill="white" fillOpacity=".97" filter="url(#shadow)" />
              <rect x="232" y="74" width="40" height="4" rx="2" fill="#E2E8F0" />
              <rect x="232" y="82" width="28" height="4" rx="2" fill="#E2E8F0" />
              <rect x="284" y="68" width="36" height="36" rx="8" fill="#EFF6FF" />
              <text x="297" y="92" fill="#2563EB" fontSize="16" fontWeight="800" fontFamily="Bricolage Grotesque,sans-serif">94</text>
              <rect x="232" y="94" width="55" height="4" rx="2" fill="#DBEAFE" />
              <rect x="232" y="94" width="49" height="4" rx="2" fill="#2563EB" fillOpacity=".8" />
            </g>

            {/* Floating card 2 — match */}
            <g style={{ animation:"cardFloat2 5s 1s ease-in-out infinite" }}>
              <rect x="-5" y="180" width="108" height="50" rx="10" fill="white" fillOpacity=".97" filter="url(#shadow)" />
              <text x="10" y="200" fill="#111827" fontSize="9" fontWeight="700" fontFamily="DM Sans,sans-serif">Job Match</text>
              <rect x="10" y="207" width="80" height="5" rx="2.5" fill="#E2E8F0" />
              <rect x="10" y="207" width="72" height="5" rx="2.5" fill="#10B981" fillOpacity=".85" />
              <text x="10" y="222" fill="#10B981" fontSize="8.5" fontWeight="700" fontFamily="DM Sans,sans-serif">91% Match  ✓</text>
            </g>

            {/* Floating card 3 — AI */}
            <g style={{ animation:"cardFloat1 6s 2s ease-in-out infinite" }}>
              <rect x="200" y="288" width="120" height="44" rx="10" fill="white" fillOpacity=".97" filter="url(#shadow)" />
              <text x="215" y="308" fill="#111827" fontSize="9" fontWeight="700" fontFamily="DM Sans,sans-serif">✨ AI Improved</text>
              <text x="215" y="322" fill="#6B7280" fontSize="8" fontFamily="DM Sans,sans-serif">12 bullet points</text>
            </g>

            <defs>
              <linearGradient id="cardGrad" x1="60" y1="40" x2="260" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity=".07" />
                <stop offset="1" stopColor="white" stopOpacity=".03" />
              </linearGradient>
              <linearGradient id="scoreGrad" x1="76" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#6366F1" />
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00000022" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Bottom copy */}
      <div className="relative z-10 p-8 pb-12">
        <h2 className="text-white font-extrabold leading-snug mb-3" style={{ fontFamily:"Bricolage Grotesque,sans-serif", fontSize:"clamp(1.5rem,2.5vw,2rem)" }}>
          Build Your Future Resume<br />
          <span style={{ color:"#93C5FD" }}>with AI</span>
        </h2>
        <p className="text-blue-200/70 max-w-xs leading-relaxed" style={{ fontSize:"14px" }}>
          Join 10,000+ professionals who landed their dream jobs using AI-verified, recruiter-trusted resumes.
        </p>
        {/* dots */}
        <div className="flex gap-2 mt-6">
          {[1,0,0].map((a, i) => (
            <span key={i} className="rounded-full transition-all" style={{ width: a ? 20 : 8, height:8, background: a ? "white" : "rgba(255,255,255,.3)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── FLOATING LABEL INPUT ── */
function FloatingInput({ id, label, type = "text", value, onChange, icon, error, rightSlot }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <div
        className="relative flex items-center rounded-xl border transition-all duration-200 overflow-hidden"
        style={{
          border: error ? "1.5px solid #EF4444" : focused ? "1.5px solid #2563EB" : "1.5px solid #E5E7EB",
          background: focused ? "#F0F7FF" : "#FAFAFA",
          boxShadow: focused ? "0 0 0 4px rgba(37,99,235,.08)" : "none",
        }}
      >
        {/* left icon */}
        <span className="pl-3.5 flex-shrink-0 transition-colors" style={{ color: focused ? "#2563EB" : "#9CA3AF" }}>
          {icon}
        </span>

        {/* input */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent outline-none px-3 pt-5 pb-1.5 text-sm text-gray-900 peer"
          style={{ fontFamily:"DM Sans,sans-serif" }}
          placeholder=" "
          autoComplete="off"
        />

        {/* floating label */}
        <label
          htmlFor={id}
          className="absolute left-11 transition-all duration-200 pointer-events-none select-none"
          style={{
            top: active ? "6px" : "50%",
            transform: active ? "translateY(0) scale(.78)" : "translateY(-50%) scale(1)",
            transformOrigin: "left",
            color: error ? "#EF4444" : focused ? "#2563EB" : "#9CA3AF",
            fontSize: "14px",
            fontFamily: "DM Sans,sans-serif",
            fontWeight: 500,
          }}
        >
          {label}
        </label>

        {/* right slot (eye icon, etc.) */}
        {rightSlot && <span className="pr-3.5 flex-shrink-0">{rightSlot}</span>}
      </div>

      {/* error message */}
      {error && (
        <p className="mt-1 text-xs flex items-center gap-1" style={{ color:"#EF4444" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ── LOGIN PAGE ── */
export default function Login({ onNavigate }) {
  const [form, setForm]         = useState({ email:"", password:"" });
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.email)                          errs.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email  = "Enter a valid email address";
    if (!form.password)                        errs.password = "Password is required";
    else if (form.password.length < 6)         errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily:"DM Sans,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-22px) scale(1.05)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes formIn { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes cardFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes cardFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .form-in { animation: formIn .6s .1s ease both; }
      `}</style>

      {/* LEFT — illustration */}
      <div className="lg:w-[52%] xl:w-[55%] flex-shrink-0">
        <LoginIllustration />
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white relative overflow-hidden">
        {/* subtle bg pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity:.03, pointerEvents:"none" }}>
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#2563EB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        {/* corner blurs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background:"rgba(219,234,254,.5)", transform:"translate(40%,-40%)" }} />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background:"rgba(238,242,255,.6)", transform:"translate(-30%,30%)" }} />

        <div className="relative w-full max-w-[400px] form-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#2563EB,#4F46E5)" }}>
              <Sparkle size={14} color="white" />
            </div>
            <span className="font-extrabold text-gray-900 text-sm" style={{ fontFamily:"Bricolage Grotesque,sans-serif" }}>
              AI Resume <span style={{ color:"#2563EB" }}>Builder</span>
            </span>
          </div>

          {/* heading */}
          <div className="mb-8">
            <h1 className="font-extrabold text-gray-900 mb-1.5" style={{ fontFamily:"Bricolage Grotesque,sans-serif", fontSize:"clamp(1.7rem,3vw,2.1rem)" }}>
              Welcome back 👋
            </h1>
            <p className="text-gray-500" style={{ fontSize:"15px" }}>
              Log in to continue building your AI resume.
            </p>
          </div>

          {/* Google button */}
          <button
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all mb-5"
            style={{ boxShadow:"0 1px 4px rgba(0,0,0,.07)" }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-semibold text-gray-400 tracking-wide">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <FloatingInput
              id="email"
              label="Email address"
              type="email"
              value={form.email}
              onChange={set("email")}
              error={errors.email}
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />

            <FloatingInput
              id="password"
              label="Password"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={set("password")}
              error={errors.password}
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              }
              rightSlot={
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 transition-colors p-0.5">
                  <EyeIcon open={showPass} />
                </button>
              }
            />

            {/* forgot */}
            <div className="text-right -mt-1">
              <a href="#" className="text-sm font-semibold hover:underline" style={{ color:"#2563EB" }}>
                Forgot password?
              </a>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed mt-1"
              style={{ background:"linear-gradient(135deg,#2563EB,#4F46E5)", boxShadow:"0 6px 20px rgba(37,99,235,.30)" }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation:"spin .8s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Log In
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* signup link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => onNavigate && onNavigate("signup")}
              className="font-bold hover:underline"
              style={{ color:"#2563EB" }}
            >
              Sign up free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}