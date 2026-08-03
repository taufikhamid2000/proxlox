import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Reveal from '@/components/Reveal';
import { User } from '@supabase/supabase-js';
import styles from '@/styles/Dashboard.module.css';

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

type Stat = { label: string; value: string };
type ActivityItem = { icon: string; text: string; time: string; createdAt: string };

/**
 * Runs a stat query and swallows the failure (e.g. the table doesn't
 * exist yet — orders/personal_shopper_requests have no migration in this
 * repo, see supabase/migrations) so one missing table can't blank out
 * the whole stat row. Returns '—' instead of crashing.
 */
async function safeCount(query: PromiseLike<{ count: number | null; error: unknown }>): Promise<string> {
  try {
    const { count, error } = await query;
    if (error || count === null) return '—';
    return String(count);
  } catch {
    return '—';
  }
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Active Orders', value: '—' },
    { label: 'Saved This Month', value: '—' },
    { label: 'Pending Requests', value: '—' },
    { label: 'Community Posts', value: '—' },
  ]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/sign-in');
        return;
      }
      setUser(data.session.user);
      loadDashboardData(data.session.user.id);
    };

    checkUser();

    const today = new Date();
    setFormattedDate(today.toLocaleDateString('en-GB'));
  }, [router]);

  const loadDashboardData = async (userId: string) => {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [activeOrders, pendingRequests, communityPosts, savedRows] = await Promise.all([
      safeCount(
        supabase
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('status', 'active')
      ),
      safeCount(
        supabase
          .from('personal_shopper_requests')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('status', 'pending')
      ),
      safeCount(
        supabase
          .from('community_posts')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
      ),
      supabase
        .from('orders')
        .select('amount_saved')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .gte('created_at', monthStart.toISOString())
        .then(
          (res) => res,
          () => ({ data: null, error: true })
        ),
    ]);

    const savedTotal =
      savedRows.data?.reduce((sum: number, row: { amount_saved: number | null }) => sum + (row.amount_saved || 0), 0) ??
      null;

    setStats([
      { label: 'Active Orders', value: activeOrders },
      { label: 'Saved This Month', value: savedTotal !== null ? `$${savedTotal}` : '—' },
      { label: 'Pending Requests', value: pendingRequests },
      { label: 'Community Posts', value: communityPosts },
    ]);

    const [orders, requests, posts] = await Promise.all([
      supabase
        .from('orders')
        .select('item_name, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3)
        .then(
          (res) => res.data || [],
          () => []
        ),
      supabase
        .from('personal_shopper_requests')
        .select('item_name, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3)
        .then(
          (res) => res.data || [],
          () => []
        ),
      supabase
        .from('community_posts')
        .select('content, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3)
        .then(
          (res) => res.data || [],
          () => []
        ),
    ]);

    const combined: ActivityItem[] = [
      ...orders.map((o: { item_name: string; created_at: string }) => ({
        icon: '🛍️',
        text: `Purchased ${o.item_name}`,
        time: timeAgo(o.created_at),
        createdAt: o.created_at,
      })),
      ...requests.map((r: { item_name: string; created_at: string }) => ({
        icon: '📩',
        text: `Requested a personal shopper for ${r.item_name}`,
        time: timeAgo(r.created_at),
        createdAt: r.created_at,
      })),
      ...posts.map((p: { content: string; created_at: string }) => ({
        icon: '💬',
        text: p.content.length > 60 ? `${p.content.slice(0, 60)}…` : p.content,
        time: timeAgo(p.created_at),
        createdAt: p.created_at,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    setRecentActivity(combined);
  };

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
                  {recentActivity.length === 0 ? (
                    <p className={styles.statLabel}>No activity yet — go browse the marketplace!</p>
                  ) : (
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
                  )}
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
