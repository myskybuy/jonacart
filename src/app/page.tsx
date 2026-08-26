"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FestivePopup from "@/components/FestivePopup";
import ProductCard, { Product } from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";
import { RatingBadge } from "@/components/RatingBadge";

const heroAllowedCategories = [
  "Personalised Gifts",
  "Festive Gifts",
  "Gourmet Hampers",
  "Lifestyle Gifts",
  "Kids Gifts",
];

const PROMISES = [
  {
    title: "Free gift wrapping",
    desc: "Every order leaves nicely packed, ready to hand over",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="8" width="18" height="13" rx="1.5" />
        <path d="M3 12h18" />
        <path d="M12 8v13" />
        <path d="M12 8c-2-3-6-3-6 0s4 0 6 0z" />
        <path d="M12 8c2-3 6-3 6 0s-4 0-6 0z" />
      </svg>
    ),
  },
  {
    title: "Cash on delivery",
    desc: "Pay when your gift arrives, anywhere in India",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <circle cx="12" cy="12.5" r="3" />
      </svg>
    ),
  },
  {
    title: "Curated & quality-checked",
    desc: "Every gift is picked and inspected before listing",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "Pan-India delivery",
    desc: "From metros to small towns, we reach your loved ones",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7.5" cy="19" r="1.6" />
        <circle cx="17.5" cy="19" r="1.6" />
      </svg>
    ),
  },
];

const OCCASION_TILES = [
  {
    kicker: "For someone special",
    title: "The Personalised Edit",
    cta: "Shop personalised",
    href: "/shop?category=Personalised%20Gifts",
    className: "occasion-tile--plum",
  },
  {
    kicker: "Season's best",
    title: "Festive Gifting Guide",
    cta: "Shop festive",
    href: "/shop?category=Festive%20Gifts",
    className: "occasion-tile--amber",
  },
  {
    kicker: "Great value",
    title: "Deals up to 50% off",
    cta: "Shop deals",
    href: "/shop?sale=1",
    className: "occasion-tile--ink",
  },
];

type RecentReview = {
  id: number;
  rating: number;
  comment: string;
  userName: string;
  product: { id: number; name: string; image: string };
};

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
  const [recentReviews, setRecentReviews] = useState<RecentReview[]>([]);

  useEffect(() => {
    fetch("/api/reviews/recent?limit=6")
      .then((r) => r.json())
      .then(setRecentReviews)
      .catch(() => setRecentReviews([]));
  }, []);

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

      <section className="promise-strip">
        <div className="container promise-strip-inner">
          {PROMISES.map((p) => (
            <div className="promise-item" key={p.title}>
              <span className="promise-icon" aria-hidden>
                {p.icon}
              </span>
              <div>
                <strong>{p.title}</strong>
                <span>{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
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
          <div className="occasion-grid">
            {OCCASION_TILES.map((tile) => (
              <Link key={tile.title} href={tile.href} className={`occasion-tile ${tile.className}`}>
                <span className="occasion-tile-kicker">{tile.kicker}</span>
                <span className="occasion-tile-title">{tile.title}</span>
                <span className="occasion-tile-cta">{tile.cta} →</span>
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

      {products.length > 8 ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">Just landed</div>
                <h2>New arrivals worth a look.</h2>
              </div>
              <Link href="/shop">View all →</Link>
            </div>
            <div className="product-grid">
              {[...products]
                .reverse()
                .slice(0, 6)
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </div>
        </section>
      ) : null}

      {recentReviews.length ? (
        <section className="section testimonial-strip" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">Loved by gifters</div>
                <h2>Notes from happy customers.</h2>
              </div>
            </div>
            <div className="testimonial-grid">
              {recentReviews.map((r) => (
                <div className="testimonial-card" key={r.id}>
                  <RatingBadge rating={r.rating} />
                  <p className="testimonial-comment">&ldquo;{r.comment}&rdquo;</p>
                  <div className="testimonial-meta">
                    <SafeImage src={r.product.image} alt="" className="testimonial-product-img" />
                    <div>
                      <strong>{r.userName}</strong>
                      <Link href={`/product/${r.product.id}`}>{r.product.name}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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
