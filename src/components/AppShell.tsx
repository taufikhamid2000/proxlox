import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {
  FiMenu,
  FiX,
  FiHome,
  FiShoppingCart,
  FiShoppingBag,
  FiMessageCircle,
  FiBook,
  FiUser,
  FiSettings,
  FiSun,
  FiMoon,
  FiLogOut,
  FiChevronDown,
} from 'react-icons/fi';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/lib/auth';

// Sidebar is task-oriented content areas only — account/identity actions
// (profile, settings, sign out) live in the header's avatar dropdown
// instead, per the usual profile-page convention.
const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/marketplace', label: 'Marketplace', icon: FiShoppingCart },
  { href: '/personal-shopper', label: 'Personal Shopper', icon: FiShoppingBag },
  { href: '/community', label: 'Community', icon: FiMessageCircle },
  { href: '/resources', label: 'Resources', icon: FiBook },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; username?: string; avatarUrl?: string } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          email: data.user.email,
          username: data.user.user_metadata?.username,
          avatarUrl: data.user.user_metadata?.profileImage,
        });
      }
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    const mql = window.matchMedia('(min-width: 1024px)');
    function onMqlChange() {
      if (mql.matches) setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    mql.addEventListener('change', onMqlChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      mql.removeEventListener('change', onMqlChange);
    };
  }, [open]);

  useEffect(() => {
    if (!menuOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const initial = (user?.username || user?.email || '?').charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-navBorder bg-navBg px-4 backdrop-blur md:px-6">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-navFgMuted transition-colors hover:bg-navHoverBg hover:text-navFg lg:hidden"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-vicePink to-viceOrange bg-clip-text px-2 text-sm font-extrabold uppercase tracking-wide text-transparent"
          >
            Proxlox
          </Link>
        </div>

        {/* Avatar dropdown — account/identity actions, not page navigation. */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex h-11 items-center gap-2 rounded-full pl-1 pr-2 text-navFgMuted transition-colors hover:bg-navHoverBg hover:text-navFg"
          >
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-vicePink to-viceOrange text-xs font-bold text-white">
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                initial
              )}
            </span>
            <FiChevronDown size={14} className={`hidden transition-transform sm:block ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-14 z-30 w-56 overflow-hidden rounded-xl border border-navBorder bg-navBg py-1 shadow-xl"
            >
              {user?.email && (
                <div className="border-b border-navBorder px-4 py-3">
                  <p className="truncate text-sm font-medium text-navFg">{user.username || 'Account'}</p>
                  <p className="truncate text-xs text-navFgMuted">{user.email}</p>
                </div>
              )}

              <Link
                href="/profile"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-navFgMuted transition-colors hover:bg-navHoverBg hover:text-navFg"
              >
                <FiUser size={16} /> My Profile
              </Link>
              <Link
                href="/settings"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-navFgMuted transition-colors hover:bg-navHoverBg hover:text-navFg"
              >
                <FiSettings size={16} /> Settings
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={toggleTheme}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-navFgMuted transition-colors hover:bg-navHoverBg hover:text-navFg"
              >
                {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => signOut()}
                className="flex w-full items-center gap-3 border-t border-navBorder px-4 py-2.5 text-left text-sm text-navFgMuted transition-colors hover:bg-navHoverBg hover:text-destructive"
              >
                <FiLogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <div
          aria-hidden={!open}
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-200 lg:hidden ${
            open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Proxlox"
          className={`fixed bottom-0 left-0 top-14 z-30 flex w-64 flex-col gap-1 border-r border-navBorder bg-navBg px-3 py-4 shadow-xl transition-transform duration-200 lg:hidden ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <NavLinks pathname={router.pathname} onNavigate={() => setOpen(false)} />
        </aside>

        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 flex-col gap-1 border-r border-navBorder bg-navBg px-3 py-6 lg:flex">
          <NavLinks pathname={router.pathname} />
        </aside>

        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {navLinks.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? 'page' : undefined}
            className={
              isActive
                ? 'flex min-h-11 items-center gap-3 rounded-lg bg-gradient-to-r from-vicePink/20 to-viceOrange/10 px-3 text-sm font-medium text-white shadow-[0_0_16px_rgba(255,62,165,0.15)]'
                : 'flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm text-navFgMuted transition-colors hover:bg-navHoverBg hover:text-navFg'
            }
          >
            <Icon size={16} /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
