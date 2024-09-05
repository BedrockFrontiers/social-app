/** @type {import("next").NextConfig} */
import nextComposePlugins from "next-compose-plugins";
import svgr from "@svgr/webpack";

const { withPlugins } = nextComposePlugins;

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
	images: {
		remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ],
    unoptimized: true
	}
};

export default withPlugins([], nextConfig);