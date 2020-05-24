module.exports = {
  chainWebpack: config => {
    // fork-ts-checker is sadly ignoring the Vue shim
    // and throws incorrect errors
    // we disable it as it is just a nice to have to speed up the build
    config.plugins.delete('fork-ts-checker');
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        return { ...options, transpileOnly: false };
      });
  }
};
