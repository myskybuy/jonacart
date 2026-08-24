"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Product } from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";
import { useCart } from "@/components/CartProvider";

export default function ProductPage() {
  const params = useParams();
  const { addToCart, isInCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [feedback, setFeedback] = useState<"idle" | "added">("idle");

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then(setProduct);
  }, [params.id]);

  useEffect(() => {
    if (feedback !== "added") return;
    const t = setTimeout(() => setFeedback("idle"), 2500);
    return () => clearTimeout(t);
  }, [feedback]);

  if (!product) {
    return (
      <StoreShell>
        <SiteHeader showSearch={false} />
        <div className="container" style={{ padding: "40px 24px" }}>
          Loading…
        </div>
        <SiteFooter />
      </StoreShell>
    );
  }

  const discount = product.price > 0 ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;
  const inCart = isInCart(product.id);
  const btnLabel = feedback === "added" ? "Item added to cart" : inCart ? "In cart" : "Add to cart";

  return (
    <StoreShell>
      <SiteHeader showSearch={false} />
      <div className="product-page">
        <div className="product-gallery">
          {discount > 0 ? <span className="badge-sale">{discount}% OFF</span> : null}
          <SafeImage src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <span className="brand">{product.brand}</span>
          <h1>{product.name}</h1>
          <div className="price-row">
            <span className="price-now">₹{product.salePrice}</span>
            {product.price > product.salePrice ? <span className="price-old">₹{product.price}</span> : null}
          </div>
          <p className="product-desc">{product.description}</p>
          <div className="qty-row">
            <span className="qty-label">Quantity</span>
            <div className="qty-stepper" role="group" aria-label="Quantity">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span aria-live="polite">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="pdp-actions">
            <button
              className={`btn btn-accent btn-block ${feedback === "added" ? "added" : ""}`}
              type="button"
              onClick={() => {
                addToCart(
                  { id: product.id, name: product.name, image: product.image, salePrice: product.salePrice },
                  qty
                );
                setFeedback("added");
                toast.success("Added to cart");
              }}
            >
              {btnLabel}
            </button>
            <Link href="/cart" className="btn btn-outline btn-block">
              Go to cart
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </StoreShell>
  );
}
