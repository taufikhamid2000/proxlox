import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiShoppingCart,
  FiMessageCircle,
  FiBook,
  FiSettings,
  FiSun,
  FiMoon,
  FiLogOut,
} from 'react-icons/fi';
import { signOut } from '@/lib/auth';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/profile', label: 'My Profile', icon: FiUser },
  { href: '/marketplace', label: 'Marketplace', icon: FiShoppingCart },
  { href: '/community', label: 'Community', icon: FiMessageCircle },
  { href: '/resources', label: 'Resources', icon: FiBook },
  { href: '/settings', label: 'Settings', icon: FiSettings },
];

// Single app shell in the same vice-city chrome as the marketing header:
// a sticky 56px header (gradient wordmark + hamburger left, sign-out
// right) with the sidebar docked directly below it — a static column
// from lg up, a slide-in drawer opened from the hamburger below that.
export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

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

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-navFgMuted transition-colors hover:bg-navHoverBg hover:text-navFg"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => signOut()}
            aria-label="Sign out"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-navFgMuted transition-colors hover:bg-navHoverBg hover:text-destructive sm:h-auto sm:w-auto sm:rounded-full sm:px-4 sm:py-2"
          >
            <FiLogOut size={18} className="sm:hidden" />
            <span className="hidden text-sm font-medium sm:inline">Sign Out</span>
          </button>
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
