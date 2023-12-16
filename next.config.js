/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: [
            "localhost", 
            "127.0.0.1" , "*", 
            "https://result.st-joan.com", 
            "172.16.10.194",
            "172.16.10.247",
            "172.16.10.126"
        ]
    },
}

module.exports = nextConfig
