/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

// Abilita i binding Cloudflare (D1, secret) durante `next dev`,
// leggendo la configurazione da wrangler.toml e .dev.vars.
if (process.env.NODE_ENV === "development") {
  const { setupDevPlatform } = await import(
    "@cloudflare/next-on-pages/next-dev"
  );
  await setupDevPlatform();
}

export default nextConfig;
