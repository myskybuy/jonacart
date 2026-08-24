"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FestivePopup from "@/components/FestivePopup";
import ProductCard, { Product } from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";

const heroAllowedCategories = [
  "Personalised Gifts",
  "Festive Gifts",
  "Gourmet Hampers",
  "Lifestyle Gifts",
  "Kids Gifts",
];

const CATEGORY_FALLBACKS: Record<string, string> = {
  "Personalised Gifts": "/images/categories/personalised.svg",
  "Festive Gifts": "/images/categories/festive.svg",
  "Gourmet Hampers": "/images/categories/hampers.svg",
  "Lifestyle Gifts": "/images/categories/lifestyle.svg",
  "Kids Gifts": "/images/categories/kids.svg",
};

export default function HomePage() {
  const [categories, setCategories] = useState<Array<{ id: number; name: string; image: string }>>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: Array<{ id: number; name: string; image: string }>) => {
        if (!Array.isArray(data)) return;
        setCategories(
          data.map((c) => ({
            ...c,
            image: c.image?.startsWith("/") || c.image?.startsWith("http")
              ? c.image.includes("jonacart.com/wp-content")
                ? CATEGORY_FALLBACKS[c.name] || "/images/placeholder.svg"
                : c.image
              : CATEGORY_FALLBACKS[c.name] || "/images/placeholder.svg",
          })),
        );
      });
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => {
        if (!Array.isArray(data)) return;
        setProducts(data);
        setHeroProducts(
          data.filter((p) => heroAllowedCategories.includes(p.category) && p.image).slice(0, 8),
        );
      });
  }, []);

  useEffect(() => {
    if (!heroProducts.length) return;
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroProducts.length), 4000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const currentHero = heroProducts[heroIndex];

  return (
    <>
      <FestivePopup />
      <StoreShell>
        <SiteHeader />

      <section className="hero" aria-label="Featured gifts">
        <div className="hero-visual" aria-hidden={!currentHero}>
          {currentHero ? (
            <SafeImage
              key={currentHero.id}
              src={currentHero.image}
              alt=""
              className="hero-visual-img"
              loading="eager"
            />
          ) : (
            <SafeImage
              src="/images/placeholder.svg"
              alt=""
              className="hero-visual-img"
              loading="eager"
            />
          )}
          <div className="hero-scrim" />
        </div>

        <div className="hero-copy">
          <p className="hero-brand">jonacart</p>
          <h1>
            Gifts that feel
            <br />
            <span className="accent">personal.</span>
          </h1>
          <p className="hero-lead">
            Curated for Indian occasions — clear pricing, real photos, Cash on Delivery.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="btn btn-accent">
              Shop gifts
            </Link>
            <Link href="/shop?sale=1" className="btn btn-outline hero-btn-ghost">
              View deals
            </Link>
          </div>
        </div>

        {currentHero ? (
          <div className="hero-feature">
            <Link href={`/product/${currentHero.id}`} className="hero-feature-link">
              <span className="hero-feature-label">Featured</span>
              <span className="hero-feature-name">{currentHero.name}</span>
              <span className="hero-feature-price">
                ₹{Number(currentHero.salePrice ?? currentHero.price).toLocaleString("en-IN")}
              </span>
            </Link>
            {heroProducts.length > 1 ? (
              <div className="hero-feature-nav" role="group" aria-label="Featured products">
                <button
                  type="button"
                  className="hero-nav-btn"
                  aria-label="Previous"
                  onClick={() =>
                    setHeroIndex((i) => (i - 1 + heroProducts.length) % heroProducts.length)
                  }
                >
                  ‹
                </button>
                <div className="hero-dots">
                  {heroProducts.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={index === heroIndex ? "active" : ""}
                      aria-label={`Product ${index + 1}`}
                      aria-current={index === heroIndex}
                      onClick={() => setHeroIndex(index)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="hero-nav-btn"
                  aria-label="Next"
                  onClick={() => setHeroIndex((i) => (i + 1) % heroProducts.length)}
                >
                  ›
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Gift departments</div>
              <h2>Every shelf is built around a gifting moment.</h2>
            </div>
          </div>
          <div className="category-cards">
            {categories.map((c) => (
              <Link key={c.id} className="category-card" href={`/shop?category=${encodeURIComponent(c.name)}`}>
                <div className="cc-thumb">
                  <SafeImage src={c.image || CATEGORY_FALLBACKS[c.name] || "/images/placeholder.svg"} alt={c.name} />
                </div>
                <div className="cc-name">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Freshly curated</div>
              <h2>Popular gifts ready for your cart.</h2>
            </div>
            <Link href="/shop">View all →</Link>
          </div>
          <div className="product-grid">{products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      <div className="cta-band">
        <div className="eyebrow">Explore our gifting catalogue</div>
        <h2>Browse personalised gifts, hampers, decor and festive picks in one polished place.</h2>
        <Link href="/shop" className="btn btn-outline">
          See all gifts →
        </Link>
      </div>

      <SiteFooter />
      </StoreShell>
    </>
  );
}
