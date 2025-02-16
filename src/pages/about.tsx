/* eslint-disable react/no-unescaped-entities */
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/Shared.module.css';
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <Header />

      {/* Introduction */}
      <section className={styles.introSection}>
        <h1>Everything You Need to Know About Proxlox</h1>
        <p>
          Resellers, personal shoppers, scalping—yeah, we know the drill. 
          Let's clear things up before you jump in.
        </p>
      </section>

      {/* Q&A */}
      <section className={styles.qaSection}>
        <div className={styles.question}>
          <h2>What is Proxlox?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Proxlox connects buyers with trusted resellers and personal shoppers. 
            If you don’t want to queue for exclusive drops, we’ve got people who will do it for you—for a fair markup.
          </p>
        </div>

        <div className={styles.question}>
          <h2>Why do people resell?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Simple: demand exceeds supply. If a brand only drops 100 pieces, but 
            10,000 people want them, prices go up. Proxlox just makes the process 
            smoother and more transparent.
          </p>
        </div>

        <div className={styles.question}>
          <h2>How does pricing work?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Resellers set their own prices. We ensure that markups stay reasonable 
            by capping fees at a fair percentage—no insane price hikes.
          </p>
        </div>

        <div className={styles.question}>
          <h2>Can I request a personal shopper?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Yes. If an item isn’t listed, you can request a personal shopper. 
            They’ll buy it for you at retail + a fixed service fee.
          </p>
        </div>

        <div className={styles.question}>
          <h2>Is this legal?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Reselling isn’t illegal in most places, but it’s controversial. 
            Some people hate it, some love it. We don’t control supply, 
            we just make transactions smoother.
          </p>
        </div>

        <div className={styles.question}>
          <h2>What about buyer protection?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Payments are held until the buyer confirms delivery. If something goes wrong, 
            we mediate. You won’t lose your money on scams—unless you try to do deals outside Proxlox (don’t do that).
          </p>
        </div>

        <div className={styles.question}>
          <h2>What payment methods do you accept?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            We accept major payment methods: credit cards, PayPal, and bank transfers. 
            Some resellers might offer cash on delivery, but we recommend using secure payments.
          </p>
        </div>

        <div className={styles.question}>
          <h2>What’s stopping resellers from overpricing everything?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            We cap markup percentages to prevent extreme scalping. If a reseller tries 
            to push ridiculous prices, they’ll get flagged.
          </p>
        </div>

        <div className={styles.question}>
          <h2>How do I get started?</h2>
        </div>
        <div className={styles.answer}>
          <p>
            Browse available items or request a personal shopper. If you’re a reseller, 
            apply to list your products. It’s that simple.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2>Still Have Questions?</h2>
        <p>
          No problem. Hit us up, and we’ll clarify whatever’s on your mind.
        </p>
        <Link href="/contact" passHref>
          <button>Contact Us</button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
