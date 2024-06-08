import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const projectId = config.extra?.eas?.projectId;
  const { APP_ENV } = process.env;

  return {
    name: APP_ENV === "production" ? "FastMove" : "FastMove (DEV)",
    slug: APP_ENV === "production" ? "fastmove" : "fastmove-dev",
    ios: {
      bundleIdentifier: APP_ENV === "production" ? "me.ph7.fastmove" : "dev.ph7.fastmove-dev",
    },
    android: {
      package: APP_ENV === "production" ? "me.ph7.fastmove" : "dev.ph7.fastmove.dev",
    },
    extra: {
      eas: {
        projectId,
      },
    },
  };
};
