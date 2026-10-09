import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bot, Mail, Lock, User, ArrowRight, } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('Dhanaraju');
  const [email, setEmail] = useState('dhanaraju@orbit.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-canvas text-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Register Card */}
      <div
        className="w-full max-w-md rounded-2xl border border-slate-800 p-8 shadow-2xl relative z-10 glass-panel"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px -10px rgba(56, 189, 248, 0.15)',
        }}
      >
        {/* Branding */}
        <div className="text-center mb-8 flex flex-col items-center">
          <NavLink to="/" className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 mb-4 hover:scale-105 transition-transform">
            <Bot className="w-7 h-7 text-slate-950 font-bold" />
          </NavLink>
          <h2 className="text-2xl font-bold text-slate-100 font-heading">Create your ORBIT Account</h2>
          <p className="text-xs text-slate-400 mt-1">Deploy autonomous agents that plan, execute, and deliver</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <Input
            label="Full Name"
            type="text"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />

          <Input
            label="Work Email"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />

          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            required
          />

          <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-400 pt-1">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
            />
            <span>
              I agree to the <span className="text-slate-300 underline">Terms of Service</span> and{' '}
              <span className="text-slate-300 underline">Privacy Policy</span>.
            </span>
          </label>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-3"
            iconRight={ArrowRight}
          >
            Create Account
          </Button>
        </form>

        {/* Bottom login link */}
        <div className="text-center mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400">
          Already have an account?{' '}
          <NavLink to="/login" className="text-cyan-400 font-semibold hover:underline">
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};
