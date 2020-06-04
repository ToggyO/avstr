const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireAliases = require('react-app-rewire-aliases');

/* config-overrides.js */
module.exports = function override(config, env) {
    // eslint-disable-next-line no-param-reassign
    config = rewireReactHotLoader(config, env);
    config = rewireAliases.aliasesOptions({
        '@Core': path.resolve(__dirname, 'src/Core'),
        '@DevicesAccount': path.resolve(__dirname, 'src/DevicesAccount'),
        '@AdvertiserAccount': path.resolve(__dirname, 'src/AdvertiserAccount'),
    })(config, env);
    return config;
};
