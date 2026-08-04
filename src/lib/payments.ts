/**
 * Mocked payment layer standing in for Stripe Connect. Same function
 * signatures a real integration would use (authorize -> capture/release
 * -> refund), so swapping in real Stripe later only touches this file,
 * not the request-lifecycle logic in personal-shopper.tsx.
 */

export async function authorizePayment(amount: number): Promise<{ success: boolean }> {
  console.log(`[mock payments] authorizing $${amount}`);
  return { success: true };
}

export async function releasePayment(requestId: string): Promise<{ success: boolean }> {
  console.log(`[mock payments] releasing funds for request ${requestId}`);
  return { success: true };
}

export async function refundPayment(requestId: string): Promise<{ success: boolean }> {
  console.log(`[mock payments] refunding request ${requestId}`);
  return { success: true };
}
