"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreShell from "@/components/StoreShell";

type User = { id: number; name: string; email: string };
type Order = { id: number; total: number; status: string; createdAt: string; items: unknown[] };

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [info, setInfo] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [otpPending, setOtpPending] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");

  async function loadAccount() {
    const me = await fetch("/api/auth/me").then((r) => r.json());
    setUser(me.user);
    if (me.user) {
      const data = await fetch("/api/account/orders").then((r) => r.json());
      setOrders(Array.isArray(data) ? data : []);
    }
  }

  useEffect(() => {
    loadAccount();
  }, []);

  async function doLogin(e?: FormEvent) {
    e?.preventDefault();
    setLoginError("");
    setInfo("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (data.success && data.otpRequired) {
        setOtpEmail(data.email || loginEmail);
        setOtpValue("");
        setOtpPending(true);
        setInfo(`We've sent a 6-digit OTP to ${data.email || loginEmail}.`);
        toast.message("OTP sent to your email");
      } else if (data.success && data.user) {
        toast.success("Logged in successfully");
        await loadAccount();
      } else {
        const msg = data.error || "Login failed";
        setLoginError(msg);
        toast.error(msg);
      }
    } catch {
      setLoginError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function doSignup(e?: FormEvent) {
    e?.preventDefault();
    setSignupError("");
    setInfo("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setTab("login");
        setLoginEmail(signupEmail);
        setSignupPassword("");
        toast.success("Account created — please log in");
        setInfo("Account created. Please log in with your email and password.");
      } else {
        const msg = data.error || "Sign up failed";
        setSignupError(msg);
        toast.error(msg);
      }
    } catch {
      setSignupError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function doVerifyOtp(e: FormEvent) {
    e.preventDefault();
    setLoginError("");
    setInfo("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail, otp: otpValue }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        toast.success("Logged in successfully");
        setOtpPending(false);
        await loadAccount();
      } else {
        const msg = data.error || "OTP verification failed";
        setLoginError(msg);
        toast.error(msg);
      }
    } catch {
      setLoginError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function doResendOtp() {
    setLoginError("");
    setInfo("");
    setResending(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setInfo(`A new OTP has been sent to ${otpEmail}.`);
        toast.message("OTP resent");
      } else {
        const msg = data.error || "Could not resend OTP";
        setLoginError(msg);
        toast.error(msg);
      }
    } catch {
      setLoginError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setResending(false);
    }
  }

  async function doLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setOrders([]);
    toast.success("Logged out");
    await loadAccount();
  }

  if (user) {
    return (
      <StoreShell>
        <SiteHeader showSearch={false} />
        <div className="cart-page">
          <h2>My Account</h2>
          <div className="cart-summary" style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{user.name}</div>
            <div style={{ color: "var(--color-muted)", fontSize: 14 }}>{user.email}</div>
            <Link href="/profile" className="btn btn-outline" style={{ marginTop: 16, marginRight: 10, display: "inline-block" }}>
              View profile
            </Link>
            <button className="btn btn-outline" style={{ marginTop: 16, border: "1px solid var(--color-border)" }} onClick={doLogout}>
              Log out
            </button>
          </div>
          <h2 style={{ fontSize: 20 }}>My Orders</h2>
          {orders.length ? (
            orders.map((o) => (
              <div key={o.id} className="order-card">
                <div className="order-head">
                  <span>Order #{o.id}</span>
                  <span className={`status-tag ${o.status}`}>{o.status}</span>
                </div>
                <div style={{ color: "var(--color-muted)", fontSize: 13.5, marginBottom: 6 }}>
                  {new Date(o.createdAt).toLocaleDateString()} • {Array.isArray(o.items) ? o.items.length : 0} item(s)
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
        <SiteFooter />
      </StoreShell>
    );
  }

  return (
    <StoreShell>
      <SiteHeader showSearch={false} />
      <div className="account-page">
        <h2>My Account</h2>

        {otpPending ? (
          <>
            <h3 style={{ textAlign: "center", fontSize: 18, marginTop: 8 }}>Verify your email</h3>
            <p className="account-note">Enter the 6-digit OTP sent to {otpEmail}.</p>
            <form onSubmit={doVerifyOtp}>
              <div className="form-group">
                <label>OTP</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  className="otp-input"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="••••••"
                  required
                />
              </div>
              <button className="btn btn-accent" style={{ width: "100%" }} type="submit" disabled={loading || otpValue.length !== 6}>
                {loading ? "Verifying…" : "Verify & Login"}
              </button>
            </form>
            <div className="auth-modal-otp-actions" style={{ marginTop: 12 }}>
              <button type="button" className="auth-modal-link" onClick={doResendOtp} disabled={resending}>
                {resending ? "Resending…" : "Resend OTP"}
              </button>
              <button
                type="button"
                className="auth-modal-link"
                onClick={() => {
                  setOtpPending(false);
                  setOtpValue("");
                  setLoginError("");
                  setInfo("");
                }}
              >
                Back to login
              </button>
            </div>
            {info ? <p className="auth-modal-info">{info}</p> : null}
            {loginError ? <p className="account-error">{loginError}</p> : null}
          </>
        ) : (
          <>
            <div className="account-tabs">
              <button
                type="button"
                className={tab === "login" ? "active" : ""}
                onClick={() => {
                  setTab("login");
                  setLoginError("");
                  setSignupError("");
                }}
              >
                Log in
              </button>
              <button
                type="button"
                className={tab === "signup" ? "active" : ""}
                onClick={() => {
                  setTab("signup");
                  setLoginError("");
                  setSignupError("");
                }}
              >
                Sign up
              </button>
            </div>

            {tab === "login" ? (
              <form onSubmit={doLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Your password" required />
                </div>
                <button className="btn btn-accent" style={{ width: "100%" }} type="submit" disabled={loading}>
                  {loading ? "Please wait…" : "Log in"}
                </button>
                {info ? <p className="auth-modal-info">{info}</p> : null}
                {loginError ? <p className="account-error">{loginError}</p> : null}
              </form>
            ) : (
              <form onSubmit={doSignup}>
                <div className="form-group">
                  <label>Full name</label>
                  <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="At least 6 characters" required minLength={6} />
                </div>
                <button className="btn btn-accent" style={{ width: "100%" }} type="submit" disabled={loading}>
                  {loading ? "Please wait…" : "Create account"}
                </button>
                {signupError ? <p className="account-error">{signupError}</p> : null}
              </form>
            )}
          </>
        )}
      </div>
      <SiteFooter />
    </StoreShell>
  );
}
