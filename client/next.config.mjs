/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "localhost",
            "res.cloudinary.com",
            "c.saavncdn.com",
            "www.jiosaavn.com",
        ],
    },
    output: "standalone",
};

export default nextConfig;
