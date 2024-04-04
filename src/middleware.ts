import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  //Add locales you want in the app
  locales: ["en", "cn"],

  // default locale if no match
  defaultLocale: "cn",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(cn|en)/:path*"],
};
