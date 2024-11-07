/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
      },
      env: { API_URL: "https://quantical.vercel.app"} 
};

export default nextConfig;


