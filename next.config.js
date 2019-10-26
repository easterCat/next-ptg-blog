const fetch = require("isomorphic-unfetch");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withLess = require("@zeit/next-less");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
// const images = require("remark-images");
// const emoji = require("remark-emoji");

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

function HACK_removeMinimizeOptionFromCssLoaders(config) {
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === "css-loader" && u.options) {
          delete u.options.minimize;
        }
      });
    }
  });
}

// const withMDX = require("@zeit/next-mdx")({
//   options: {
//     mdPlugins: [images, emoji]
//   }
// });

module.exports = withBundleAnalyzer(
  withLess({
    useFileSystemPublicRoutes: false,
    poweredByHeader: false,
    lessLoaderOptions: {
      javascriptEnabled: true
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: "static",
        reportFilename: "../bundles/server.html"
      },
      browser: {
        analyzerMode: "static",
        reportFilename: "../bundles/client.html"
      }
    },
    // export html
    exportPathMap: async function() {
      const paths = {
        "/": { page: "/" },
        "/home": { page: "/home" },
        "/books": { page: "/books" },
        "/article": { page: "/article" },
        "/write": { page: "/write" },
        "/login": { page: "/login" },
        "/markdown": { page: "/markdown" },
        "/editor": { page: "/editor" }
      };
      return paths;
    },
    webpack(config) {
      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
        })
      );
      HACK_removeMinimizeOptionFromCssLoaders(config);
      return config;
    }
  })
);
