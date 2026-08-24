"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/policies";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-copy">
            <p className="footer-wordmark">jonacart</p>
            <p className="footer-tagline">
              Thoughtful gifts with real photos, clear ₹ pricing, and Cash on Delivery —
              curated for Indian occasions.
            </p>
          </div>
          <Link href="/shop" className="btn btn-accent footer-shop-cta">
            Shop gifts →
          </Link>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Shop</h4>
            <Link href="/shop">All gifts</Link>
            <Link href="/shop?category=Personalised%20Gifts">Personalised gifts</Link>
            <Link href="/shop?category=Festive%20Gifts">Festive gifts</Link>
            <Link href="/shop?category=Gourmet%20Hampers">Gourmet hampers</Link>
            <Link href="/shop?sale=1">Deals</Link>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <Link href="/contact">Contact</Link>
            <Link href="/return-policy">Return policy</Link>
            <Link href="/refund-policy">Refund policy</Link>
            <Link href="/cancellation-policy">Cancellation policy</Link>
            <Link href="/shipping-delivery-policy">Shipping &amp; delivery</Link>
            <Link href="/account">My account</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About jonacart</Link>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-of-use">Terms of use</Link>
          </div>
        </div>

        <div className="footer-contact">
          <div className="footer-contact-item">
            <span className="footer-contact-label">Phone</span>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-label">Email</span>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-label">Support hours</span>
            <p>{COMPANY.supportHours}</p>
          </div>
          <div className="footer-contact-item footer-contact-address">
            <span className="footer-contact-label">Registered office</span>
            <p>{COMPANY.address}</p>
          </div>
        </div>

        <div className="footer-legal">
          <span>© 2026 jonacart</span>
          <span>{COMPANY.name}</span>
        </div>
      </div>
    </footer>
  );
}
