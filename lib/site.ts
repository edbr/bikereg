import type { Metadata } from "next";

export const site = {
  name: "FrameProof",
  url: "https://bicireg.edbelluti.com",
  title: "FrameProof: Bicycle Ownership Registry | Eduardo Belluti",
  description:
    "Explore FrameProof, Eduardo Belluti’s bicycle ownership registry prototype combining product design, wallet-based registration, ownership transfers, and public verification.",
  writeupUrl: "https://eduardobelluti.com/blog/bikeReg",
};

export const person = {
  "@type": "Person",
  "@id": "https://eduardobelluti.com/#person",
  name: "Eduardo Belluti",
  url: "https://eduardobelluti.com/",
  sameAs: ["https://www.linkedin.com/in/edbelluti/", "https://github.com/edbr"],
};

export const socialImage = {
  url: "/opengraph-image", width: 1200, height: 630,
  alt: "FrameProof: bicycle ownership registry by Eduardo Belluti",
};

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: title }, description,
    alternates: { canonical: path },
    openGraph: {
      type: "website", siteName: site.name, locale: "en_US",
      title, description, url: path, images: [socialImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}
