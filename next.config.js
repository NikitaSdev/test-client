const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:5000/api/:path*`
      },
      {
        source: "/uploads/:path*",
        destination: `http://localhost:5000/uploads/:path*`
      }
    ]
  }
}

module.exports = nextConfig
