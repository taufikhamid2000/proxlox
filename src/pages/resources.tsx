/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import styles from '@/styles/Profile.module.css'; // Now using shared CSS

export default function Resources() {
  const [user, setUser] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/sign-in');
      } else {
        setUser(data.user);
        fetchFiles();
      }
    };

    checkUser();
  }, [router]);

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from('resources').list();
    if (error) {
      console.error('Error fetching files:', error);
    } else {
      setFiles(data);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !user) return;
    setUploading(true);

    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage.from('resources').upload(filePath, selectedFile, {
      upsert: true,
    });

    setUploading(false);

    if (error) {
      alert('Error uploading file');
    } else {
      fetchFiles(); // Refresh the file list
      alert('File uploaded successfully!');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <AppShell>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <main className={styles.mainContent}>
            <Reveal>
              <h1>Study Resources</h1>
              <p>Upload and download study materials shared by the community.</p>

              <div className={styles.uploadSection}>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                <button onClick={handleFileUpload} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload File'}
                </button>
              </div>

              <h2>Available Resources</h2>
            </Reveal>
            <Reveal delay={100}>
              <ul className={styles.fileList}>
                {files.map((file) => (
                  <li key={file.name} className={styles.fileItem}>
                    <a href={`${supabase.storage.from('resources').getPublicUrl(`uploads/${file.name}`).data.publicUrl}`} download>
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
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
