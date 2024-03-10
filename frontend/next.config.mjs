/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:8000/api/v1/:path*",
            },
        ];
    },
    images: {
        domains: ["localhost", "res.cloudinary.com", "c.saavncdn.com"],
    },
};

export default nextConfig;
