"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "./CartProvider";

type User = { id: number; name: string; email: string };

const NAV_LINKS = [
  { href: "/shop", label: "All Gifts" },
  { href: "/shop?category=Personalised%20Gifts", label: "Personalised" },
  { href: "/shop?category=Festive%20Gifts", label: "Festive" },
  { href: "/shop?category=Gourmet%20Hampers", label: "Hampers" },
  { href: "/shop?category=Lifestyle%20Gifts", label: "Lifestyle" },
  { href: "/shop?category=Kids%20Gifts", label: "Kids" },
  { href: "/shop?sale=1", label: "Deals" },
  { href: "/about", label: "About Us" },
];

export default function SiteHeader({ showSearch = true }: { showSearch?: boolean }) {
  const router = useRouter();
  const { cartCount } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setMenuOpen(false);
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-my">JONA</span>
          <span className="logo-cart">CART.</span>
        </Link>
        {showSearch ? (
          <form onSubmit={onSearch} className="search-wrap search-wrap-desktop">
            <span className="search-icon" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3-3" />
              </svg>
            </span>
            <input
              className="search-box"
              placeholder="Search gifts, occasions, brands…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" className="search-submit" aria-label="Search">
              Search
            </button>
          </form>
        ) : null}
        <nav className="main-nav main-nav-desktop" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href + link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href={user ? "/profile" : "/account"}
            className="profile-link"
            title={user ? "My profile" : "Login / Sign up"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <span className="profile-label">{user ? user.name.split(" ")[0] : "Account"}</span>
          </Link>
          <Link href="/cart" className="cart-icon-btn" aria-label={`Cart, ${cartCount} items`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6l-1-3H2" />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="cart-qty-badge">{cartCount > 99 ? "99+" : cartCount}</span>
          </Link>
          <button
            type="button"
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button type="button" className="mobile-nav-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
          <div className="mobile-nav-panel">
            {showSearch ? (
              <form onSubmit={onSearch} className="search-wrap search-wrap-mobile">
                <span className="search-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3-3" />
                  </svg>
                </span>
                <input
                  className="search-box"
                  placeholder="Search gifts…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search products"
                />
                <button type="submit" className="search-submit" aria-label="Search">
                  Go
                </button>
              </form>
            ) : null}
            <nav className="main-nav main-nav-mobile" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link key={link.href + link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
