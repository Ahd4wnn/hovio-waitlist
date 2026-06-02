import { Helmet } from 'react-helmet-async'

const DEFAULT = {
  title: 'Hovio — Therapy that learns, matches, and shows up.',
  description:
    'Hovio connects you with certified therapists chosen by AI, and provides 24/7 support whenever you need it. Private, personalised, always available.',
  url: 'https://hovio.com',
  image: 'https://hovio.com/og-image.png',
  twitterHandle: '@hovioapp',
}

export default function SEO({
  title,
  description,
  url,
  image,
  type = 'website',
  article = null,
}) {
  const t = title ? `${title} — Hovio` : DEFAULT.title
  const d = description || DEFAULT.description
  const u = url || DEFAULT.url
  const img = image || DEFAULT.image

  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: d,
        url: u,
        datePublished: article.date,
        publisher: {
          '@type': 'Organization',
          name: 'Hovio',
          url: DEFAULT.url,
          logo: {
            '@type': 'ImageObject',
            url: 'https://hovio.com/logo.jpg',
          },
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Hovio',
        url: DEFAULT.url,
        description: DEFAULT.description,
        logo: 'https://hovio.com/logo.jpg',
        sameAs: [
          'https://twitter.com/hovioapp',
          'https://instagram.com/hovioapp',
        ],
      }

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <link rel="canonical" href={u} />

      {/* Open Graph */}
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={u} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hovio" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULT.twitterHandle} />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={img} />

      {/* Article meta */}
      {article && (
        <meta property="article:published_time" content={article.date} />
      )}

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  )
}
