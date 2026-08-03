/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import styles from '@/styles/Profile.module.css';

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        router.push('/sign-in');
      } else {
        setUser(data.user);
        setUsername(data.user.user_metadata?.username || '');
        setProfileImageUrl(data.user.user_metadata?.profileImage || '');
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    const updates = {
      username,
      profileImage: profileImageUrl,
    };

    const { error } = await supabase.auth.updateUser({ data: updates });
    setLoading(false);

    if (error) {
      alert('Error updating profile.');
    } else {
      alert('Profile updated successfully!');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error } = await supabase.storage.from('profiles').upload(filePath, file, {
      upsert: true,
    });

    if (error) {
      alert('Error uploading image.');
    } else {
      const publicUrl = `${supabase.storage.from('profiles').getPublicUrl(filePath).data.publicUrl}`;
      setProfileImageUrl(publicUrl);
    }
  };

  if (!user) return <p>Loading...</p>;

  const initial = (username || user?.email || '?').charAt(0).toUpperCase();

  return (
    <AppShell>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <main className={styles.formCard}>
            <Reveal>
              <h1>Edit Profile</h1>

              {/* Avatar preview reads as a real avatar, so the effect of
                  a chosen file is confirmed before saving instead of
                  submitting blind. */}
              <div className={styles.avatarPreviewRow}>
                <div className={styles.avatarPreview}>
                  {profileImageUrl ? <img src={profileImageUrl} alt="Profile" /> : initial}
                </div>
                <input type="file" accept="image/*" onChange={handleFileUpload} />
              </div>

              <div className={styles.field}>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <button onClick={handleUpdateProfile} disabled={loading} className={styles.actionButton}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
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
