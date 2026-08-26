"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";

type User = { id: number; name: string; email: string };

export default function WishlistPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [items, setItems] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        setUser(d.user);
        setAuthChecked(true);
        if (!d.user) {
          setItems([]);
          return;
        }
        fetch("/api/wishlist", { credentials: "include" })
          .then((r) => r.json())
          .then((data) => setItems(data.items || []));
      });
  }, []);

  return (
    <StoreShell>
      <SiteHeader showSearch={false} />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Saved for later</div>
              <h2>Your wishlist</h2>
            </div>
          </div>

          {authChecked && !user ? (
            <p className="empty-note">
              <Link href="/account">Login</Link> to see and save gifts to your wishlist.
            </p>
          ) : items === null ? (
            <p className="empty-note">Loading…</p>
          ) : items.length ? (
            <div className="product-grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="empty-note">
              Nothing saved yet — tap &ldquo;Save&rdquo; on any gift to add it here. <Link href="/shop">Browse gifts →</Link>
            </p>
          )}
        </div>
      </section>
      <SiteFooter />
    </StoreShell>
  );
}
