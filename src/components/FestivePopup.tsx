"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Banner = {
  active: boolean;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
};

export default function FestivePopup() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/banner")
      .then((r) => r.json())
      .then((b: Banner) => {
        if (!b.active) return;
        const dismissedOn = localStorage.getItem("jonacart_popup_dismissed");
        const today = new Date().toDateString();
        if (dismissedOn === today) return;
        setBanner(b);
        setOpen(true);
      });
  }, []);

  if (!open || !banner) return null;

  function dismiss() {
    setOpen(false);
    localStorage.setItem("jonacart_popup_dismissed", new Date().toDateString());
  }

  return (
    <div className="gift-popup-overlay" role="dialog" aria-modal="true" aria-label={banner.title}>
      <div className="gift-popup">
        <button type="button" className="gift-popup-close" onClick={dismiss} aria-label="Close">
          ×
        </button>
        {banner.image ? (
          <div className="gift-popup-badge">
            <img src={banner.image} alt="" />
          </div>
        ) : null}
        <p className="gift-popup-kicker">A little something for you</p>
        <h3>{banner.title}</h3>
        <p className="gift-popup-subtitle">{banner.subtitle}</p>
        <Link href={banner.buttonLink.replace("/shop.html", "/shop")} className="btn btn-accent" onClick={dismiss}>
          {banner.buttonText}
        </Link>
      </div>
    </div>
  );
}
