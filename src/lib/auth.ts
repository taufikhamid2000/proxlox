import { supabase } from './supabase';

export const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) throw signInError;
  return signInData.session;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;
  return data.session;
};

export const signOut = async () => {
  await supabase.auth.signOut();
  window.location.href = "/";
};

// "Try the demo — no account needed": anonymous Supabase sign-in so a
// visitor can poke around the dashboard/marketplace without creating an
// account first.
export const startDemo = async () => {
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) throw error;
  return data.session;
};
