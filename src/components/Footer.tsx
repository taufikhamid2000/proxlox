import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} EduBridge. All rights reserved.</p>
      <nav>
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </nav>
    </footer>
  );
}
