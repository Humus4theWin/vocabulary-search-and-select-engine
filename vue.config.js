const WorkerPlugin = require("worker-plugin");
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/vocabulary-search-and-select-engine/"
      : "/",
  configureWebpack: {
    output: {
      globalObject: "this",
    },
    plugins: [new WorkerPlugin()],
  },
  parallel: false,
  chainWebpack: (config) => {
    config.module
      .rule("worker")
      .test(/\.worker\.js$/)
      .use("worker-loader")
      .loader("worker-loader")
      .end();
  },
};
