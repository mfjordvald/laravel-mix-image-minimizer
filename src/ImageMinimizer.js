const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const Config = require("./Config.js");

class ImageMinimizer {
  name() {
    return ["images"];
  }

  dependencies() {
    return ["image-minimizer-webpack-plugin"];
  }

  register(options = {}) {
    this.config = new Config;
    this.implementation = options.implementation || this.config.defaultImplementation();
    this.patterns = options.patterns || this.config.defaultPatterns();
    this.copyOptions = Object.assign(
      { patterns: this.patterns },
      options.copyOptions || this.config.defaultCopyOptions()
    );
    this.webp = options.webp || this.config.defaultWebp();
    this.webpOptions = options.webpOptions || this.config.defaultWebpOptions(this.implementation)
    this.options = options.options || this.config.defaultOptions(this.implementation);
  }

  webpackConfig(webpackConfig) {
    webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer || [];
    webpackConfig.optimization.minimizer.push(
      new ImageMinimizerPlugin({
        deleteOriginalAssets: true,
        loader: true,
        minimizer: [{
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            quant: {
              enabled: true,
              numColors: 255,
              dither: 1.0
            },
            encodeOptions: {
              oxipng: { level: 2 }
            }
          },
          filter: (source, sourcePath) => {
            return sourcePath.endsWith('.png');
          }
        },
        {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: 'auto',
            }
          },
          filter: (source, sourcePath) => {
            return sourcePath.endsWith('.jpg');
          }
        }]
      })
    );
  }
}

module.exports = ImageMinimizer;