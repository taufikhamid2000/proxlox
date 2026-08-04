import { useState } from 'react';
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const session = await signIn(email, password);
      if (session) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    }

    setLoading(false);
  };

  return (
    <div className="bg-viceInk">
      <Head>
        <title>Sign In | Proxlox</title>
      </Head>
      <Header />

      <section
        className="relative flex min-h-[calc(100vh-56px-3rem)] items-center justify-center overflow-hidden px-6 py-16"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, #7c3aed26 0%, #ff3ea51f 45%, #08060d 75%), #08060d',
        }}
      >
        <div className="relative z-10 w-full max-w-md">
          <h1 className="text-center text-4xl font-black uppercase tracking-tight">
            <span className="bg-gradient-to-r from-vicePink to-viceOrange bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
          <p className="mt-3 text-center text-white/60">
            Log in and continue where you left off.
          </p>

          <form
            onSubmit={handleSignIn}
            className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
          >
            {error && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <label className="flex flex-col gap-1.5 text-left text-sm text-white/70">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-white outline-none transition-colors focus:border-vicePink"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-left text-sm text-white/70">
              Password
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 pr-10 text-white outline-none transition-colors focus:border-vicePink"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-gradient-to-r from-vicePink to-viceOrange px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_0_25px_rgba(255,62,165,0.3)] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="font-semibold text-viceTeal hover:text-white">
              Sign Up
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
