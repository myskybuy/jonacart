"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Product } from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { RatingBadge, RatingStarsInput } from "@/components/RatingBadge";

type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
  isMine: boolean;
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  const { addToCart, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [feedback, setFeedback] = useState<"idle" | "added">("idle");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingSummary, setRatingSummary] = useState({ avgRating: 0, reviewCount: 0 });
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then(setProduct);
  }, [params.id]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setLoggedIn(!!d.user))
      .catch(() => setLoggedIn(false));
  }, []);

  const loadReviews = useCallback(() => {
    if (!productId) return;
    setReviewsLoading(true);
    fetch(`/api/reviews?productId=${productId}`)
      .then((r) => r.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setRatingSummary({ avgRating: data.avgRating || 0, reviewCount: data.reviewCount || 0 });
        const mine = (data.reviews || []).find((r: Review) => r.isMine);
        if (mine) {
          setMyRating(mine.rating);
          setMyComment(mine.comment);
        }
      })
      .finally(() => setReviewsLoading(false));
  }, [productId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    if (feedback !== "added") return;
    const t = setTimeout(() => setFeedback("idle"), 2500);
    return () => clearTimeout(t);
  }, [feedback]);

  async function submitReview() {
    if (!loggedIn) {
      toast.error("Login to write a review", {
        action: { label: "Login", onClick: () => router.push("/account") },
      });
      return;
    }
    if (myRating < 1) {
      toast.error("Pick a rating first");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, rating: myRating, comment: myComment }),
      });
      if (!res.ok) throw new Error();
      toast.success("Thanks for your review!");
      loadReviews();
    } catch {
      toast.error("Couldn't submit your review, try again");
    } finally {
      setSubmitting(false);
    }
  }

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
  const wishlisted = isWishlisted(product.id);
  const btnLabel = feedback === "added" ? "Item added to cart" : inCart ? "In cart" : "Add to cart";
  const myExistingReview = reviews.find((r) => r.isMine);

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
          {ratingSummary.reviewCount > 0 ? (
            <a href="#reviews" className="pdp-rating-link">
              <RatingBadge rating={ratingSummary.avgRating} count={ratingSummary.reviewCount} />
            </a>
          ) : null}
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
            <button
              type="button"
              className={`btn btn-outline btn-block wishlist-toggle ${wishlisted ? "on" : ""}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M12 20.5s-7.5-4.6-10-9.3C.4 7.7 2.2 4 5.9 4c2.1 0 3.7 1.1 4.6 2.6C11.4 5.1 13 4 15.1 4c3.7 0 5.5 3.7 3.9 7.2-2.5 4.7-10 9.3-10 9.3z" />
              </svg>
              {wishlisted ? "Saved to wishlist" : "Save to wishlist"}
            </button>
            <Link href="/cart" className="btn btn-outline btn-block">
              Go to cart
            </Link>
          </div>
        </div>
      </div>

      <section className="section reviews-block" id="reviews">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Ratings &amp; reviews</div>
              <h2>What customers say</h2>
            </div>
            <RatingBadge rating={ratingSummary.avgRating} count={ratingSummary.reviewCount} />
          </div>

          <div className="review-form-card">
            <h3>{myExistingReview ? "Update your review" : "Rate this gift"}</h3>
            <RatingStarsInput value={myRating} onChange={setMyRating} />
            <textarea
              placeholder="How was your experience with this gift?"
              value={myComment}
              onChange={(e) => setMyComment(e.target.value)}
              rows={3}
            />
            <button type="button" className="btn btn-accent" onClick={submitReview} disabled={submitting}>
              {submitting ? "Submitting…" : myExistingReview ? "Update review" : "Submit review"}
            </button>
          </div>

          <div className="review-list">
            {reviewsLoading ? (
              <p className="empty-note">Loading reviews…</p>
            ) : reviews.length ? (
              reviews.map((r) => (
                <div className="review-row" key={r.id}>
                  <div className="review-row-head">
                    <RatingBadge rating={r.rating} />
                    <span className="review-author">{r.userName}</span>
                    <span className="review-date">{new Date(r.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  {r.comment ? <p className="review-text">{r.comment}</p> : null}
                </div>
              ))
            ) : (
              <p className="empty-note">No reviews yet — be the first to rate this gift.</p>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </StoreShell>
  );
}
