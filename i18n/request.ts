import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "./config";

export default getRequestConfig(async () => {
  // Static locale for SSG / Cache Components.
  // Cookie- or path-based locale can be added with the language switcher.
  const locale = defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
