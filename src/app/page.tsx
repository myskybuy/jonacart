"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FestivePopup from "@/components/FestivePopup";
import ProductCard, { Product } from "@/components/ProductCard";
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

export default function HomePage() {
  const [categories, setCategories] = useState<Array<{ id: number; name: string; image: string }>>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => {
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

      <section className="hero">
        <div className="hero-inner">
          <div>
            <h1>
              Gifts that look
              <br />
              <span className="accent">like you meant it.</span>
            </h1>
            <p>
              Shop occasion-ready gifts with real product photos, rupee pricing, add-to-cart checkout and
              Cash on Delivery for Indian customers.
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-accent">
                Shop all gifts
              </Link>
              <Link href="/shop?sale=1" className="btn btn-outline">
                View deals
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>80+</strong>
                <span>curated gifting picks</span>
              </div>
              <div>
                <strong>COD</strong>
                <span>pay on delivery</span>
              </div>
              <div>
                <strong>₹</strong>
                <span>transparent pricing</span>
              </div>
            </div>
          </div>
          <div className="hero-visual bag-carousel">
            {currentHero ? (
              <>
                <div id="hero-carousel">
                  {heroProducts.map((product, index) => {
                    const currentPrice = product.salePrice ?? product.price;
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className={`hero-slide ${index === heroIndex ? "active" : ""}`}
                      >
                        <div className="hero-slide-media">
                          <img src={product.image} alt={product.name} loading={index === 0 ? "eager" : "lazy"} />
                        </div>
                        <div className="hero-product-info">
                          <span>{product.brand || "Johnacart"}</span>
                          <strong>{product.name}</strong>
                          <div className="hero-price">
                            <b>₹{Number(currentPrice).toLocaleString("en-IN")}</b>
                            {product.salePrice < product.price ? (
                              <del>₹{Number(product.price).toLocaleString("en-IN")}</del>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <button
                  className="carousel-btn carousel-prev"
                  type="button"
                  aria-label="Previous product"
                  onClick={() =>
                    setHeroIndex((i) => (i - 1 + heroProducts.length) % heroProducts.length)
                  }
                >
                  ‹
                </button>
                <button
                  className="carousel-btn carousel-next"
                  type="button"
                  aria-label="Next product"
                  onClick={() => setHeroIndex((i) => (i + 1) % heroProducts.length)}
                >
                  ›
                </button>
                <div className="carousel-dots">
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
              </>
            ) : null}
          </div>
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
                  <img src={c.image} alt={c.name} />
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
