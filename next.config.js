module.exports = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/products',
  //       permanent: true,
  //     },
  //   ]
  // },
  experimental: {
    serverActions: true,
  },
  env: {
    STRIPE_SECRET_KEY: 'sk_test_51L8mF5KlTsQ2xJIMG2A1H1QiPWmO4eYuU9iwX0pq1BQ5NFKgvfv1uZ7IEC0HouMPwHaeYF8GG8SYSftXcYj5XOJp00Dolh2Ta8',
    STRIPE_PUBLISHABLE_KEY: 'pk_test_51L8mF5KlTsQ2xJIM2FjrKa6Gfg6niIascDVp6nC0ssynIkmK5YY1azqVDZsWuTVBbhxZlyRxqim9t0JilmXA139500IFeIwlGJ'
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}