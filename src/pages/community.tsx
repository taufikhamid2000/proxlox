/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import styles from '@/styles/Profile.module.css'; // Using shared CSS

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

export default function Community() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    };

    checkUser();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
    setLoading(false);
  };

  const handlePostSubmit = async () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    if (!newPost.trim()) return;
    const { error } = await supabase
      .from('community_posts')
      .insert([{ user_id: user.id, content: newPost }]);
    if (error) {
      alert('Error posting message');
    } else {
      setNewPost('');
      fetchPosts(); // Refresh posts
    }
  };

  const myInitial = (user?.user_metadata?.username || user?.email || '?').charAt(0).toUpperCase();

  return (
    <AppShell>
      <Head>
        <title>Community | Proxlox</title>
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <main className={styles.wideWrap}>
            <Reveal className={styles.pageHeading}>
              <h1>Community Discussions</h1>
              <p>Join the conversation, ask questions, and share ideas.</p>
            </Reveal>

            {/* Composer — an avatar chip anchors "this is you posting",
                matching how real feeds present the compose box instead
                of a bare textarea. */}
            <Reveal>
              <div className={styles.composer}>
                <div className={styles.composerAvatar}>{myInitial}</div>
                <div className={styles.composerBody}>
                  <textarea
                    placeholder={user ? "What's on your mind?" : 'Sign in to join the conversation'}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    disabled={!user}
                  />
                  <div className={styles.composerActions}>
                    <button onClick={handlePostSubmit} className={styles.actionButton}>
                      {user ? 'Post' : 'Sign in to post'}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            <h2 className={styles.sectionTitle}>Recent Posts</h2>
            {loading ? (
              <p>Loading posts...</p>
            ) : posts.length === 0 ? (
              <p>No posts yet. Be the first to start a discussion!</p>
            ) : (
              <Reveal>
                <ul className={styles.postFeed}>
                  {posts.map((post) => (
                    <li key={post.id} className={styles.postCard}>
                      <div className={styles.postAvatar}>U</div>
                      <div className={styles.postBody}>
                        <p>{post.content}</p>
                        <span>{timeAgo(post.created_at)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </main>
          <div className={styles.footerContainer}>
            <Footer />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
