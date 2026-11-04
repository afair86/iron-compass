import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  ORGANIZATION_LOGO,
  SITE_NAME,
  SITE_URL,
  serializeJsonLd,
} from "@/lib/site";

type ArticleSchemaProps = {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
};

export default function ArticleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: ArticleSchemaProps) {
  const url = absoluteUrl(path);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified: dateModified ?? datePublished } : {}),
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
        url: ORGANIZATION_LOGO,
      },
    },
    image: image ? absoluteUrl(image) : DEFAULT_OG_IMAGE,
  };

  return (
    <script
      id={`article-schema-${path.replace(/\//g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
