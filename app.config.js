export default () => {
  return {
    name: process.env.APP_ENV === "production" ? "Life Routine" : "Life Routine (DEV)",
    ios: {
      bundleIdentifier: process.env.APP_ENV === "production" ? "me.ph7.fastmove" : "dev.ph7.fastmove-dev",
    },
  };
};