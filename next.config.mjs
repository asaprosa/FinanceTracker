/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      POSTGRE_URL: process.env.POSTGRE_URL, // Add this line to ensure the environment variable is available
    },
  };
  
  export default nextConfig;
  