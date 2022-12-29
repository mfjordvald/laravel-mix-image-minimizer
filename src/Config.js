class Config {
  defaultImplementation() {
    return 'squoosh';
  }

  defaultPatterns() {
    return [{
        from: "**/*",
        to: "images",
        context: "resources/images",
      }];
  }

  defaultCopyOptions() {
    return {};
  }

  defaultWebp() {
    return false;
  }

  defaultWebpOptions(implementation) {
    switch (implementation) {
      case 'squoosh':
        return {
          encodeOptions: {
            webp: {
              quality: 90,
            }
          }
        };
      case 'imagemin':
        return {
          plugins: ["imagemin-webp"]
        };
      default:
        throw new Error('Unsupported image processor implementation.');
    }
  }

  defaultOptions(implementation) {
    switch (implementation) {
      case 'squoosh':
        return undefined;
      case 'imagemin':
        return {
          plugins: [
            "imagemin-gifsicle",
            "imagemin-mozjpeg",
            "imagemin-pngquant",
            "imagemin-svgo",
          ],
        };
      default:
        throw new Error('Unsupported image processor implementation.');
    }
  }

  defaultFilter() {
    return function(sourcePath) {
      return !sourcePath.endsWith('.gif'); // Gifs are not supported by Squoosh
    }
  }
}

module.exports = Config;
