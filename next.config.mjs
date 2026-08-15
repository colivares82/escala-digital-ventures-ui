/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Cloud Run containerized deployment (SPEC-P6 AC-1)
  output: 'standalone',

  /**
   * Canonical host redirect: apex → www (R-7.9, SEO-01 §7.4).
   *
   * Cloud Run domain mappings only *serve* — they do not redirect. Both
   * escaladigitalventures.com and www.escaladigitalventures.com map to the same
   * escala-web-prod service, so without this the identical content would be
   * reachable on two hosts (duplicate content, split link equity).
   *
   * Assumption: the `host` header is the public hostname. Cloud Run preserves the
   * mapped domain in Host, so matching on the bare apex is safe. The dev service
   * (*.run.app) never matches, so dev is unaffected.
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'escaladigitalventures.com' }],
        destination: 'https://www.escaladigitalventures.com/:path*',
        permanent: true,
      },
    ]
  },

  async headers() {
    // SPEC-P6 D-09: dev service sets NEXT_PUBLIC_NOINDEX=true via Cloud Run env var
    // to prevent search engine indexing of the dev environment.
    const noindex = process.env.NEXT_PUBLIC_NOINDEX === 'true'

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Noindex header for dev environment (no-op in prod where env var is unset)
          ...(noindex
            ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
            : []),
        ],
      },
    ]
  },
}

export default nextConfig
