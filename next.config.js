/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional: Disable image optimization if you are using the next/image component, 
  // as static exports do not support server-side image optimization.
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
