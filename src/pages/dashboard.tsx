import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Reveal from '@/components/Reveal';
import { User } from '@supabase/supabase-js';
import styles from '@/styles/Dashboard.module.css';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/sign-in');
      } else {
        setUser(data.session.user);
      }
    };

    checkUser();

    const today = new Date();
    setFormattedDate(today.toLocaleDateString('en-GB'));
  }, [router]);

  return (
    <AppShell>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          <Reveal>
            <section className={styles.userOverview}>
              <h2>Welcome, {user?.email || 'User'}!</h2>
              <p>Your last login: {formattedDate || 'Loading...'}</p>
            </section>
          </Reveal>

          <section className={styles.quickActions}>
            <Reveal delay={0} className={styles.card}>
              <h3>🛒 Marketplace</h3>
              <p>Browse and purchase limited-edition items.</p>
            </Reveal>
            <Reveal delay={80} className={styles.card}>
              <h3>🛍️ Personal Shopper</h3>
              <p>Request a personal shopper to buy exclusive products.</p>
            </Reveal>
            <Reveal delay={160} className={styles.card}>
              <h3>💬 Community</h3>
              <p>Join discussions, connect with others, and stay updated.</p>
            </Reveal>
          </section>

          <Reveal>
            <section className={styles.activity}>
              <h2>Recent Activity</h2>
              <ul>
                <li>🛍️ Purchased a limited-edition sneaker</li>
                <li>📩 Submitted a personal shopper request</li>
                <li>💬 Joined the exclusive drops discussion</li>
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section className={styles.announcements}>
              <h2>📢 Announcements</h2>
              <p>New rare drops are coming soon. Stay tuned!</p>
            </section>
          </Reveal>
        </div>
      </div>
    </AppShell>
  );
}
