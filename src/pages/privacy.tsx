import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/Shared.module.css';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div>
      <Header />

      {/* Introduction */}
      <section className={styles.introSection}>
        <h1>Privacy Policy (Because You Deserve to Know)</h1>
        <p>
          Let’s be real: nobody actually reads these, but if you’re here, you
          probably care. So, here’s the deal—no nonsense, no legal jargon.
        </p>
      </section>

      {/* Q&A */}
      <section className={styles.qaSection}>
        <div className={styles.question}>
          <h2>What data do you collect?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Just what we need to make Proxlox work: - Your name, email, and
            payment info (so you can buy or sell). - Shipping details (so you
            can actually get your stuff). - Transaction history (to prevent
            fraud). That’s it. No creepy tracking.
          </p>
        </div>

        <div className={styles.question}>
          <h2>Do you sell my data?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            No. Not to advertisers, not to third parties, not even to sketchy
            marketers offering us “business growth solutions.”
          </p>
        </div>

        <div className={styles.question}>
          <h2>Do you use cookies?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Yes, but only to keep things running smoothly. No invasive tracking,
            just basic stuff like keeping you logged in and remembering your
            cart.
          </p>
        </div>

        <div className={styles.question}>
          <h2>Is my data secure?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            As secure as we can make it. We use encryption, firewalls, and fraud
            prevention tools. But if you use “password123,” you’re on your own.
          </p>
        </div>

        <div className={styles.question}>
          <h2>What happens if I get scammed?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            We act as a middleman. Payments are held until the buyer confirms
            they got the item. If there’s an issue, we step in. No shady deals,
            no ghost sellers.
          </p>
        </div>

        <div className={styles.question}>
          <h2>Can I delete my data?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Absolutely. Contact us, and we’ll wipe your data from our system.
            Just know that we keep transaction records (for legal reasons) even
            after deletion.
          </p>
        </div>

        <div className={styles.question}>
          <h2>Will this policy change?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Probably, but we’ll let you know if it does. No fine print
            surprises.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2>Still Got Questions?</h2>
        <p>
          If you’re still worried, reach out. We’ll answer your concerns (or at
          least pretend to until you feel better).
        </p>
        <Link href="/contact" passHref>
          <button className="btn">Contact Us</button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
