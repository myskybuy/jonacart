import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";
import { COMPANY } from "@/lib/policies";

const HERO_IMG = "https://placehold.co/900x700/c0245a/fdf3e6?text=Johnacart&font=montserrat";
const WHO_IMG = "https://placehold.co/900x700/2a1338/fdf3e6?text=Gifted+With+Care&font=montserrat";

const stats = [
  { num: "80+", label: "curated gifting picks" },
  { num: "6", label: "gift departments" },
  { num: "COD", label: "available pan-India" },
  { num: "₹", label: "transparent INR pricing" },
];

const offers = [
  {
    title: "Personalised Gifts",
    text: "Photo and name-led keepsakes, puzzle boxes and hampers made for thoughtful, memory-led gifting.",
    icon: "🎁",
  },
  {
    title: "Festive Gifts",
    text: "Rakhi sets, lumba bracelets and seasonal picks for family celebrations across the year.",
    icon: "🪔",
  },
  {
    title: "Gourmet Hampers",
    text: "Chocolates, snacks and food hampers packed for gifting, not just eating.",
    icon: "🍫",
  },
  {
    title: "Lifestyle Gifts",
    text: "Useful, everyday pieces that make thoughtful gifts for the people who have everything.",
    icon: "✨",
  },
  {
    title: "Kids Gifts",
    text: "Bright, playful picks for kids' celebrations, school events and festive moments.",
    icon: "🧸",
  },
];

const process = [
  { step: "01", title: "Choose a gift", text: "Browse by occasion or department and pick something that fits the moment." },
  { step: "02", title: "Add to cart", text: "See rupee pricing up front — no surprise charges added at the last step." },
  { step: "03", title: "Checkout your way", text: "Pay with Cash on Delivery, or complete a secure online payment at checkout." },
  { step: "04", title: "Track & receive", text: "We confirm stock and dispatch details before your order ships to you." },
];

const reasons = [
  { num: "01", title: "Real Product Photography", text: "What you see is what ships — every listing is reviewed for accurate presentation before it goes live." },
  { num: "02", title: "Transparent Pricing", text: "Clear regular and sale prices in ₹, with nothing hidden until checkout." },
  { num: "03", title: "Cash On Delivery", text: "Order with confidence — pay when your gift actually arrives at your door." },
  { num: "04", title: "Responsive Support", text: "Order status, delivery, cancellation, return or refund help — one email or call away." },
];

export default function AboutPage() {
  return (
    <StoreShell>
      <SiteHeader />

      {/* Hero */}
      <section className="about-hero">
        <div className="container about-split">
          <div className="about-copy">
            <p className="about-eyebrow gold">About Johnacart</p>
            <h1>Gifting, done properly.</h1>
            <p className="about-lead">
              Johnacart is an Indian ecommerce store operated by <strong>{COMPANY.name}</strong>. We help
              customers discover and purchase gifts, hampers, personalised products, home décor and
              related items through a clear, secure and convenient online shopping experience — built for
              how India actually gifts.
            </p>
            <Link href="/shop" className="btn btn-accent about-cta">
              Explore Our Collection →
            </Link>
          </div>
          <div className="about-media">
            <img src={HERO_IMG} alt="Johnacart gifting edit" />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="about-stats-strip">
        <div className="container about-stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <strong>{s.num}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="about-who">
        <div className="container about-split reverse">
          <div className="about-media">
            <img src={WHO_IMG} alt="Johnacart gift wrapping and packaging" />
          </div>
          <div className="about-copy">
            <p className="about-eyebrow teal">Our Business</p>
            <h2>Every gift is checked before it ships.</h2>
            <p>
              We focus on accurate product presentation, transparent INR pricing, straightforward
              checkout and responsive post-order support. Product descriptions, images, prices and stock
              status are reviewed as part of our catalogue and order-management process.
            </p>
            <p>
              Orders are processed by Johnacart, and dispatch details are confirmed before shipment — so
              what lands on your doorstep matches what you picked, occasion after occasion.
            </p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="about-offer">
        <div className="container">
          <div className="about-center-head">
            <p className="about-eyebrow teal">Gift Departments</p>
            <h2>Every Shelf Has An Occasion In Mind</h2>
            <p className="about-sub">
              From a quiet thank-you to a full festive celebration — six departments, curated so you can
              shop by moment, not just by category.
            </p>
          </div>
          <div className="about-offer-grid">
            {offers.map((item) => (
              <article key={item.title} className="about-offer-card">
                <div className="about-offer-icon" aria-hidden>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="about-process">
        <div className="container">
          <div className="about-center-head">
            <p className="about-eyebrow gold">How It Works</p>
            <h2>From Browsing To Their Doorstep</h2>
          </div>
          <div className="about-process-grid">
            {process.map((p) => (
              <article key={p.step} className="about-process-card">
                <span className="about-process-step">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="about-why">
        <div className="container">
          <div className="about-center-head">
            <p className="about-eyebrow teal">Why Johnacart</p>
            <h2>Why Choose Us?</h2>
          </div>
          <div className="about-why-grid">
            {reasons.map((r) => (
              <article key={r.num} className="about-why-item">
                <span className="about-why-num">{r.num}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="container about-mission-inner">
          <p className="about-eyebrow gold">Our Mission</p>
          <h2>Making Every Occasion A Little More Thoughtful.</h2>
          <p>
            Our mission is to make thoughtful gifting accessible to everyone in India — with a shopping
            experience built around clarity, trust and customer satisfaction, from discovery on Johnacart
            to delivery at your doorstep.
          </p>
        </div>
      </section>

      {/* Business info */}
      <section className="about-business">
        <div className="container about-business-inner">
          <p className="about-eyebrow teal">Business Information</p>
          <div className="about-business-grid">
            <div>
              <span>Legal business name</span>
              <strong>{COMPANY.name}</strong>
            </div>
            <div>
              <span>GST principal place of business</span>
              <strong>{COMPANY.address}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a>
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-bottom-cta">
        <div className="container">
          <div className="about-cta-banner">
            <h2>Find Their Next Favourite Gift</h2>
            <p>
              Explore the full catalogue and discover gifts that fit the person, the occasion, and the
              moment.
            </p>
            <Link href="/shop" className="btn about-cta-btn">
              Shop Now →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </StoreShell>
  );
}
