import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: [
            'user-images.githubusercontent.com',
            'avatars.githubusercontent.com',
            "repository-images.githubusercontent.com",
            'github.com'
        ]
    }
};

export default nextConfig;
