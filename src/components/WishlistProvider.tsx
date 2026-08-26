"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type WishlistContextValue = {
  wishlistIds: number[];
  wishlistCount: number;
  isWishlisted: (id: number) => boolean;
  toggleWishlist: (id: number) => Promise<void>;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const refresh = useCallback(async () => {
    const me = await fetch("/api/auth/me")
      .then((r) => r.json())
      .catch(() => ({ user: null }));
    setLoggedIn(!!me.user);
    if (!me.user) {
      setWishlistIds([]);
      return;
    }
    const data = await fetch("/api/wishlist", { credentials: "include" })
      .then((r) => r.json())
      .catch(() => ({ items: [] }));
    setWishlistIds((data.items || []).map((p: { id: number }) => p.id));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo<WishlistContextValue>(() => {
    const isWishlisted = (id: number) => wishlistIds.includes(id);

    const toggleWishlist = async (id: number) => {
      if (!loggedIn) {
        toast.error("Login to save gifts to your wishlist", {
          action: { label: "Login", onClick: () => router.push("/account") },
        });
        return;
      }
      const already = wishlistIds.includes(id);
      setWishlistIds((prev) => (already ? prev.filter((x) => x !== id) : [...prev, id]));
      try {
        if (already) {
          await fetch(`/api/wishlist?productId=${id}`, { method: "DELETE", credentials: "include" });
          toast.success("Removed from wishlist");
        } else {
          await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId: id }),
          });
          toast.success("Saved to wishlist");
        }
      } catch {
        setWishlistIds((prev) => (already ? [...prev, id] : prev.filter((x) => x !== id)));
        toast.error("Something went wrong");
      }
    };

    return { wishlistIds, wishlistCount: wishlistIds.length, isWishlisted, toggleWishlist };
  }, [wishlistIds, loggedIn, router]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
