import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Reveal from '@/components/Reveal';
import { User } from '@supabase/supabase-js';
import styles from '@/styles/Dashboard.module.css';

const stats = [
  { label: 'Active Orders', value: '3' },
  { label: 'Saved This Month', value: '$142' },
  { label: 'Pending Requests', value: '1' },
  { label: 'Community Posts', value: '12' },
];

const quickActions = [
  {
    href: '/marketplace',
    icon: '🛒',
    title: 'Marketplace',
    body: 'Browse and purchase limited-edition items.',
  },
  {
    href: '/personal-shopper',
    icon: '🛍️',
    title: 'Personal Shopper',
    body: 'Request a personal shopper to buy exclusive products.',
  },
  {
    href: '/community',
    icon: '💬',
    title: 'Community',
    body: 'Join discussions, connect with others, and stay updated.',
  },
];

const recentActivity = [
  { icon: '🛍️', text: 'Purchased a limited-edition sneaker', time: '2h ago' },
  { icon: '📩', text: 'Submitted a personal shopper request', time: '1d ago' },
  { icon: '💬', text: 'Joined the exclusive drops discussion', time: '3d ago' },
];

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
          {/* Low-weight context row — the F-pattern's top-left slot goes
              to the stat row below instead, since that's the data users
              actually scan the dashboard for. */}
          <Reveal className={styles.pageHeader}>
            <h1>Welcome, {user?.email || 'User'}</h1>
            <p>Last login: {formattedDate || 'Loading...'}</p>
          </Reveal>

          <Reveal delay={40}>
            <div className={styles.statGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className={styles.body}>
            <Reveal delay={80}>
              <div>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>
                <div className={styles.quickActions}>
                  {quickActions.map((action) => (
                    <Link key={action.href} href={action.href} className={styles.actionCard}>
                      <span className={styles.actionIcon}>{action.icon}</span>
                      <span className={styles.actionText}>
                        <h3>{action.title}</h3>
                        <p>{action.body}</p>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className={styles.aside}>
                <section className={styles.activity}>
                  <h2 className={styles.sectionTitle}>Recent Activity</h2>
                  <ul>
                    {recentActivity.map((item, i) => (
                      <li key={i} className={styles.activityItem}>
                        <span className={styles.activityIcon}>{item.icon}</span>
                        <span className={styles.activityText}>
                          <p>{item.text}</p>
                          <span>{item.time}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className={styles.announcements}>
                  <strong>📢 Announcements</strong>
                  <p>New rare drops are coming soon. Stay tuned!</p>
                </section>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
