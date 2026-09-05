import { useState } from 'react';
import { signUp } from '@/lib/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { AuthBrandingPanel } from '@/components/AuthBrandingPanel';
import { LogoMark } from '@/components/LogoMark';
import { PasswordInput } from '@/components/PasswordInput';
import { Spinner } from '@/components/Spinner';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== retypePassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const session = await signUp(email, password);
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
    <div className="flex min-h-screen flex-col bg-background md:flex-row md:items-stretch">
      <Head>
        <title>Sign Up | Proxlox</title>
      </Head>

      <AuthBrandingPanel
        tagline="Your reseller marketplace, wired for the deals worth making."
        footnote="Join the club and start listing in minutes."
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-muted px-4 py-16">
        <Link href="/" className="flex items-center gap-2 md:hidden">
          <LogoMark size={28} />
          <span className="text-lg font-semibold uppercase tracking-tight text-foreground">Proxlox</span>
        </Link>

        <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-8 animate-page-in">
          <h1 className="text-xl font-semibold text-foreground">Join Proxlox</h1>
          <p className="mb-6 text-sm text-foreground/60">Welcome to the club. Let&apos;s get you set up.</p>

          <form onSubmit={handleSignUp} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'sign-up-error' : undefined}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            />
            <PasswordInput
              name="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              required
              autoComplete="new-password"
              ariaInvalid={!!error}
              ariaDescribedBy={error ? 'sign-up-error' : undefined}
            />
            <PasswordInput
              name="retype-password"
              placeholder="Retype Password"
              value={retypePassword}
              onChange={setRetypePassword}
              required
              autoComplete="new-password"
              ariaInvalid={!!error}
              ariaDescribedBy={error ? 'sign-up-error' : undefined}
            />
            {error && (
              <p id="sign-up-error" role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {loading && <Spinner />}
              {loading ? 'Signing Up…' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/60">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
