/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';
import AppShell from '@/components/AppShell';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import styles from '@/styles/Profile.module.css'; // Using shared CSS

export default function Marketplace() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/sign-in');
      } else {
        setUser(data.user);
        fetchProducts();
      }
    };

    checkUser();
  }, [router]);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('marketplace').select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <AppShell>
      <Head>
        <title>Marketplace | Proxlox</title>
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          {/* Wide canvas — a browsing task wants more visible options at
              once, not a 600px form-card width. */}
          <main className={styles.wideWrap}>
            <Reveal className={styles.pageHeading}>
              <h1>Marketplace</h1>
              <p>Buy and sell items with the student community.</p>
            </Reveal>

            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products available yet.</p>
            ) : (
              <div className={styles.marketplaceGrid}>
                {products.map((product, i) => (
                  <Reveal key={product.id} delay={i * 60} className={styles.productCard}>
                    <img src={product.image_url} alt={product.name} className={styles.productImage} />
                    <h3>{product.name}</h3>
                    <p className={styles.productPrice}>${product.price}</p>
                    <button className={styles.actionButton} onClick={() => router.push(`/marketplace/${product.id}`)}>
                      View Details
                    </button>
                  </Reveal>
                ))}
              </div>
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
