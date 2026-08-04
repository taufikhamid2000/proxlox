/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import {
  FiShoppingBag,
  FiUserCheck,
  FiShield,
  FiZap,
  FiUsers,
  FiTrendingUp,
} from 'react-icons/fi';

const stats = [
  { value: '500+', label: 'Drops secured' },
  { value: '98%', label: 'Buyer satisfaction' },
  { value: '24/7', label: 'Support & tracking' },
  { value: '3.2k', label: 'Active buyers' },
];

const steps = [
  {
    icon: FiShoppingBag,
    title: 'Browse Limited Items',
    body: 'Find exclusive items already secured by resellers at a fair, transparent markup.',
  },
  {
    icon: FiUserCheck,
    title: 'Personal Shopper Service',
    body: 'Need something specific? Hire a personal shopper to purchase it for you.',
  },
  {
    icon: FiShield,
    title: 'Secure Payments',
    body: 'Choose from multiple payment options with buyer protection in place.',
  },
];

const exploreLinks = [
  { href: '/about', title: 'About Us', body: 'Learn what Proxlox is all about and how we operate.' },
  { href: '/privacy', title: 'Privacy Policy', body: 'See how we handle your data and keep things secure.' },
  { href: '/terms', title: 'Terms & Conditions', body: 'Understand the rules and guidelines of using our platform.' },
  { href: '/contact', title: 'Contact Us', body: 'Have questions? Reach out to us anytime.' },
];

const testimonials = [
  { quote: 'Proxlox helped me get my hands on a limited-edition drop without wasting hours in line!', name: 'Adam' },
  { quote: 'I love the personal shopper option. No more FOMO!', name: 'Sarah' },
];

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

        {/* Hero — dark-tech glassmorphism: soft blurred gradient orbs behind
            a floating glass panel, instead of the retro vice-city skyline. */}
        <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:min-h-[90vh]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-vicePink/20 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-viceTeal/15 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[24rem] w-[24rem] rounded-full bg-vicePurple/20 blur-[110px]"
          />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-14 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-14 sm:py-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-viceTeal">
              <FiZap size={12} /> Limited drops, made easy
            </span>

            <h1 className="mt-6 text-[clamp(2rem,7vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
              Skip the lines.{' '}
              <span className="bg-gradient-to-r from-vicePink via-viceOrange to-viceTeal bg-clip-text text-transparent">
                Secure the drop.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/60 sm:text-lg">
              Proxlox connects buyers with trusted resellers for limited-edition
              drops — no queues, no bots, no FOMO.
            </p>

            <div className="mt-9 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center">
              <Link
                href="/marketplace"
                className="rounded-full bg-gradient-to-r from-vicePink to-viceOrange px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,62,165,0.35)] transition-transform hover:scale-[1.03] sm:py-3"
              >
                Browse Available Items
              </Link>
              <Link
                href="/personal-shopper"
                className="rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-white/85 backdrop-blur transition-colors hover:border-viceTeal/60 hover:text-viceTeal sm:py-3"
              >
                Request Personal Shopper
              </Link>
            </div>
          </div>

          {/* Stat strip — floating glass tiles bridging hero into content. */}
          <Reveal delay={150} className="relative z-10 mt-12 w-full max-w-4xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 backdrop-blur-xl"
                >
                  <p className="bg-gradient-to-r from-vicePink to-viceTeal bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-white/50 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* How It Works */}
        <section className="relative px-6 py-16 sm:py-24">
          <Reveal>
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">
              How It Works
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors hover:border-vicePink/50 hover:bg-white/[0.05]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-vicePink/20 to-viceOrange/10 text-vicePink transition-colors group-hover:text-viceOrange">
                    <step.icon size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Explore Proxlox */}
        <section className="relative px-6 py-16 sm:py-24">
          <Reveal>
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">
              Explore Proxlox
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {exploreLinks.map((link, i) => (
              <Reveal key={link.href} delay={i * 80}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors hover:border-viceTeal/50 hover:bg-white/[0.05]">
                  <Link href={link.href} className="text-lg font-semibold text-viceTeal hover:text-white">
                    {link.title}
                  </Link>
                  <p className="mt-2 text-sm text-white/55">{link.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative px-6 py-16 sm:py-24">
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white">
              What Buyers Say
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={100 + i * 80}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-xl">
                  <FiUsers className="mb-3 text-viceTeal" size={18} />
                  <p className="text-sm italic text-white/70">"{t.quote}"</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/45">
                    — {t.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative overflow-hidden px-6 py-16 sm:py-24 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vicePurple/20 blur-[130px]"
          />
          <Reveal>
            <div className="relative z-10 mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-12 backdrop-blur-xl sm:px-12">
              <FiTrendingUp className="mx-auto mb-4 text-viceOrange" size={28} />
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Start Shopping Today
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/60 sm:text-base">
                Get access to exclusive products, secured and delivered hassle-free.
              </p>
              <Link
                href="/marketplace"
                className="mt-7 inline-block rounded-full bg-gradient-to-r from-vicePink to-viceOrange px-10 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,62,165,0.35)] transition-transform hover:scale-105"
              >
                Browse Now
              </Link>
            </div>
          </Reveal>
        </section>

        <Footer />
      </div>
    </>
  );
}
