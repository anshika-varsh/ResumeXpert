import { useState } from "react";
import { Eye, EyeOff, Rocket, CheckCircle2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);

    const data = await login(email, password);

    if (data?.token) {
      alert("Login Successful ✅");
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 300);
    } else {
      setError(data?.message || "Login failed");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login coming soon!");
  };

  const steps = [
    { step: "1", title: "Fill Details", desc: "Add your experience" },
    { step: "2", title: "AI Writes", desc: "Smart optimization" },
    { step: "3", title: "Get Hired", desc: "Land your dream job" },
    { step: "4", title: "Score High", desc: "ATS verified" }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* LEFT SIDE - BRANDING & STEPS */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        {/* Top branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold">ResumeX AI</h1>
          </div>
          <p className="text-emerald-100 text-sm">Powered by Artificial Intelligence</p>
        </div>

        {/* Middle content */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Illustration placeholder */}
          <div className="mb-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-xs">
            <div className="aspect-square flex items-center justify-center">
              <div className="text-center">
                <Rocket className="w-20 h-20 mx-auto mb-4 text-emerald-200" />
                <p className="text-emerald-100 font-semibold">Build Your Perfect Resume</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="w-full space-y-4">
            {steps.map((item) => (
              <div key={item.step} className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white border-opacity-30 flex items-center justify-center font-bold text-lg group-hover:bg-opacity-30 transition">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-emerald-100 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom heading */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold leading-tight mb-3">
            Start Your Career Journey with AI
          </h2>
          <p className="text-emerald-100 text-lg leading-relaxed">
            Your dream job is one AI-verified resume away. Create yours in minutes — free to start.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 lg:px-0">
        <div className="w-full max-w-md">
          
          {/* Mobile branding (visible on small screens) */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-emerald-600">ResumeX AI</h1>
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            
            {/* Headings */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Welcome back 👋
              </h2>
              <p className="text-gray-600 text-base lg:text-lg">
                Login to continue your journey
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <div className="text-red-600 font-bold text-lg">!</div>
                <div>
                  <p className="text-red-800 font-medium">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition text-gray-900 placeholder-gray-400 disabled:bg-gray-100"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition text-gray-900 placeholder-gray-400 disabled:bg-gray-100 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-3">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                  Remember me for 30 days
                </label>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition font-semibold text-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Footer link */}
            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Sign up
              </a>
            </p>
          </div>

          {/* Bottom disclaimer */}
          <p className="text-center text-xs text-gray-500 mt-6 px-2">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}