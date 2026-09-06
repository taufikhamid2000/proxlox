import { useState } from 'react';
import { signIn, startDemo } from '@/lib/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { AuthBrandingPanel } from '@/components/AuthBrandingPanel';
import { LogoMark } from '@/components/LogoMark';
import { PasswordInput } from '@/components/PasswordInput';
import { Spinner } from '@/components/Spinner';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleDemo = async () => {
    setDemoLoading(true);
    setError(null);

    try {
      const session = await startDemo();
      if (session) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'The demo is unavailable right now. Please try again.'
      );
    }

    setDemoLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row md:items-stretch">
      <Head>
        <title>Sign In | Proxlox</title>
      </Head>

      <AuthBrandingPanel
        tagline="Your reseller marketplace, wired for the deals worth making."
        footnote="Log in and pick up right where you left off."
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-muted px-4 py-16">
        <Link href="/" className="flex items-center gap-2 md:hidden">
          <LogoMark size={28} />
          <span className="text-lg font-semibold uppercase tracking-tight text-foreground">Proxlox</span>
        </Link>

        <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-8 animate-page-in">
          <h1 className="text-xl font-semibold text-foreground">Welcome back</h1>
          <p className="mb-6 text-sm text-foreground/60">Log in and continue where you left off.</p>

          <form onSubmit={handleSignIn} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'sign-in-error' : undefined}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            />
            <PasswordInput
              name="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              required
              autoComplete="current-password"
              ariaInvalid={!!error}
              ariaDescribedBy={error ? 'sign-in-error' : undefined}
            />
            {error && (
              <p id="sign-in-error" role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {loading && <Spinner />}
              {loading ? 'Signing In…' : 'Sign In'}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-foreground/40">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={handleDemo}
            disabled={demoLoading}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {demoLoading && <Spinner />}
            {demoLoading ? 'Starting demo…' : 'Try the demo — no account needed'}
          </button>

          <p className="mt-6 text-center text-sm text-foreground/60">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
