module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        '@babel/plugin-transform-private-methods',
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};
