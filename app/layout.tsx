import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AppProviders } from "@/components/providers/app-providers";

import { person, site, socialImage } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | FrameProof" },
  description: site.description,
  authors: [{ name: person.name, url: person.url }],
  creator: person.name,
  openGraph: {
    type: "website", siteName: site.name, locale: "en_US",
    title: site.title, description: site.description, images: [socialImage],
  },
  twitter: {
    card: "summary_large_image", title: site.title,
    description: site.description, images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              person,
              {
                "@type": "WebSite", "@id": `${site.url}/#website`,
                name: site.name, url: `${site.url}/`, description: site.description,
                creator: { "@id": person["@id"] },
              },
              {
                "@type": "WebApplication", "@id": `${site.url}/#application`,
                name: site.name, url: `${site.url}/`, description: site.description,
                applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
                creator: { "@id": person["@id"] },
                subjectOf: { "@type": "Article", url: site.writeupUrl, author: { "@id": person["@id"] } },
              },
            ],
          }).replace(/</g, "\\u003c"),
        }} />
        <AppProviders>
          <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
