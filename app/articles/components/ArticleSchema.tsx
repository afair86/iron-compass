import Script from "next/script";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

type ArticleSchemaProps = {
  title: string;
  description: string;
  path: string;
};

export default function ArticleSchema({ title, description, path }: ArticleSchemaProps) {
  const url = absoluteUrl(path);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE,
      },
    },
    image: DEFAULT_OG_IMAGE,
  };

  return (
    <Script
      id={`article-schema-${path.replace(/\//g, "-")}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
