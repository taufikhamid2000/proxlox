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

      <div>
        <Header />

        {/* Hero Section */}
        <section className="heroSection">
          <h1>Skip the Lines, Secure Your Limited Drops</h1>
          <p>
            Get exclusive items without the hassle. Proxlox connects buyers with
            trusted resellers for limited-edition drops.
          </p>
          <div>
            <Link href="/browse">
              <button>Browse Available Items</button>
            </Link>
            <Link href="/personal-shopper">
              <button style={{ marginLeft: '10px' }}>
                Request Personal Shopper
              </button>
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="featuresSection">
          <h2>How It Works</h2>
          <div className="features">
            <div className="feature">
              <h3>1. Browse Limited Items</h3>
              <p>
                Find exclusive items already secured by resellers at a fair,
                transparent markup.
              </p>
            </div>
            <div className="feature">
              <h3>2. Personal Shopper Service</h3>
              <p>
                Need something specific? Hire a personal shopper to purchase it
                for you.
              </p>
            </div>
            <div className="feature">
              <h3>3. Secure Payments</h3>
              <p>
                Choose from multiple payment options with buyer protection in
                place.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        {/* Features Section */}
        <section className="featuresSection">
          <h2>Explore Proxlox</h2>
          <div className="features">
            <div className="feature">
              <h3>
                <Link href="/about">About Us</Link>
              </h3>
              <p>Learn what Proxlox is all about and how we operate.</p>
            </div>
            <div className="feature">
              <h3>
                <Link href="/privacy">Privacy Policy</Link>
              </h3>
              <p>See how we handle your data and keep things secure.</p>
            </div>
            <div className="feature">
              <h3>
                <Link href="/terms">Terms & Conditions</Link>
              </h3>
              <p>Understand the rules and guidelines of using our platform.</p>
            </div>
            <div className="feature">
              <h3>
                <Link href="/contact">Contact Us</Link>
              </h3>
              <p>Have questions? Reach out to us anytime.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonialsSection">
          <h2>What Buyers Say</h2>
          <p>
            "Proxlox helped me get my hands on a limited-edition drop without
            wasting hours in line!" - Adam
          </p>
          <p>"I love the personal shopper option. No more FOMO!" - Sarah</p>
        </section>

        {/* Call-to-Action Section */}
        <section className="ctaSection">
          <h2>Start Shopping Today</h2>
          <p>
            Get access to exclusive products, secured and delivered hassle-free.
          </p>
          <Link href="/browse">
            <button>Browse Now</button>
          </Link>
        </section>

        <Footer />
      </div>
    </>
  );
}
