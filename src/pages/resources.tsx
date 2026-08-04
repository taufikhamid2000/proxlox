/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import styles from '@/styles/Profile.module.css'; // Now using shared CSS

function fileIcon(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase() || '';
  if (['pdf'].includes(ext)) return '📄';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return '🖼️';
  if (['doc', 'docx'].includes(ext)) return '📝';
  if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
  if (['zip', 'rar', '7z'].includes(ext)) return '🗜️';
  if (['mp4', 'mov', 'avi'].includes(ext)) return '🎞️';
  return '📁';
}

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
    // Uploads are stored under uploads/ (see handleFileUpload) — list()
    // with no path only returns the bucket's top-level folder entries,
    // not the files inside them, so it must be scoped to that prefix.
    const { data, error } = await supabase.storage.from('resources').list('uploads');
    if (error) {
      console.error('Error fetching files:', error);
    } else {
      setFiles((data || []).filter((f) => f.id !== null));
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !user) return;
    setUploading(true);

    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage.from('resources').upload(filePath, selectedFile, {
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
      <Head>
        <title>Resources | Proxlox</title>
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <main className={styles.wideWrap}>
            <Reveal className={styles.pageHeading}>
              <h1>Study Resources</h1>
              <p>Upload and download study materials shared by the community.</p>
            </Reveal>

            <Reveal>
              <div className={styles.uploadCard}>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                <button onClick={handleFileUpload} disabled={uploading} className={styles.actionButton}>
                  {uploading ? 'Uploading...' : 'Upload File'}
                </button>
              </div>
            </Reveal>

            <h2 className={styles.sectionTitle}>Available Resources</h2>
            <Reveal delay={100}>
              <ul className={styles.fileList}>
                {files.map((file) => (
                  <li key={file.name} className={styles.fileRow}>
                    <span className={styles.fileIcon}>{fileIcon(file.name)}</span>
                    <a
                      href={`${supabase.storage.from('resources').getPublicUrl(`uploads/${file.name}`).data.publicUrl}`}
                      download
                    >
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
