// eslint-disable-next-line @typescript-eslint/no-var-requires
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

// noinspection JSUnusedLocalSymbols
module.exports = function override(config, env) {
    console.log("override");
    let loaders = config.resolve;
    loaders.fallback = {
        fs: false,
        tls: false,
        net: false,
        https: false,
        assert: require.resolve("assert"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer-browserify"),
        crypto: require.resolve("crypto-browserify")
    };

    config.resolve.plugins = config.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin)
    );

    return config;
};
