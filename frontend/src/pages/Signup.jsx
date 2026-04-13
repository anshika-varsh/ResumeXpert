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

/* ── PASSWORD STRENGTH METER ── */
function PasswordStrength({ password }) {
  const calc = (p) => {
    let s = 0;
    if (p.length >= 8)          s++;
    if (/[A-Z]/.test(p))        s++;
    if (/[0-9]/.test(p))        s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  if (!password) return null;
  const score = calc(password);
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#EF4444", "#F59E0B", "#3B82F6", "#10B981"];
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4].map((i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{ background: score >= i ? colors[score] : "#E5E7EB" }} />
        ))}
      </div>
      <p className="text-xs font-semibold" style={{ color: colors[score] }}>
        {score > 0 ? labels[score] + " password" : ""}
      </p>
    </div>
  );
}

/* ── LEFT PANEL — Career Journey Illustration ── */
function SignupIllustration() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg,#064E3B 0%,#065F46 45%,#047857 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", width:380, height:380, borderRadius:"50%", background:"rgba(16,185,129,.14)", top:-100, right:-80, animation:"blobFloat 9s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:240, height:240, borderRadius:"50%", background:"rgba(52,211,153,.10)", bottom:60, left:-60, animation:"blobFloat 7s 1.5s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:160, height:160, borderRadius:"50%", background:"rgba(110,231,183,.08)", top:"40%", left:"20%", animation:"blobFloat 11s 3s ease-in-out infinite" }} />
        {/* Grid */}
        <svg width="100%" height="100%" style={{ opacity:.05, position:"absolute", inset:0 }}>
          <defs>
            <pattern id="sgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sgrid)" />
        </svg>
      </div>

      {/* Logo */}
      <div className="relative z-10 p-8">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"rgba(255,255,255,.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.2)" }}>
            <Sparkle size={16} color="white" />
          </div>
          <span className="text-white font-extrabold text-base tracking-tight" style={{ fontFamily:"Bricolage Grotesque,sans-serif" }}>
            AI Resume <span style={{ color:"#6EE7B7" }}>Builder</span>
          </span>
        </div>
      </div>

      {/* Main illustration — career path / rocket */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8">
        <div style={{ animation:"slideUp .9s ease both" }}>
          <svg viewBox="0 0 360 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:340 }}>

            {/* Background circular glow */}
            <circle cx="180" cy="200" r="140" fill="white" fillOpacity=".04" />
            <circle cx="180" cy="200" r="100" fill="white" fillOpacity=".04" />

            {/* Orbit ring */}
            <ellipse cx="180" cy="200" rx="130" ry="130" stroke="white" strokeOpacity=".1" strokeWidth="1" strokeDasharray="6 6" />

            {/* Central rocket */}
            <g style={{ animation:"rocketFloat 4s ease-in-out infinite" }}>
              {/* rocket body */}
              <ellipse cx="180" cy="175" rx="22" ry="40" fill="white" fillOpacity=".92" />
              {/* nose */}
              <path d="M158 155 Q180 110 202 155Z" fill="white" fillOpacity=".9" />
              {/* window */}
              <circle cx="180" cy="165" r="9" fill="#064E3B" />
              <circle cx="180" cy="165" r="6" fill="#6EE7B7" fillOpacity=".6" />
              {/* fins */}
              <path d="M158 200 L148 220 L162 210Z" fill="white" fillOpacity=".6" />
              <path d="M202 200 L212 220 L198 210Z" fill="white" fillOpacity=".6" />
              {/* flame */}
              <path d="M170 215 Q180 240 190 215" fill="#FCD34D" fillOpacity=".9" />
              <path d="M174 215 Q180 232 186 215" fill="#F97316" fillOpacity=".8" />
            </g>

            {/* Step cards around the orbit */}
            {/* Step 1 */}
            <g style={{ animation:"cardOrbit1 5s ease-in-out infinite" }}>
              <rect x="20" y="100" width="100" height="52" rx="10" fill="white" fillOpacity=".97" filter="url(#gshadow)" />
              <circle cx="38" cy="126" r="12" fill="#ECFDF5" />
              <text x="34" y="130" fontSize="12">📝</text>
              <rect x="56" y="116" width="52" height="5" rx="2.5" fill="#E2E8F0" />
              <rect x="56" y="126" width="38" height="4" rx="2" fill="#E2E8F0" />
              <text x="38" y="146" fill="#065F46" fontSize="8" fontWeight="700" fontFamily="DM Sans,sans-serif">Step 1: Fill Details</text>
            </g>

            {/* Step 2 */}
            <g style={{ animation:"cardOrbit2 6s 1s ease-in-out infinite" }}>
              <rect x="238" y="88" width="108" height="52" rx="10" fill="white" fillOpacity=".97" filter="url(#gshadow)" />
              <circle cx="256" cy="114" r="12" fill="#ECFDF5" />
              <text x="252" y="118" fontSize="12">🤖</text>
              <rect x="274" y="104" width="58" height="5" rx="2.5" fill="#E2E8F0" />
              <rect x="274" y="114" width="44" height="4" rx="2" fill="#E2E8F0" />
              <text x="256" y="134" fill="#065F46" fontSize="8" fontWeight="700" fontFamily="DM Sans,sans-serif">Step 2: AI Writes</text>
            </g>

            {/* Step 3 */}
            <g style={{ animation:"cardOrbit1 7s 2s ease-in-out infinite" }}>
              <rect x="238" y="268" width="108" height="52" rx="10" fill="white" fillOpacity=".97" filter="url(#gshadow)" />
              <circle cx="256" cy="294" r="12" fill="#ECFDF5" />
              <text x="252" y="298" fontSize="12">🚀</text>
              <rect x="274" y="284" width="58" height="5" rx="2.5" fill="#E2E8F0" />
              <rect x="274" y="294" width="44" height="4" rx="2" fill="#E2E8F0" />
              <text x="256" y="314" fill="#065F46" fontSize="8" fontWeight="700" fontFamily="DM Sans,sans-serif">Step 3: Get Hired!</text>
            </g>

            {/* Step 4 */}
            <g style={{ animation:"cardOrbit2 5s 3s ease-in-out infinite" }}>
              <rect x="18" y="268" width="108" height="52" rx="10" fill="white" fillOpacity=".97" filter="url(#gshadow)" />
              <circle cx="36" cy="294" r="12" fill="#ECFDF5" />
              <text x="32" y="298" fontSize="12">🎯</text>
              <rect x="54" y="284" width="60" height="5" rx="2.5" fill="#E2E8F0" />
              <rect x="54" y="294" width="46" height="4" rx="2" fill="#E2E8F0" />
              <text x="36" y="314" fill="#065F46" fontSize="8" fontWeight="700" fontFamily="DM Sans,sans-serif">Step 4: Score High</text>
            </g>

            {/* Connecting arrows */}
            {[
              "M 120 126 Q 150 126 160 160",
              "M 238 114 Q 215 114 205 155",
              "M 202 215 Q 225 250 238 280",
              "M 158 215 Q 135 250 126 275",
            ].map((d, i) => (
              <path key={i} d={d} stroke="white" strokeOpacity=".25" strokeWidth="1.5" strokeDasharray="5 4" fill="none"
                markerEnd="url(#arr)" />
            ))}
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6Z" fill="rgba(255,255,255,.3)" />
              </marker>
              <filter id="gshadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00000020" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Bottom copy */}
      <div className="relative z-10 p-8 pb-12">
        <h2 className="text-white font-extrabold leading-snug mb-3" style={{ fontFamily:"Bricolage Grotesque,sans-serif", fontSize:"clamp(1.5rem,2.5vw,2rem)" }}>
          Start Your Career Journey<br />
          <span style={{ color:"#6EE7B7" }}>with AI</span>
        </h2>
        <p className="max-w-xs leading-relaxed" style={{ fontSize:"14px", color:"rgba(167,243,208,.8)" }}>
          Your dream job is one AI-verified resume away. Create yours in minutes — free to start.
        </p>
        <div className="flex gap-2 mt-6">
          {[0,1,0].map((a, i) => (
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
          border: error ? "1.5px solid #EF4444" : focused ? "1.5px solid #059669" : "1.5px solid #E5E7EB",
          background: focused ? "#F0FDF4" : "#FAFAFA",
          boxShadow: focused ? "0 0 0 4px rgba(5,150,105,.08)" : "none",
        }}
      >
        <span className="pl-3.5 flex-shrink-0 transition-colors" style={{ color: focused ? "#059669" : "#9CA3AF" }}>
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent outline-none px-3 pt-5 pb-1.5 text-sm text-gray-900"
          style={{ fontFamily:"DM Sans,sans-serif" }}
          placeholder=" "
          autoComplete="off"
        />
        <label
          htmlFor={id}
          className="absolute left-11 transition-all duration-200 pointer-events-none select-none"
          style={{
            top: active ? "6px" : "50%",
            transform: active ? "translateY(0) scale(.78)" : "translateY(-50%) scale(1)",
            transformOrigin: "left",
            color: error ? "#EF4444" : focused ? "#059669" : "#9CA3AF",
            fontSize: "14px",
            fontFamily: "DM Sans,sans-serif",
            fontWeight: 500,
          }}
        >
          {label}
        </label>
        {rightSlot && <span className="pr-3.5 flex-shrink-0">{rightSlot}</span>}
      </div>
      {error && (
        <p className="mt-1 text-xs flex items-center gap-1" style={{ color:"#EF4444" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ── SIGNUP PAGE ── */
export default function Signup({ onNavigate }) {
  const [form, setForm]           = useState({ name:"", email:"", password:"", confirm:"" });
  const [errors, setErrors]       = useState({});
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim())                      errs.name    = "Full name is required";
    if (!form.email)                             errs.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))  errs.email   = "Enter a valid email address";
    if (!form.password)                          errs.password = "Password is required";
    else if (form.password.length < 8)           errs.password = "Password must be at least 8 characters";
    if (!form.confirm)                           errs.confirm = "Please confirm your password";
    else if (form.confirm !== form.password)     errs.confirm = "Passwords do not match";
    return errs;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length) { setErrors(errs); return; }
  
  setErrors({});
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      })
    });

    const data = await res.json();

    if (data.message === "User Registered") {
      setLoading(false);
      setSuccess(true);
    } else {
      setLoading(false);
      setErrors({ form: data.message || "Registration failed" });
    }

  } catch (error) {
    setLoading(false);
    setErrors({ form: "Server error. Please try again." });
    console.error("Signup error:", error);
  }
};

  return (
    <div className="min-h-screen flex" style={{ fontFamily:"DM Sans,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-22px) scale(1.05)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes formIn { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes rocketFloat { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-14px) rotate(5deg)} }
        @keyframes cardOrbit1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes cardOrbit2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes successPop { 0%{transform:scale(.6);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        .form-in { animation: formIn .6s .1s ease both; }
        .success-pop { animation: successPop .5s ease both; }
      `}</style>

      {/* LEFT */}
      <div className="lg:w-[52%] xl:w-[55%] flex-shrink-0">
        <SignupIllustration />
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-white relative overflow-hidden">
        {/* bg pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity:.03, pointerEvents:"none" }}>
          <defs>
            <pattern id="sdots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#059669" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sdots)" />
        </svg>
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background:"rgba(209,250,229,.55)", transform:"translate(40%,-40%)" }} />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background:"rgba(236,253,245,.7)", transform:"translate(-30%,30%)" }} />

        <div className="relative w-full max-w-[420px] form-in">
          {/* Success state */}
          {success ? (
            <div className="text-center py-10">
              <div className="success-pop w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background:"linear-gradient(135deg,#059669,#10B981)", boxShadow:"0 8px 30px rgba(5,150,105,.35)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-extrabold text-gray-900 mb-2" style={{ fontFamily:"Bricolage Grotesque,sans-serif", fontSize:"1.8rem" }}>
                Account Created! 🎉
              </h2>
              <p className="text-gray-500 mb-8" style={{ fontSize:"15px" }}>
                Welcome aboard, <strong>{form.name.split(" ")[0]}</strong>! Start building your AI resume now.
              </p>
              <button
                onClick={() => onNavigate && onNavigate("login")}
                className="px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background:"linear-gradient(135deg,#059669,#047857)", boxShadow:"0 6px 20px rgba(5,150,105,.30)" }}
              >
                Go to Login →
              </button>
            </div>
          ) : (
            <>
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center gap-2 mb-7">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#059669,#047857)" }}>
                  <Sparkle size={14} color="white" />
                </div>
                <span className="font-extrabold text-gray-900 text-sm" style={{ fontFamily:"Bricolage Grotesque,sans-serif" }}>
                  AI Resume <span style={{ color:"#059669" }}>Builder</span>
                </span>
              </div>

              {/* heading */}
              <div className="mb-7">
                <h1 className="font-extrabold text-gray-900 mb-1.5" style={{ fontFamily:"Bricolage Grotesque,sans-serif", fontSize:"clamp(1.7rem,3vw,2.1rem)" }}>
                  Create your account ✨
                </h1>
                <p className="text-gray-500" style={{ fontSize:"15px" }}>
                  Free forever. No credit card required.
                </p>
              </div>

              {/* Google */}
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
              <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                {/* Full name */}
                <FloatingInput
                  id="name"
                  label="Full name"
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  error={errors.name}
                  icon={
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                />

                {/* Email */}
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

                {/* Password */}
                <div>
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
                  <PasswordStrength password={form.password} />
                </div>

                {/* Confirm Password */}
                <FloatingInput
                  id="confirm"
                  label="Confirm password"
                  type={showConf ? "text" : "password"}
                  value={form.confirm}
                  onChange={set("confirm")}
                  error={errors.confirm}
                  icon={
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  }
                  rightSlot={
                    <button type="button" onClick={() => setShowConf(!showConf)} className="text-gray-400 hover:text-gray-600 transition-colors p-0.5">
                      <EyeIcon open={showConf} />
                    </button>
                  }
                />

                {/* terms */}
                <p className="text-xs text-gray-400 leading-relaxed" style={{ paddingTop:"2px" }}>
                  By signing up, you agree to our{" "}
                  <a href="#" className="font-semibold hover:underline" style={{ color:"#059669" }}>Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="font-semibold hover:underline" style={{ color:"#059669" }}>Privacy Policy</a>.
                </p>

                {/* submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background:"linear-gradient(135deg,#059669,#047857)", boxShadow:"0 6px 20px rgba(5,150,105,.28)" }}
                >
                  {loading ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation:"spin .8s linear infinite" }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Creating account…
                    </>
                  ) : (
                    <>
                      Create Free Account
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* login link */}
              <p className="text-center text-sm text-gray-500 mt-5">
                Already have an account?{" "}
                <button
                  onClick={() => onNavigate && onNavigate("login")}
                  className="font-bold hover:underline"
                  style={{ color:"#059669" }}
                >
                  Log in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}