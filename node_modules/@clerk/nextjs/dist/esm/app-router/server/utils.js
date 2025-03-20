import { NextRequest } from "next/server";
const isPrerenderingBailout = (e) => {
  if (!(e instanceof Error) || !("message" in e)) {
    return false;
  }
  const { message } = e;
  const lowerCaseInput = message.toLowerCase();
  const dynamicServerUsage = lowerCaseInput.includes("dynamic server usage");
  const bailOutPrerendering = lowerCaseInput.includes("this page needs to bail out of prerendering");
  const routeRegex = /Route .*? needs to bail out of prerendering at this point because it used .*?./;
  return routeRegex.test(message) || dynamicServerUsage || bailOutPrerendering;
};
const buildRequestLike = () => {
  try {
    const { headers } = require("next/headers");
    return new NextRequest("https://placeholder.com", { headers: headers() });
  } catch (e) {
    if (e && isPrerenderingBailout(e)) {
      throw e;
    }
    throw new Error(
      `Clerk: auth() and currentUser() are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e}`
    );
  }
};
export {
  buildRequestLike
};
//# sourceMappingURL=utils.js.map