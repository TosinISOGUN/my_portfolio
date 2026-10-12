export const siteUrl = "https://portfolio.isogunlabs.com";
export const ogImageUrl = new URL("/og-image.jpg", siteUrl).toString();

/** Search result title: leads with what people type into Google. */
export const seoTitle = "Freelance Web Designer and Developer | Oluwatomisin Isogun";

/** Title for link previews (WhatsApp, LinkedIn, X), where the pitch matters more than keywords. */
export const shareTitle = "Oluwatomisin Isogun | Websites That Turn Visitors Into Customers";

export const seoDescription =
  "I'm a freelance web designer and developer. I build fast, mobile-friendly websites that turn visitors into customers.";

export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();
