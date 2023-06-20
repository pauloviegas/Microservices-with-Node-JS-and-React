module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
