import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";
import { COMPANY } from "@/lib/policies";

const HERO_IMG = "/images/about/hero.svg";
const WHO_IMG = "/images/about/who.svg";

const stats = [
  { num: "80+", label: "curated gifting picks" },
  { num: "6", label: "gift departments" },
  { num: "COD", label: "available pan-India" },
  { num: "₹", label: "transparent INR pricing" },
];

const offers = [
  {
    title: "Personalised Gifts",
    text: "Photo frames, name-led keepsakes and puzzle boxes built around a memory, not just a product.",
    icon: "🎁",
  },
  {
    title: "Festive Gifts",
    text: "Rakhi sets, lumba bracelets and seasonal picks timed for the celebrations that matter to Indian families.",
    icon: "🪔",
  },
  {
    title: "Gourmet Hampers",
    text: "Chocolates, snacks and curated food boxes packed specifically for gifting, not grocery shopping.",
    icon: "🍫",
  },
  {
    title: "Home Décor",
    text: "Pieces that add warmth to a space and double up beautifully as housewarming or festive gifts.",
    icon: "🏠",
  },
  {
    title: "Kids' Gifts",
    text: "Bright, playful items for birthdays, school events and festive moments.",
    icon: "🧸",
  },
];

const process = [
  {
    step: "01",
    title: "Browse by occasion",
    text: "You browse by occasion or category, add what fits, and see the final rupee price before you ever reach checkout — no last-step surprises.",
  },
  {
    step: "02",
    title: "Pay your way",
    text: "At payment, choose Cash on Delivery if you'd rather pay when the gift lands at the door, or complete a secure online payment if you prefer to finish in one go.",
  },
  {
    step: "03",
    title: "We confirm before shipping",
    text: "Once your order is confirmed, we check stock and dispatch details before anything ships, so you're not left guessing.",
  },
  {
    step: "04",
    title: "Real support when needed",
    text: "When something needs sorting out — a delayed order, a cancellation, a return — our support team is one email or phone call away, not buried behind a chatbot.",
  },
];

const reasons = [
  {
    num: "01",
    title: "Honest listings",
    text: "The photos you see are reviewed against the actual product before they go live, so there's no gap between expectation and delivery.",
  },
  {
    num: "02",
    title: "Transparent pricing",
    text: "Pricing stays transparent in ₹ at every stage.",
  },
  {
    num: "03",
    title: "Thoughtful curation",
    text: "Every product is chosen because it photographs honestly, ships well, and genuinely works as a gift — not just as an item in a cart.",
  },
  {
    num: "04",
    title: "Human support",
    text: "Reach us by email or phone during support hours — a real person from our team will get back to you.",
  },
];

export default function AboutPage() {
  return (
    <StoreShell>
      <SiteHeader />

      <section className="about-hero">
        <div className="container about-split">
          <div className="about-copy">
            <p className="about-eyebrow gold">About jonacart</p>
            <h1>Every gift tells a story. We just help you tell it well.</h1>
            <p className="about-lead">
              jonacart started with a simple frustration: gifting online in India usually means scrolling
              through generic catalogues that feel exactly the same whether you&apos;re shopping for a
              birthday, a rakhi, or a wedding. We wanted something different — a place where the products
              themselves do the talking, where personalisation isn&apos;t a gimmick, and where the person
              receiving the gift can actually feel the thought behind it.
            </p>
            <Link href="/shop" className="btn btn-accent about-cta">
              Explore Our Collection →
            </Link>
          </div>
          <div className="about-media">
            <img src={HERO_IMG} alt="jonacart gifting edit" />
          </div>
        </div>
      </section>

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

      <section className="about-who">
        <div className="container about-split reverse">
          <div className="about-media">
            <img src={WHO_IMG} alt="jonacart gift wrapping and packaging" />
          </div>
          <div className="about-copy">
            <p className="about-eyebrow teal">Who we are</p>
            <h2>A curated mix built for real gifting moments.</h2>
            <p>
              Today, jonacart is home to a curated mix of personalised keepsakes, festive essentials,
              gourmet hampers, home décor pieces, kids&apos; gifting and everyday lifestyle finds. We
              don&apos;t try to sell everything to everyone.
            </p>
            <p>
              jonacart is built and operated by <strong>{COMPANY.name}</strong>, based in Surat, Gujarat.
              We&apos;re a small, growing team that genuinely enjoys the gifting business, and we&apos;d
              love for you to find something here worth giving.
            </p>
          </div>
        </div>
      </section>

      <section className="about-offer">
        <div className="container">
          <div className="about-center-head">
            <p className="about-eyebrow teal">What you&apos;ll find here</p>
            <h2>Every shelf has an occasion in mind</h2>
            <p className="about-sub">
              From a quiet thank-you to a full festive celebration — departments curated so you can shop
              by moment, not just by category.
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

      <section className="about-process">
        <div className="container">
          <div className="about-center-head">
            <p className="about-eyebrow gold">How shopping with us works</p>
            <h2>From browsing to their doorstep</h2>
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

      <section className="about-why">
        <div className="container">
          <div className="about-center-head">
            <p className="about-eyebrow teal">Why people come back</p>
            <h2>Why choose us?</h2>
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

      <section className="about-mission">
        <div className="container about-mission-inner">
          <p className="about-eyebrow gold">Our promise</p>
          <h2>Making every occasion a little more thoughtful.</h2>
          <p>
            Our mission is to make thoughtful gifting accessible to everyone in India — with a shopping
            experience built around clarity, trust and customer satisfaction, from discovery on jonacart
            to delivery at your doorstep.
          </p>
        </div>
      </section>

      <section className="about-business">
        <div className="container about-business-inner">
          <p className="about-eyebrow teal">Business Information</p>
          <div className="about-business-grid">
            <div>
              <span>Legal business name</span>
              <strong>{COMPANY.name}</strong>
            </div>
            <div>
              <span>Registered office</span>
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
            <div>
              <span>Support hours</span>
              <strong>{COMPANY.supportHours}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="about-bottom-cta">
        <div className="container">
          <div className="about-cta-banner">
            <h2>Find their next favourite gift</h2>
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
