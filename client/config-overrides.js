const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireSvgReactLoader = require('react-app-rewire-svg-react-loader');


module.exports = function override(config, env) {
   config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
        config,
    );
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#1ad3fd" },
        javascriptEnabled: true,
    })(config, env);
    config = rewireSvgReactLoader(config, env);

    return config;
};
  