export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://app.sequincard.com"
    : "http://localhost:3001";
