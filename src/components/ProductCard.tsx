"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { RatingBadge } from "./RatingBadge";
import SafeImage from "./SafeImage";

export type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  salePrice: number;
  image: string;
  stock: number;
  description: string;
  avgRating?: number;
  reviewCount?: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [feedback, setFeedback] = useState<"idle" | "added">("idle");
  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);
  const discount = product.price > 0 ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  useEffect(() => {
    if (feedback !== "added") return;
    const t = setTimeout(() => setFeedback("idle"), 2500);
    return () => clearTimeout(t);
  }, [feedback]);

  function handleAdd() {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      salePrice: product.salePrice,
    });
    setFeedback("added");
    toast.success("Added to cart");
  }

  const btnLabel =
    feedback === "added" ? "Item added to cart" : inCart ? "In cart" : "Add to cart";

  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`} className="thumb">
        {discount > 0 ? <span className="badge-sale">{discount}% OFF</span> : null}
        <SafeImage src={product.image} alt={product.name} />
      </Link>
      <button
        type="button"
        className={`wishlist-stamp ${wishlisted ? "on" : ""}`}
        aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M12 20.5s-7.5-4.6-10-9.3C.4 7.7 2.2 4 5.9 4c2.1 0 3.7 1.1 4.6 2.6C11.4 5.1 13 4 15.1 4c3.7 0 5.5 3.7 3.9 7.2-2.5 4.7-10 9.3-10 9.3z" />
        </svg>
        {wishlisted ? "Saved" : "Save"}
      </button>
      <div className="info">
        <span className="brand">{product.brand}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className="name">{product.name}</h3>
        </Link>
        <RatingBadge rating={product.avgRating || 0} count={product.reviewCount || 0} />
        <div className="price-row">
          <span className="price-now">₹{product.salePrice}</span>
          {product.price > product.salePrice ? <span className="price-old">₹{product.price}</span> : null}
        </div>
        <button
          className={`add-btn ${feedback === "added" ? "added" : ""} ${inCart && feedback === "idle" ? "in-cart" : ""}`}
          onClick={handleAdd}
          type="button"
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
}
