"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/policies";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h4>Johnacart.</h4>
          <p>
            A modern Indian gifting store by {COMPANY.name}, built around real product photography, clear
            pricing and cash-on-delivery checkout.
          </p>
        </div>
        <div>
          <h4>SHOP</h4>
          <Link href="/shop">All gifts</Link>
          <Link href="/shop?category=Personalised%20Gifts">Personalised gifts</Link>
          <Link href="/shop?category=Festive%20Gifts">Festive gifts</Link>
          <Link href="/shop?category=Gourmet%20Hampers">Gourmet hampers</Link>
        </div>
        <div>
          <h4>HELP</h4>
          <Link href="/contact">Contact</Link>
          <Link href="/return-policy">Return policy</Link>
          <Link href="/refund-policy">Refund policy</Link>
          <Link href="/cancellation-policy">Cancellation policy</Link>
          <Link href="/shipping-delivery-policy">Shipping &amp; delivery policy</Link>
          <Link href="/account">My account</Link>
          <Link href="/cart">Cart</Link>
        </div>
        <div>
          <h4>INFORMATION</h4>
          <Link href="/about">About Johnacart </Link>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms-of-use">Terms of use</Link>
          <p className="footer-company">
            <strong>{COMPANY.name}</strong>
            <br />
            {COMPANY.address}
            <br />
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a>
            <br />
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Johnacart. Catalogue availability is confirmed before order acceptance.</span>
        <span>
          {COMPANY.name} • {COMPANY.phone} • {COMPANY.email}
        </span>
      </div>
    </footer>
  );
}
