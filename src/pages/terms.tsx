/* eslint-disable react/no-unescaped-entities */
// pages/terms.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/Shared.module.css';
import Link from 'next/link';

export default function Terms() {
  return (
    <div>
      <Header />

      {/* Introduction */}
      <section className={styles.introSection}>
        <h1>Terms and Conditions (Yep, You Gotta Read These)</h1>
        <p>
          Welcome to Proxlox! By using our platform, you agree to these terms. 
          If you don’t like them, no hard feelings—just don’t use the site.
        </p>
      </section>

      {/* Q&A */}
      <section className={styles.qaSection}>
        <div className={styles.question}>
          <h2>1. Use Proxlox Responsibly</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Don’t scam, spam, hack, or do anything shady. If you mess things up 
            for others, we’ll have to remove you—and that’s awkward for everyone.
          </p>
        </div>

        <div className={styles.question}>
          <h2>2. No Guarantee of Profit</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Just because other resellers are making bank doesn’t mean you will. 
            We provide the platform, but success is on you.
          </p>
        </div>

        <div className={styles.question}>
          <h2>3. Buyer & Seller Responsibilities</h2>
        </div>
        <div className={styles.answer}>
          <p>
            - Buyers: Make sure you know what you're buying. Refunds aren't always guaranteed. <br /> 
            - Sellers: Deliver what you promise. Fake listings will get you banned.  <br />
            - Both: Be decent humans, and transactions will go smoothly.
          </p>
        </div>

        <div className={styles.question}>
          <h2>4. Payment & Safety</h2>
        </div>
        <div className={styles.answer}>
          <p>
            We may hold payments temporarily to prevent scams. If a dispute happens, 
            we step in—but don’t expect miracles. We try to be fair.
          </p>
        </div>

        <div className={styles.question}>
          <h2>5. Content You Post</h2>
        </div>
        <div className={styles.answer}>
          <p>
            If you list something illegal, offensive, or just plain dumb, that’s on you. 
            We’ll remove it, and we won’t feel bad about it.
          </p>
        </div>

        <div className={styles.question}>
          <h2>6. Liability (Or Lack Thereof)</h2>
        </div>
        <div className={styles.answer}>
          <p>
            If your cousin spends your entire savings on overpriced sneakers, 
            that’s not our fault. We’re not liable for any losses, damages, or 
            questionable financial decisions.
          </p>
        </div>

        <div className={styles.question}>
          <h2>7. Updates to These Terms</h2>
        </div>
        <div className={styles.answer}>
          <p>
            We might update these terms. If we do, we’ll let you know. 
            Keep using Proxlox? That means you accept the new rules.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2>Questions? Concerns?</h2>
        <p>
          Something unclear? Let us know. We actually read messages.
        </p>
        <Link href="/contact" passHref>
          <button className="btn">Contact Us</button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
