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
        setHeroProducts(data.filter((p) => heroAllowedCategories.includes(p.category) && p.image));
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
      <StoreShell
        topBar={
          <div className="top-bar">
            Occasion-ready gifts across India &nbsp;•&nbsp; Prices shown in INR &nbsp;•&nbsp; Cash on Delivery
            available
          </div>
        }
      >
        <SiteHeader />

      <section className="hero" aria-label="Featured gifts">
        <div className="hero-layout">
          <div className="hero-panel">
            <p className="hero-brand">jonacart</p>
            <h1>
              Gifts that look
              <br />
              <span className="accent">like you meant it.</span>
            </h1>
            <p className="hero-lead">
              Real product photos, clear ₹ pricing, and Cash on Delivery — gifts curated for Indian
              occasions.
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-accent">
                Shop all gifts
              </Link>
              <Link href="/shop?sale=1" className="btn btn-outline hero-btn-ghost">
                View deals
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-stage">
              {heroProducts.length ? (
                heroProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`hero-bg-slide${index === heroIndex ? " active" : ""}`}
                    aria-hidden={index !== heroIndex}
                  >
                    <SafeImage
                      src={product.image}
                      alt=""
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))
              ) : (
                <div className="hero-bg-slide active" aria-hidden>
                  <SafeImage src="/images/placeholder.svg" alt="" loading="eager" />
                </div>
              )}
            </div>
          </div>
        </div>

        {currentHero ? (
          <div className="hero-rail">
            <Link href={`/product/${currentHero.id}`} className="hero-rail-main">
              <span className="hero-rail-brand">{currentHero.brand || "jonacart"}</span>
              <strong className="hero-rail-name">{currentHero.name}</strong>
              <span className="hero-rail-price">
                ₹{Number(currentHero.salePrice ?? currentHero.price).toLocaleString("en-IN")}
                {currentHero.salePrice < currentHero.price ? (
                  <del>₹{Number(currentHero.price).toLocaleString("en-IN")}</del>
                ) : null}
              </span>
            </Link>
            <div className="hero-rail-controls">
              <button
                type="button"
                className="hero-rail-btn"
                aria-label="Previous product"
                onClick={() =>
                  setHeroIndex((i) => (i - 1 + heroProducts.length) % heroProducts.length)
                }
              >
                ‹
              </button>
              <div className="hero-rail-dots">
                {heroProducts.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index === heroIndex ? "active" : ""}
                    aria-label={`Go to product ${index + 1}`}
                    onClick={() => setHeroIndex(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="hero-rail-btn"
                aria-label="Next product"
                onClick={() => setHeroIndex((i) => (i + 1) % heroProducts.length)}
              >
                ›
              </button>
            </div>
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
