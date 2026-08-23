export const COMPANY = {
  name: "JOHNACART PRIVATE LIMITED",
  brand: "jonacart",
  address:
    "2nd Floor, Building/Flat No. 208, Rangila Park, Sudama Chowk, Mota Varachha, Surat, Gujarat – 394101",
  phone: "+91-8460681042",
  email: "hello@Johnacart.com",
  website: "https://jonacart.com",
  supportHours: "Monday–Saturday, 10:00 AM – 6:30 PM IST (closed on public holidays)",
};

export type PolicyContent = {
  title: string;
  intro: string;
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
};

export const policies: Record<string, PolicyContent> = {
  "return-policy": {
    title: "Return Policy",
    intro: `At ${COMPANY.brand}, a return should never feel like a fight. Here's exactly how it works.`,
    sections: [
      {
        heading: "1. You have 7 days",
        body: "From the date your order is marked delivered, you have 7 calendar days to request a return. This window is checked against the courier's delivery record. If a product arrives defective or we sent the wrong item, we're flexible beyond this window — just reach out.",
      },
      {
        heading: "2. What makes a product eligible",
        body: "To qualify for return, the item needs to still be in the condition it arrived in:",
        bullets: [
          "Unused, unworn, unwashed — no signs it's been taken out for a spin.",
          "All original tags, labels, dust bags and brand packaging still attached.",
          "No scratches, stains, or alterations of any kind.",
          "Your order number or invoice available, along with photos if we ask for them.",
          "The item itself matches what's on your order (correct SKU).",
        ],
      },
      {
        heading: "3. What we can't take back",
        body: 'A few categories stay outside our return process for hygiene, safety or commercial reasons — mainly personalised or made-to-order items, anything marked "final sale" at checkout, products missing their original packaging or accessories, and gift cards or freebies bundled with an order. The one exception: if any of these arrive damaged or wrong, we\'ll still make it right.',
      },
      {
        heading: "4. Starting a return",
        body: `Email ${COMPANY.email} or call ${COMPANY.phone} with your order number, the product name, why you're returning it, and a couple of photos. We aim to respond within 1–2 business days with next steps — either a reverse pickup or self-ship instructions, depending on your location.`,
      },
      {
        heading: "5. What happens after we get it back",
        body: "Once the product reaches our warehouse, our team inspects it before approving anything. If it clears inspection, we move it into our Refund Policy process. If it doesn't (used, tags removed, packaging missing), we'll let you know and may need to ship it back to you at your own cost.",
      },
      {
        heading: "6. Damaged, defective or wrong item?",
        body: "This is the one case we treat differently. Contact us within 48 hours of delivery with unboxing photos or a short video, and we'll sort a replacement or a return-and-refund — at no shipping cost to you once we've verified the issue.",
      },
      {
        heading: "7. Company details",
        body: `Returns are handled by ${COMPANY.name}. Any dispute relating to a return falls under Indian law, with courts at Surat, Gujarat having jurisdiction.`,
      },
    ],
  },

  "refund-policy": {
    title: "Refund Policy",
    intro: "Once a refund is approved, here's exactly where your money goes and how long it takes.",
    sections: [
      {
        heading: "If you paid online (Razorpay — UPI / Card / Netbanking)",
        body: "The amount goes back to whichever payment method you originally used. From the point we approve the refund, banks and UPI apps typically take 5–7 business days to complete the credit. That last stretch is genuinely out of our hands — it depends on your bank's own processing speed.",
      },
      {
        heading: "If you paid Cash on Delivery",
        body: "There's nothing to reverse on our end since no payment was collected upfront. Instead, once your COD return is approved, we'll ask you to share a bank account or UPI ID by email, and transfer the refund directly — usually within 7–10 business days of approval.",
      },
      {
        heading: "What actually qualifies for a refund",
        body: "Refunds apply when:",
        bullets: [
          "A return you sent us has been received and passed inspection.",
          "You cancelled before the order was dispatched, and the payment had already gone through.",
          "Money was deducted but the order itself never got confirmed.",
          "We failed to deliver due to something on our end (verified case by case).",
        ],
      },
      {
        heading: "What's included, what's not",
        body: "The product price — after any coupon already applied — is what comes back to you. Shipping charges are non-refundable, unless the return happened because of our mistake (wrong item shipped) or a genuine manufacturing defect.",
      },
      {
        heading: "Ordered multiple items, returning only some?",
        body: "We'll refund exactly what's been returned and approved — not the full order value. If a coupon applied a discount across the whole cart, that discount gets recalculated proportionally on the returned item(s).",
      },
      {
        heading: "Charged twice by mistake?",
        body: `It happens occasionally with payment gateways. Send us your payment screenshots and order ID at ${COMPANY.email}, and once we verify it with our payment partner, the duplicate amount goes back to your original payment method.`,
      },
      {
        heading: "Updates & support",
        body: `You'll get refund status updates on your registered email throughout the process. For anything unclear, ${COMPANY.email} or ${COMPANY.phone} gets you a real answer — we're operated by ${COMPANY.name}.`,
      },
    ],
  },

  "cancellation-policy": {
    title: "Cancellation Policy",
    intro: "Plans change — here's how cancelling an order actually works on our end.",
    sections: [
      {
        heading: "Before your order ships",
        body: `This is the easiest case. Email ${COMPANY.email} or call ${COMPANY.phone} with your order ID and a quick reason. As long as our warehouse hasn't handed the parcel to the courier yet, we'll cancel it right away.`,
      },
      {
        heading: "If you paid online",
        body: "Once we confirm the cancellation went through before dispatch, the full amount you paid — including shipping if it was charged — gets refunded per our Refund Policy.",
      },
      {
        heading: "If you chose Cash on Delivery",
        body: "Nothing to refund here since no money changed hands. We simply close the order in our system. One note: repeatedly cancelling COD orders at the last minute can lead to COD being restricted on your account going forward — it's the one thing that genuinely disrupts our fulfilment partners.",
      },
      {
        heading: "Once it's already on its way",
        body: "Cancellation through the website stops being an option the moment your order ships. From here you have two paths:",
        bullets: [
          "Refuse the delivery at your doorstep if the courier allows it (it'll come back to us and go through our standard return inspection).",
          "Accept the parcel and raise a return request within our usual return window instead.",
        ],
      },
      {
        heading: "When we might cancel your order",
        body: "Occasionally we have to cancel from our end — the product went out of stock faster than expected, there was a pricing or listing error, payment came through incomplete or looked fraudulent, or we simply can't deliver to your pin code. In every one of these cases, any amount you paid is refunded in full.",
      },
      {
        heading: "Checking where your order stands",
        body: "Log into your account and check the Profile / Orders section for real-time status. If you need to cancel urgently, act fast — the window narrows quickly once packing begins.",
      },
    ],
  },

  "shipping-delivery-policy": {
    title: "Shipping & Delivery Policy",
    intro: "How your order gets from our warehouse to your doorstep.",
    sections: [
      {
        heading: "Where we deliver",
        body: "Pretty much anywhere in India, through courier and logistics partners we trust. A handful of remote or restricted pin codes may see longer timelines or limited COD availability — you'll see this reflected at checkout if it applies to your address.",
      },
      {
        heading: "Getting your order ready",
        body: "Once confirmed, orders usually leave our warehouse within 1–3 business days (Sundays and public holidays excluded). During big sale periods this can stretch slightly — we'll keep you posted by email or SMS as things move.",
      },
      {
        heading: "How long delivery takes",
        body: "After dispatch, expect 3–7 business days for metro and Tier-1 cities, and up to 7–10 business days for more remote areas. These are our honest estimates based on courier averages, not guaranteed dates — logistics can occasionally throw a delay our way.",
      },
      {
        heading: "What you pay for shipping",
        body: "Any shipping charge is shown clearly at checkout, before you confirm the order — never added afterward. If there's a free-shipping offer live at the time, it'll reflect there too.",
      },
      {
        heading: "How we pack things",
        body: "Fragile items — glass bottles, pump packaging, delicate décor pieces — get extra protection so they survive transit. It's worth a quick look at the outer box when it arrives; if something looks visibly damaged, flag it with the courier before you sign off, if you can.",
      },
      {
        heading: "If a delivery attempt fails",
        body: "Couriers typically try more than once. If they still can't reach you — wrong address, unreachable number, nobody available — the parcel heads back to our warehouse, and re-shipping it may come with an extra charge.",
      },
      {
        heading: "Something arrived broken or missing?",
        body: `Email us within 48 hours with photos of both the box and the product. We'll take it up directly with the courier partner and sort a resolution from there.`,
      },
      {
        heading: "Reach us",
        body: `${COMPANY.name}, ${COMPANY.address} | ${COMPANY.phone} | ${COMPANY.email}`,
      },
    ],
  },

  "privacy-policy": {
    title: "Privacy Policy",
    intro: `This explains, in plain language, what happens to your data when you shop with ${COMPANY.brand}.`,
    sections: [
      {
        heading: "Information we collect",
        body: "We may collect:",
        bullets: [
          "Your name, email, phone number, and shipping/billing address.",
          "Login details for your account (your password is never stored in plain text) and your order history.",
          "What you bought, how much you paid, and whether it was COD or online.",
          "Basic technical data — browser, device, IP address — plus the cookies needed to keep the site running.",
          "Anything you send us through contact forms, email or phone.",
        ],
      },
      {
        heading: "Why we collect it",
        body: "Mainly to get your order to you — confirming, packing, shipping, and keeping you updated along the way. We also use it to run your account securely, respond to support queries, improve how the site works, and meet our tax, accounting and fraud-prevention obligations under Indian law.",
      },
      {
        heading: "Your consent",
        body: "Creating an account, placing an order, or filling a contact form counts as consent to process your data for the reasons above. If you'd rather not receive marketing emails, tell us and we'll stop — order-related emails will still come through, since we need those to actually deliver your gift.",
      },
      {
        heading: "Who sees your data",
        body: "We don't sell it — full stop. Limited data gets shared only where it's operationally necessary: with courier partners so your parcel reaches you, with Razorpay to process online payments securely, with our hosting/IT providers to keep the website running, and with authorities if the law requires it.",
      },
      {
        heading: "Cookies",
        body: "We run essential cookies to keep you logged in and your cart intact between visits, plus some basic analytics to understand how people use the site. You can switch cookies off in your browser, though login and checkout may stop working properly if you do.",
      },
      {
        heading: "Keeping your data safe",
        body: "Passwords are hashed, sessions are encrypted, and we hold onto order/account records only as long as business, legal or tax requirements need us to — after that, we delete or anonymise them where practical.",
      },
      {
        heading: "What you can ask us",
        body: `Write to ${COMPANY.email} if you want to see, correct, or delete your personal data. We may ask for identity verification first, just to be sure it's really you.`,
      },
      {
        heading: "About age",
        body: `${COMPANY.brand} is meant for shoppers aged 18 and above. We don't knowingly collect data from anyone younger — if you think a minor's data has ended up with us, let us know and we'll remove it.`,
      },
      {
        heading: "Questions or concerns",
        body: `${COMPANY.email} | ${COMPANY.phone} | ${COMPANY.name}, Surat, Gujarat.`,
      },
    ],
  },

  "terms-of-use": {
    title: "Terms of Use",
    intro: `By using jonacart.com, you're agreeing to the terms below. If something here doesn't sit right with you, please don't use the site.`,
    sections: [
      {
        heading: "Who runs this site",
        body: `${COMPANY.brand} is operated by ${COMPANY.name}, registered at ${COMPANY.address}. Reach us at ${COMPANY.email} or ${COMPANY.phone}.`,
      },
      {
        heading: "Who can shop here",
        body: "You need to be 18 or older and legally able to enter a contract under Indian law. When you place an order, you're confirming the details you've given us are accurate.",
      },
      {
        heading: "About our product listings",
        body: "We work hard to keep titles, descriptions, images and ₹ pricing accurate, but small differences in colour or finish can happen due to screens or manufacturing batches — that's normal, not a defect. Prices can change without notice, and if we spot an obvious pricing error, we reserve the right to cancel that order and refund whatever was paid.",
      },
      {
        heading: "How an order actually gets accepted",
        body: "Placing an order is you making us an offer to buy — it isn't automatically accepted just because you got a confirmation email. We consider an order accepted once we confirm it's being fulfilled and dispatched. We may still cancel or decline orders for stock issues, suspected fraud, or delivery-area limitations.",
      },
      {
        heading: "Paying for your order",
        body: "You can pay via Cash on Delivery (where it's available) or online through UPI, cards or netbanking, processed by our third-party payment partners. We never store your full card details ourselves.",
      },
      {
        heading: "Your account, your responsibility",
        body: "Keep your login details to yourself, and let us know immediately if you notice anything unusual on your account. We can suspend accounts that break these Terms — including people who make a habit of refusing COD orders without reason.",
      },
      {
        heading: "Who owns what's on this site",
        body: "Every logo, product photo, description and design element on jonacart.com belongs to us or is licensed to us. Copying, scraping or reusing it commercially without our written go-ahead isn't allowed.",
      },
      {
        heading: "Using the site fairly",
        body: "Don't try to break into parts of the site you shouldn't access, interfere with how it runs, post anything unlawful, or attempt fraudulent transactions. Simple as that.",
      },
      {
        heading: "Where our liability ends",
        body: "If something goes wrong with a product or the site itself, our liability is capped at whatever you paid for that specific order. We're not on the hook for indirect losses — including courier delays that are genuinely outside our control.",
      },
      {
        heading: "Other policies that apply too",
        body: "Your purchase is also covered by our Return, Refund, Cancellation, Shipping & Delivery and Privacy policies — all published on this site, and all part of these Terms by reference.",
      },
      {
        heading: "Which laws apply",
        body: "Indian law governs these Terms, and courts at Surat, Gujarat hold jurisdiction — without taking away any rights you have under consumer protection law.",
      },
      {
        heading: "These Terms can change",
        body: 'We may update this page from time to time. Using the site after an update means you\'re accepting the new version — check the "Last updated" date for the latest revision.',
      },
    ],
  },
};
