import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { OrbitMark } from '../components/branding/OrbitMark';
import { OrbitLoader } from '../components/ui/OrbitLoader';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('dhanaraju@orbit.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app');
    }, 700);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotModal(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-canvas text-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Login Card */}
      <div
        className="w-full max-w-md rounded-2xl border border-slate-800 p-8 shadow-2xl relative z-10 glass-panel"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px -10px rgba(56, 189, 248, 0.15)',
        }}
      >
        {/* Branding with ORBIT Mark */}
        <div className="text-center mb-8 flex flex-col items-center">
          <NavLink to="/" className="mb-4 hover:scale-105 transition-transform" title="Back to ORBIT">
            <OrbitMark size={52} animated={isLoading} />
          </NavLink>
          <h2 className="text-2xl font-bold text-slate-100 font-heading tracking-wide">Welcome back to ORBIT</h2>
          <p className="text-xs text-slate-400 mt-1">Autonomous Intelligence & Execution Platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email address"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full mt-2"
          >
            {isLoading ? (
              <OrbitLoader size="sm" inline label="Authenticating..." />
            ) : (
              <span className="flex items-center justify-center gap-2">
                Sign In <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Bottom register link */}
        <div className="text-center mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400">
          Don't have an account?{' '}
          <NavLink to="/register" className="text-cyan-400 font-semibold hover:underline">
            Create account
          </NavLink>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        title="Reset Password"
        subtitle="Enter your email to receive recovery instructions."
      >
        {resetSent ? (
          <div className="p-4 text-center flex flex-col items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-10 h-10" />
            <p className="text-sm font-semibold">Password reset instructions dispatched!</p>
            <p className="text-xs text-slate-400">Check your inbox for a secure one-time link.</p>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
            <Input
              label="Account email"
              type="email"
              icon={Mail}
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="dhanaraju@orbit.ai"
              required
            />
            <Button type="submit" variant="primary" className="w-full">
              Send Reset Link
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};
