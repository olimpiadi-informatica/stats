import { getAllStaticImageSlugs, getImageBuffer } from "~/lib/image";

export async function generateStaticParams() {
  return await getAllStaticImageSlugs();
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const buffer = await getImageBuffer(slug);
  if (!buffer) {
    return new Response("Not found", { status: 404 });
  }

  const filename = slug[slug.length - 1];
  const isSvg = filename.endsWith(".svg");

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": isSvg ? "image/svg+xml" : "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
