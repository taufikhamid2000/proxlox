/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Reveal from '@/components/Reveal';
import styles from '@/styles/Profile.module.css';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null));
  }, []);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchProduct = async () => {
      const { data, error } = await supabase.from('marketplace').select('*').eq('id', id).single();
      if (error || !data) {
        setNotFound(true);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleRequest = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      router.push('/sign-in');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <AppShell>
      <Head>
        <title>{notFound ? 'Item Not Found' : product?.name || 'Marketplace'} | Proxlox</title>
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <main className={styles.wideWrap}>
            {notFound ? (
              <Reveal className={styles.pageHeading}>
                <h1>Item not found</h1>
                <p>
                  This listing may have sold out or been removed.{' '}
                  <Link href="/marketplace">Back to Marketplace</Link>
                </p>
              </Reveal>
            ) : (
              <Reveal>
                <div className={styles.profileCard} style={{ alignItems: 'flex-start' }}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ width: 220, height: 165, objectFit: 'cover', borderRadius: 12 }}
                  />
                  <div className={styles.identity} style={{ flex: 1 }}>
                    <h1>{product.name}</h1>
                    <p className={styles.productPrice} style={{ marginTop: 8 }}>
                      ${product.price}
                    </p>
                    {product.description && <p style={{ marginTop: 12 }}>{product.description}</p>}
                    <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <Link
                        href={user ? `/personal-shopper?item=${encodeURIComponent(product.name)}` : '/sign-in'}
                        onClick={handleRequest}
                        className={styles.actionButton}
                        style={{ marginTop: 0 }}
                      >
                        {user ? 'Request via Personal Shopper' : 'Sign in to Request'}
                      </Link>
                      <Link href="/marketplace" className={styles.smallButton} style={{ padding: '10px 18px' }}>
                        Back to Marketplace
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </main>
        </div>
      </div>
    </AppShell>
  );
}
