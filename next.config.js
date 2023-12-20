/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: [
            "localhost", 
            "127.0.0.1" , "*", 
            "result.st-joan.com", 
            "st-joan.com", 
            "172.16.10.194",
            "172.16.10.247",
            "172.16.10.126",
            "1192.168.130.177"
        ]
    },
}

module.exports = nextConfig
