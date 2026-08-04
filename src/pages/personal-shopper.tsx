import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';
import { authorizePayment, releasePayment } from '@/lib/payments';
import AppShell from '@/components/AppShell';
import Reveal from '@/components/Reveal';
import styles from '@/styles/Profile.module.css';

type Request = {
  id: string;
  user_id: string;
  shopper_id: string | null;
  item_name: string;
  budget: number | null;
  status: string;
  payment_status: string;
  created_at: string;
};

const badgeClass: Record<string, string> = {
  requested: styles.badgeRequested,
  claimed: styles.badgeClaimed,
  purchased: styles.badgePurchased,
  delivered: styles.badgeDelivered,
  released: styles.badgeReleased,
  disputed: styles.badgeDisputed,
  cancelled: styles.badgeCancelled,
};

export default function PersonalShopper() {
  const [userId, setUserId] = useState<string | null>(null);
  const [tab, setTab] = useState<'mine' | 'browse' | 'claimed'>('mine');
  const [itemName, setItemName] = useState('');
  const [budget, setBudget] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [myRequests, setMyRequests] = useState<Request[]>([]);
  const [openRequests, setOpenRequests] = useState<Request[]>([]);
  const [claimedRequests, setClaimedRequests] = useState<Request[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/sign-in');
        return;
      }
      setUserId(data.user.id);
      refresh(data.user.id);
    };
    checkUser();
  }, [router]);

  // Prefill from a marketplace listing's "Request via Personal Shopper" link.
  useEffect(() => {
    if (typeof router.query.item === 'string') {
      setItemName(router.query.item);
    }
  }, [router.query.item]);

  const refresh = async (uid: string) => {
    const [mine, open, claimed] = await Promise.all([
      supabase
        .from('personal_shopper_requests')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .then((res) => res.data || []),
      supabase
        .from('personal_shopper_requests')
        .select('*')
        .eq('status', 'requested')
        .neq('user_id', uid)
        .order('created_at', { ascending: false })
        .then((res) => res.data || []),
      supabase
        .from('personal_shopper_requests')
        .select('*')
        .eq('shopper_id', uid)
        .order('created_at', { ascending: false })
        .then((res) => res.data || []),
    ]);
    setMyRequests(mine);
    setOpenRequests(open);
    setClaimedRequests(claimed);
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !itemName.trim() || !budget) return;
    setSubmitting(true);

    const amount = parseFloat(budget);
    const { success } = await authorizePayment(amount);
    if (!success) {
      alert('Payment authorization failed.');
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from('personal_shopper_requests').insert([
      {
        user_id: userId,
        item_name: itemName.trim(),
        budget: amount,
        status: 'requested',
        payment_status: 'authorized',
      },
    ]);

    setSubmitting(false);
    if (error) {
      alert('Error creating request.');
    } else {
      setItemName('');
      setBudget('');
      refresh(userId);
    }
  };

  const claimRequest = async (id: string) => {
    if (!userId) return;
    const { error } = await supabase
      .from('personal_shopper_requests')
      .update({ shopper_id: userId, status: 'claimed', claimed_at: new Date().toISOString() })
      .eq('id', id);
    if (error) alert('Could not claim this request — someone may have just claimed it.');
    refresh(userId);
  };

  const markPurchased = async (id: string) => {
    if (!userId) return;
    await supabase
      .from('personal_shopper_requests')
      .update({ status: 'purchased', purchased_at: new Date().toISOString() })
      .eq('id', id);
    refresh(userId);
  };

  const markDelivered = async (id: string) => {
    if (!userId) return;
    await supabase
      .from('personal_shopper_requests')
      .update({ status: 'delivered', delivered_at: new Date().toISOString() })
      .eq('id', id);
    refresh(userId);
  };

  const confirmDelivery = async (id: string) => {
    if (!userId) return;
    const { success } = await releasePayment(id);
    if (!success) {
      alert('Could not release payment.');
      return;
    }
    await supabase
      .from('personal_shopper_requests')
      .update({ status: 'released', payment_status: 'released', released_at: new Date().toISOString() })
      .eq('id', id);
    refresh(userId);
  };

  const disputeDelivery = async (id: string) => {
    if (!userId) return;
    await supabase.from('personal_shopper_requests').update({ status: 'disputed' }).eq('id', id);
    refresh(userId);
  };

  const cancelRequest = async (id: string) => {
    if (!userId) return;
    await supabase.from('personal_shopper_requests').update({ status: 'cancelled' }).eq('id', id);
    refresh(userId);
  };

  if (!userId) return <p>Loading...</p>;

  return (
    <AppShell>
      <Head>
        <title>Personal Shopper | Proxlox</title>
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <main className={styles.wideWrap}>
            <Reveal className={styles.pageHeading}>
              <h1>Personal Shopper</h1>
              <p>Request an item and a shopper picks it up for you — funds stay held until you confirm delivery.</p>
            </Reveal>

            <div className={styles.tabRow}>
              <button
                className={tab === 'mine' ? styles.tabButtonActive : styles.tabButton}
                onClick={() => setTab('mine')}
              >
                My Requests
              </button>
              <button
                className={tab === 'browse' ? styles.tabButtonActive : styles.tabButton}
                onClick={() => setTab('browse')}
              >
                Browse Open Requests
              </button>
              <button
                className={tab === 'claimed' ? styles.tabButtonActive : styles.tabButton}
                onClick={() => setTab('claimed')}
              >
                Requests I&apos;m Fulfilling
              </button>
            </div>

            {tab === 'mine' && (
              <>
                <Reveal>
                  <form className={styles.requestForm} onSubmit={handleCreateRequest}>
                    <div className={styles.field}>
                      <label htmlFor="itemName">Item</label>
                      <input
                        id="itemName"
                        type="text"
                        placeholder="e.g. Nebula Runner Sneakers, size 9"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.field} style={{ maxWidth: 140 }}>
                      <label htmlFor="budget">Max Budget ($)</label>
                      <input
                        id="budget"
                        type="number"
                        min="1"
                        step="0.01"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className={styles.actionButton} disabled={submitting} style={{ marginTop: 0 }}>
                      {submitting ? 'Authorizing...' : 'Request Shopper'}
                    </button>
                  </form>
                </Reveal>

                <div className={styles.requestList}>
                  {myRequests.length === 0 && <p>No requests yet — post one above.</p>}
                  {myRequests.map((r) => (
                    <div key={r.id} className={styles.requestCard}>
                      <div className={styles.requestInfo}>
                        <h3>{r.item_name}</h3>
                        <span>
                          Budget ${r.budget} · <span className={badgeClass[r.status]}>{r.status}</span>
                        </span>
                      </div>
                      <div className={styles.requestActions}>
                        {r.status === 'requested' && (
                          <button className={styles.smallButtonDanger} onClick={() => cancelRequest(r.id)}>
                            Cancel
                          </button>
                        )}
                        {r.status === 'delivered' && (
                          <>
                            <button className={styles.smallButtonPrimary} onClick={() => confirmDelivery(r.id)}>
                              Confirm Delivery
                            </button>
                            <button className={styles.smallButtonDanger} onClick={() => disputeDelivery(r.id)}>
                              Dispute
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'browse' && (
              <Reveal className={styles.requestList}>
                {openRequests.length === 0 && <p>No open requests right now.</p>}
                {openRequests.map((r) => (
                  <div key={r.id} className={styles.requestCard}>
                    <div className={styles.requestInfo}>
                      <h3>{r.item_name}</h3>
                      <span>Budget ${r.budget}</span>
                    </div>
                    <div className={styles.requestActions}>
                      <button className={styles.smallButtonPrimary} onClick={() => claimRequest(r.id)}>
                        Claim
                      </button>
                    </div>
                  </div>
                ))}
              </Reveal>
            )}

            {tab === 'claimed' && (
              <Reveal className={styles.requestList}>
                {claimedRequests.length === 0 && <p>You haven&apos;t claimed any requests yet.</p>}
                {claimedRequests.map((r) => (
                  <div key={r.id} className={styles.requestCard}>
                    <div className={styles.requestInfo}>
                      <h3>{r.item_name}</h3>
                      <span>
                        Budget ${r.budget} · <span className={badgeClass[r.status]}>{r.status}</span>
                      </span>
                    </div>
                    <div className={styles.requestActions}>
                      {r.status === 'claimed' && (
                        <button className={styles.smallButtonPrimary} onClick={() => markPurchased(r.id)}>
                          Mark as Purchased
                        </button>
                      )}
                      {r.status === 'purchased' && (
                        <button className={styles.smallButtonPrimary} onClick={() => markDelivered(r.id)}>
                          Mark as Delivered
                        </button>
                      )}
                      {(r.status === 'delivered' || r.status === 'released') && (
                        <span className={badgeClass[r.status]}>
                          {r.status === 'released' ? 'Payment released' : 'Awaiting buyer confirmation'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </Reveal>
            )}
          </main>
        </div>
      </div>
    </AppShell>
  );
}
