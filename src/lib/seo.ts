export const siteUrl = "https://portfolio.isogunlabs.com";
export const ogImageUrl = new URL("/og-image.jpg", siteUrl).toString();

export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();