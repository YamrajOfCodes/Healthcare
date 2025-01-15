import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add your config options here
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
};

export default nextConfig;




// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// module.exports = {
//   eslint:{
//     ignoreDuringBuilds:"true"
//   }
// }
