/** @type {import('next').NextConfig} */

const path = require("path");
module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    //config.resolve.alias["~"] = path.join(__dirname, "src");
    //config.resolve.alias["~/api"] = path.join(__dirname, "src/api");
    if (!options.isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.readline = false;
      config.resolve.fallback.events = false;
    }
    return config;
  },
};
