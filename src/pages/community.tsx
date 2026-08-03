/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import styles from '@/styles/Profile.module.css'; // Using shared CSS

export default function Community() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/sign-in');
      } else {
        setUser(data.user);
        fetchPosts();
      }
    };

    checkUser();
  }, [router]);

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

  if (!user) return <p>Loading...</p>;

  return (
    <AppShell>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <main className={styles.mainContent}>
            <Reveal>
              <h1>Community Discussions</h1>
              <p>Join the conversation, ask questions, and share ideas.</p>

              <div className={styles.postInput}>
                <textarea
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <button onClick={handlePostSubmit} className={styles.actionButton}>
                  Post
                </button>
              </div>

              <h2>Recent Posts</h2>
            </Reveal>
            {loading ? (
              <p>Loading posts...</p>
            ) : posts.length === 0 ? (
              <p>No posts yet. Be the first to start a discussion!</p>
            ) : (
              <Reveal>
                <ul className={styles.postList}>
                  {posts.map((post) => (
                    <li key={post.id} className={styles.postItem}>
                      <p>{post.content}</p>
                      <span className={styles.postTimestamp}>
                        {new Date(post.created_at).toLocaleString()}
                      </span>
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
