import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const LOCAL_IMAGES: Record<string, string> = {
  "Personalised Gifts": "/images/categories/personalised.svg",
  "Festive Gifts": "/images/categories/festive.svg",
  "Gourmet Hampers": "/images/categories/hampers.svg",
  "Lifestyle Gifts": "/images/categories/lifestyle.svg",
  "Kids Gifts": "/images/categories/kids.svg",
};

function resolveImage(name: string, image: string | null) {
  const local = LOCAL_IMAGES[name];
  if (!image || image.includes("jonacart.com/wp-content") || image.includes("placehold.co")) {
    return local || "/images/placeholder.svg";
  }
  return image;
}

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });

  // Keep DB in sync with local assets when remote URLs are stale.
  await Promise.all(
    categories.map(async (c) => {
      const nextImage = resolveImage(c.name, c.image);
      if (c.image !== nextImage) {
        await prisma.category.update({ where: { id: c.id }, data: { image: nextImage } });
        c.image = nextImage;
      }
    }),
  );

  return NextResponse.json(categories);
}
