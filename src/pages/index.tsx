/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Proxlox | Buy Limited Drops with Ease</title>
        <meta
          name="description"
          content="Skip the hassle of waiting in lines. Proxlox helps you secure limited-edition items at a fair, transparent markup."
        />
        <meta
          name="keywords"
          content="SVG resale, personal shopper, limited edition drops, buy rare items, Proxlox marketplace"
        />
        <meta name="author" content="Proxlox Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Proxlox',
              url: 'https://proxlox.vercel.app/',
              description:
                'Proxlox connects buyers with trusted resellers for exclusive limited-edition products.',
              sameAs: [
                'https://www.facebook.com/proxlox',
                'https://www.twitter.com/proxlox',
              ],
            }),
          }}
        />
      </Head>

      <div className="bg-viceInk">
        <Header />

        {/* Hero — GTA VI teaser-page inspired: near-black dusk backdrop,
            radial sunset glow, huge gradient-clipped stacked wordmark,
            faint scanline texture for a retro-CRT edge. */}
        <section
          className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 110%, #ff8a3d33 0%, #ff3ea52e 30%, #7c3aed26 55%, #08060d 80%), #08060d',
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
            }}
          />

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-viceTeal">
            Proxlox
          </p>

          <h1 className="font-sans text-[13vw] font-black uppercase leading-[0.9] tracking-tight sm:text-[9vw] lg:text-[7vw]">
            <span className="block bg-gradient-to-r from-vicePink via-viceOrange to-vicePink bg-clip-text text-transparent">
              Skip the Lines.
            </span>
            <span className="block bg-gradient-to-r from-viceOrange via-vicePink to-vicePurple bg-clip-text text-transparent">
              Secure the Drop.
            </span>
          </h1>

          <p className="relative z-10 mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
            Proxlox connects buyers with trusted resellers for limited-edition
            drops — no queues, no bots, no FOMO.
          </p>

          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/browse"
              className="rounded-full bg-gradient-to-r from-vicePink to-viceOrange px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_0_30px_rgba(255,62,165,0.35)] transition-transform hover:scale-105"
            >
              Browse Available Items
            </Link>
            <Link
              href="/personal-shopper"
              className="rounded-full border border-white/25 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:border-viceTeal hover:text-viceTeal"
            >
              Request Personal Shopper
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-viceInk px-6 py-24">
          <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-wide text-white">
            How It Works
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {[
              {
                n: '1',
                title: 'Browse Limited Items',
                body: 'Find exclusive items already secured by resellers at a fair, transparent markup.',
              },
              {
                n: '2',
                title: 'Personal Shopper Service',
                body: 'Need something specific? Hire a personal shopper to purchase it for you.',
              },
              {
                n: '3',
                title: 'Secure Payments',
                body: 'Choose from multiple payment options with buyer protection in place.',
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-vicePink/60"
              >
                <span className="bg-gradient-to-r from-vicePink to-viceOrange bg-clip-text text-3xl font-black text-transparent">
                  {step.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/60">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Proxlox */}
        <section className="bg-black/40 px-6 py-24">
          <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-wide text-white">
            Explore Proxlox
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/about', title: 'About Us', body: 'Learn what Proxlox is all about and how we operate.' },
              { href: '/privacy', title: 'Privacy Policy', body: 'See how we handle your data and keep things secure.' },
              { href: '/terms', title: 'Terms & Conditions', body: 'Understand the rules and guidelines of using our platform.' },
              { href: '/contact', title: 'Contact Us', body: 'Have questions? Reach out to us anytime.' },
            ].map((link) => (
              <div
                key={link.href}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-viceTeal/60"
              >
                <Link href={link.href} className="text-lg font-semibold text-viceTeal hover:text-white">
                  {link.title}
                </Link>
                <p className="mt-2 text-sm text-white/60">{link.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-viceInk px-6 py-24 text-center">
          <h2 className="mb-10 text-3xl font-bold uppercase tracking-wide text-white">
            What Buyers Say
          </h2>
          <div className="mx-auto flex max-w-3xl flex-col gap-6 text-lg italic text-white/70 sm:flex-row sm:gap-10">
            <p className="flex-1">
              "Proxlox helped me get my hands on a limited-edition drop without
              wasting hours in line!" — Adam
            </p>
            <p className="flex-1">"I love the personal shopper option. No more FOMO!" — Sarah</p>
          </div>
        </section>

        {/* Call to Action */}
        <section
          className="relative overflow-hidden px-6 py-24 text-center"
          style={{
            background:
              'radial-gradient(80% 120% at 50% 0%, #7c3aed33 0%, #ff3ea52e 45%, #08060d 80%), #08060d',
          }}
        >
          <h2 className="text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            Start Shopping Today
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            Get access to exclusive products, secured and delivered hassle-free.
          </p>
          <Link
            href="/browse"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-vicePink to-viceOrange px-10 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_0_30px_rgba(255,62,165,0.35)] transition-transform hover:scale-105"
          >
            Browse Now
          </Link>
        </section>

        <Footer />
      </div>
    </>
  );
}
