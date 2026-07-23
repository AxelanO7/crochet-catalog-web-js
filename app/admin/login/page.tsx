'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/admin/products');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 p-8 bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-soft"
      >
        <h1 className="font-display text-2xl text-on-surface text-center mb-2">Rianne Collective Admin</h1>
        <div>
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-surface border border-outline-variant/50 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-surface border border-outline-variant/50 focus:border-primary outline-none"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-primary text-on-primary font-medium rounded-full hover:bg-primary-container transition-colors disabled:opacity-50"
        >
          {loading ? '...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
