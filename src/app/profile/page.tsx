"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";

type User = { id: number; name: string; email: string; phone?: string; address?: string };
type Order = { id: number; total: number; status: string; createdAt: string; items: unknown[]; paymentMethod?: string };

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<"details" | "orders" | "security">("details");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then(async (d) => {
        if (!d.user) {
          router.replace("/account");
          return;
        }
        setUser(d.user);
        setName(d.user.name || "");
        setPhone(d.user.phone || "");
        setAddress(d.user.address || "");
        const orderRes = await fetch("/api/account/orders");
        const orderData = await orderRes.json();
        setOrders(Array.isArray(orderData) ? orderData : []);
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/account");
  }

  async function saveProfile(e: FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not save profile");
        return;
      }
      setUser(data.user);
      toast.success("Profile updated");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(e: FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not update password");
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSavingPassword(false);
    }
  }

  if (loading) {
    return (
      <StoreShell>
        <SiteHeader showSearch={false} />
        <div className="cart-page">
          <p>Loading…</p>
        </div>
        <SiteFooter />
      </StoreShell>
    );
  }

  if (!user) return null;

  return (
    <StoreShell>
      <SiteHeader showSearch={false} />
      <div className="cart-page profile-page">
        <div className="profile-card">
          <div className="profile-avatar" aria-hidden>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-card-meta">
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
          </div>
          <button type="button" className="btn btn-outline" onClick={logout}>
            Log out
          </button>
        </div>

        <div className="profile-tabs">
          <button type="button" className={section === "details" ? "active" : ""} onClick={() => setSection("details")}>
            Details
          </button>
          <button type="button" className={section === "orders" ? "active" : ""} onClick={() => setSection("orders")}>
            Orders
          </button>
          <button type="button" className={section === "security" ? "active" : ""} onClick={() => setSection("security")}>
            Security
          </button>
        </div>

        {section === "details" ? (
          <form className="profile-panel" onSubmit={saveProfile}>
            <h3 className="profile-section-title">Account details</h3>
            <div className="form-group">
              <label>Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input value={user.email} disabled readOnly />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                inputMode="tel"
              />
            </div>
            <div className="form-group">
              <label>Default address</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} placeholder="Shipping address" />
            </div>
            <button className="btn btn-accent" type="submit" disabled={savingProfile}>
              {savingProfile ? "Saving…" : "Save details"}
            </button>
          </form>
        ) : null}

        {section === "orders" ? (
          <div className="profile-panel">
            <h3 className="profile-section-title">Your orders</h3>
            {orders.length ? (
              orders.map((o) => (
                <div key={o.id} className="order-card">
                  <div className="order-head">
                    <span>Order #{o.id}</span>
                    <span className={`status-tag ${o.status}`}>{o.status}</span>
                  </div>
                  <div style={{ color: "var(--color-muted)", fontSize: 13.5, marginBottom: 6 }}>
                    {new Date(o.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {Array.isArray(o.items) ? o.items.length : 0} item(s)
                    {o.paymentMethod ? ` · ${o.paymentMethod}` : ""}
                  </div>
                  <div style={{ fontWeight: 700 }}>₹{o.total}</div>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--color-muted)" }}>
                No orders yet. <Link href="/shop">Start shopping →</Link>
              </p>
            )}
          </div>
        ) : null}

        {section === "security" ? (
          <form className="profile-panel" onSubmit={changePassword}>
            <h3 className="profile-section-title">Change password</h3>
            <div className="form-group">
              <label>Current password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label>New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
              />
            </div>
            <div className="form-group">
              <label>Confirm new password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button className="btn btn-accent" type="submit" disabled={savingPassword}>
              {savingPassword ? "Updating…" : "Update password"}
            </button>
          </form>
        ) : null}
      </div>
      <SiteFooter />
    </StoreShell>
  );
}
