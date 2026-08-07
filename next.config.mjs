/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Cloud Run containerized deployment (SPEC-P6 AC-1)
  output: 'standalone',

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
