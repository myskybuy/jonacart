import type { Metadata } from "next";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "jonacart — Occasion-Ready Gifts For India",
  description:
    "A modern Indian gifting store — personalised gifts, festive gifts, gourmet hampers, lifestyle and kids gifts, with INR pricing and Cash on Delivery.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        <CartProvider>
          {children}
          <Toaster richColors position="top-center" closeButton />
        </CartProvider>
      </body>
    </html>
  );
}
