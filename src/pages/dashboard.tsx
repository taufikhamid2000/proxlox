import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import Sidebar from '@/components/Sidebar';
import { User } from '@supabase/supabase-js';
import styles from '@/styles/Dashboard.module.css';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    <div className={`${styles.dashboardContainer} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      <Sidebar onToggle={(open) => setIsSidebarOpen(open)} />
      <div className={styles.dashboardContent}>
        <section className={styles.userOverview}>
          <h2>Welcome, {user?.email || 'User'}!</h2>
          <p>Your last login: {formattedDate || 'Loading...'}</p>
        </section>

        <section className={styles.quickActions}>
          <div className={styles.card}>
            <h3>🛒 Marketplace</h3>
            <p>Browse and purchase limited-edition items.</p>
          </div>
          <div className={styles.card}>
            <h3>🛍️ Personal Shopper</h3>
            <p>Request a personal shopper to buy exclusive products.</p>
          </div>
          <div className={styles.card}>
            <h3>💬 Community</h3>
            <p>Join discussions, connect with others, and stay updated.</p>
          </div>
        </section>

        <section className={styles.activity}>
          <h2>Recent Activity</h2>
          <ul>
            <li>🛍️ Purchased a limited-edition sneaker</li>
            <li>📩 Submitted a personal shopper request</li>
            <li>💬 Joined the exclusive drops discussion</li>
          </ul>
        </section>

        <section className={styles.announcements}>
          <h2>📢 Announcements</h2>
          <p>New rare drops are coming soon. Stay tuned!</p>
        </section>
      </div>
    </div>
  );
}
