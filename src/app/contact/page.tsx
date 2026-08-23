"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";
import { COMPANY } from "@/lib/policies";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`jonacart contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSent(true);
    toast.success("Opening your email app…");
  }

  return (
    <StoreShell>
      <SiteHeader showSearch={false} />
      <section className="section contact-page">
        <div className="container contact-layout">
          <div className="contact-info">
            <div className="eyebrow">Support</div>
            <h2>We&apos;re happy to help — before or after your order.</h2>
            <p>
              Whether you&apos;re deciding between two hampers, tracking a delivery, or need to sort out a
              return, reach out and a real person from our team will get back to you.
            </p>
            <div className="contact-card">
              <strong>{COMPANY.name}</strong>
              <p>{COMPANY.address}</p>
              <p>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a>
              </p>
              <p>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </p>
              <p style={{ marginTop: 12, color: "var(--color-muted)", fontSize: 14 }}>
                Support hours: {COMPANY.supportHours}
              </p>
            </div>
            <p style={{ marginTop: 16, fontSize: 14, color: "var(--color-muted)" }}>
              For order-related queries, keep your Order ID handy — it helps us respond faster. For
              anything urgent, calling tends to get you a quicker answer than email.
            </p>
          </div>
          <div className="contact-form-wrap">
            <h3>Send a message</h3>
            {sent ? (
              <p className="contact-success">Your email app should open — send the message to complete contact.</p>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required placeholder="How can we help?" />
                </div>
                <button className="btn btn-accent" type="submit">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </StoreShell>
  );
}
