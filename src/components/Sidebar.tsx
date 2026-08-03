import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  FiMenu,
  FiHome,
  FiUser,
  FiShoppingCart,
  FiMessageCircle,
  FiSettings,
  FiLogOut,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { signOut } from '@/lib/auth';
import styles from '@/styles/Sidebar.module.css';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/profile', label: 'My Profile', icon: FiUser },
  { href: '/marketplace', label: 'Marketplace', icon: FiShoppingCart },
  { href: '/community', label: 'Community', icon: FiMessageCircle },
  { href: '/settings', label: 'Settings', icon: FiSettings },
];

export default function Sidebar({
  onToggle,
}: {
  onToggle: (open: boolean) => void;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    onToggle(isOpen);
  }, [isOpen, onToggle]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <>
      {!isOpen && (
        <button className={styles.menuButton} onClick={() => setIsOpen(true)}>
          <FiMenu />
        </button>
      )}

      <div
        className={`${styles.overlay} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${isMobile ? styles.mobile : ''}`}
      >
        <div className={styles.logo}>Proxlox</div>
        <nav>
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = router.pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={isActive ? { background: 'var(--nav-active-bg)', color: 'var(--nav-fg)' } : undefined}
              >
                <Icon /> {label}
              </Link>
            );
          })}

          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button className={styles.logout} onClick={signOut}>
            <FiLogOut /> Sign Out
          </button>
        </nav>
      </aside>
    </>
  );
}
