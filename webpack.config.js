module.exports = function (baseConfig, context) {
  baseConfig.optimization.runtimeChunk = false;

  return baseConfig;
};
