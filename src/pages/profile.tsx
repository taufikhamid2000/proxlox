/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import styles from '@/styles/Profile.module.css';

function formatJoinDate(iso: string | undefined): string {
  if (!iso) return 'Unknown';
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orderCount, setOrderCount] = useState('—');
  const [postCount, setPostCount] = useState('—');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push('/sign-in');
        return;
      }
      setUser(data.user);
      setLoading(false);

      const [orders, posts] = await Promise.all([
        supabase
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', data.user.id)
          .then(
            (res) => (res.error || res.count === null ? '—' : String(res.count)),
            () => '—'
          ),
        supabase
          .from('community_posts')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', data.user.id)
          .then(
            (res) => (res.error || res.count === null ? '—' : String(res.count)),
            () => '—'
          ),
      ]);
      setOrderCount(orders);
      setPostCount(posts);
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading profile...</p>;

  const username = user?.user_metadata?.username;
  const avatarUrl = user?.user_metadata?.profileImage;
  const initial = (username || user?.email || '?').charAt(0).toUpperCase();

  return (
    <AppShell>
      <Head>
        <title>My Profile | Proxlox</title>
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <main className={styles.profileWrap}>
            <Reveal>
              {/* Identity card — avatar + name anchored top-left, the
                  pattern most profile pages use since that's where eyes
                  land first, instead of a centered form-style block. */}
              <div className={styles.profileCard}>
                <div className={styles.avatar}>
                  {avatarUrl ? <img src={avatarUrl} alt="" /> : initial}
                </div>
                <div className={styles.identity}>
                  <h1>{username || 'Unnamed User'}</h1>
                  <p>{user?.email}</p>
                </div>
                <button onClick={() => router.push('/settings')} className={styles.editLink}>
                  Edit Profile
                </button>
              </div>
            </Reveal>

            <Reveal delay={80}>
              {/* Trust/activity signals — the details that make an
                  account read as real rather than a bare form. */}
              <div className={styles.statRow}>
                <div className={styles.statChip}>
                  <strong>{formatJoinDate(user?.created_at)}</strong>
                  <span>Member since</span>
                </div>
                <div className={styles.statChip}>
                  <strong>{orderCount}</strong>
                  <span>Orders placed</span>
                </div>
                <div className={styles.statChip}>
                  <strong>{postCount}</strong>
                  <span>Community posts</span>
                </div>
              </div>
            </Reveal>
          </main>
          <div className={styles.footerContainer}>
            <Footer />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
