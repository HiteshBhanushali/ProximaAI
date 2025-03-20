import { constants } from "@clerk/backend/internal";
import { handleValueOrFn } from "@clerk/shared/handleValueOrFn";
import { isDevelopmentFromSecretKey } from "@clerk/shared/keys";
import { isHttpOrHttps } from "@clerk/shared/proxy";
import hmacSHA1 from "crypto-js/hmac-sha1";
import { NextResponse } from "next/server";
import { constants as nextConstants } from "../constants";
import { DOMAIN, IS_SATELLITE, PROXY_URL, SECRET_KEY, SIGN_IN_URL } from "./constants";
import { authSignatureInvalid, missingDomainAndProxy, missingSignInUrlInDev } from "./errors";
function setCustomAttributeOnRequest(req, key, value) {
  Object.assign(req, { [key]: value });
}
function getCustomAttributeFromRequest(req, key) {
  return key in req ? req[key] : void 0;
}
function getAuthKeyFromRequest(req, key) {
  return getCustomAttributeFromRequest(req, constants.Attributes[key]) || getHeader(req, constants.Headers[key]);
}
function getAuthStatusFromRequest(req) {
  return getCustomAttributeFromRequest(req, constants.Attributes.AuthStatus) || getHeader(req, constants.Headers.AuthStatus);
}
function getHeader(req, name) {
  var _a, _b;
  if (isNextRequest(req)) {
    return req.headers.get(name);
  }
  return req.headers[name] || req.headers[name.toLowerCase()] || ((_b = (_a = req.socket) == null ? void 0 : _a._httpMessage) == null ? void 0 : _b.getHeader(name));
}
function getCookie(req, name) {
  if (isNextRequest(req)) {
    const reqCookieOrString = req.cookies.get(name);
    if (!reqCookieOrString) {
      return void 0;
    }
    return typeof reqCookieOrString === "string" ? reqCookieOrString : reqCookieOrString.value;
  }
  return req.cookies[name];
}
function isNextRequest(val) {
  try {
    const { headers, nextUrl, cookies } = val || {};
    return typeof (headers == null ? void 0 : headers.get) === "function" && typeof (nextUrl == null ? void 0 : nextUrl.searchParams.get) === "function" && typeof (cookies == null ? void 0 : cookies.get) === "function";
  } catch (e) {
    return false;
  }
}
const OVERRIDE_HEADERS = "x-middleware-override-headers";
const MIDDLEWARE_HEADER_PREFIX = "x-middleware-request";
const setRequestHeadersOnNextResponse = (res, req, newHeaders) => {
  if (!res.headers.get(OVERRIDE_HEADERS)) {
    res.headers.set(OVERRIDE_HEADERS, [...req.headers.keys()]);
    req.headers.forEach((val, key) => {
      res.headers.set(`${MIDDLEWARE_HEADER_PREFIX}-${key}`, val);
    });
  }
  Object.entries(newHeaders).forEach(([key, val]) => {
    res.headers.set(OVERRIDE_HEADERS, `${res.headers.get(OVERRIDE_HEADERS)},${key}`);
    res.headers.set(`${MIDDLEWARE_HEADER_PREFIX}-${key}`, val);
  });
};
const injectSSRStateIntoObject = (obj, authObject) => {
  const __clerk_ssr_state = process.env.NODE_ENV !== "production" ? JSON.parse(JSON.stringify({ ...authObject })) : { ...authObject };
  return { ...obj, __clerk_ssr_state };
};
function decorateRequest(req, res, requestState, secretKey) {
  const { reason, message, status, token } = requestState;
  if (!res) {
    res = NextResponse.next();
  }
  if (res.headers.get(nextConstants.Headers.NextRedirect)) {
    return res;
  }
  let rewriteURL;
  if (res.headers.get(nextConstants.Headers.NextResume) === "1") {
    res.headers.delete(nextConstants.Headers.NextResume);
    rewriteURL = new URL(req.url);
  }
  const rewriteURLHeader = res.headers.get(nextConstants.Headers.NextRewrite);
  if (rewriteURLHeader) {
    const reqURL = new URL(req.url);
    rewriteURL = new URL(rewriteURLHeader);
    if (rewriteURL.origin !== reqURL.origin) {
      return res;
    }
  }
  if (rewriteURL) {
    setRequestHeadersOnNextResponse(res, req, {
      [constants.Headers.AuthStatus]: status,
      [constants.Headers.AuthToken]: token || "",
      [constants.Headers.AuthSignature]: token ? createTokenSignature(token, secretKey) : "",
      [constants.Headers.AuthMessage]: message || "",
      [constants.Headers.AuthReason]: reason || "",
      [constants.Headers.ClerkUrl]: req.clerkUrl.toString()
    });
    res.headers.set(nextConstants.Headers.NextRewrite, rewriteURL.href);
  }
  return res;
}
const apiEndpointUnauthorizedNextResponse = () => {
  return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
};
const isCrossOrigin = (from, to) => {
  const fromUrl = new URL(from);
  const toUrl = new URL(to);
  return fromUrl.origin !== toUrl.origin;
};
const handleMultiDomainAndProxy = (clerkRequest, opts) => {
  const relativeOrAbsoluteProxyUrl = handleValueOrFn(opts == null ? void 0 : opts.proxyUrl, clerkRequest.clerkUrl, PROXY_URL);
  let proxyUrl;
  if (!!relativeOrAbsoluteProxyUrl && !isHttpOrHttps(relativeOrAbsoluteProxyUrl)) {
    proxyUrl = new URL(relativeOrAbsoluteProxyUrl, clerkRequest.clerkUrl).toString();
  } else {
    proxyUrl = relativeOrAbsoluteProxyUrl;
  }
  const isSatellite = handleValueOrFn(opts.isSatellite, new URL(clerkRequest.url), IS_SATELLITE);
  const domain = handleValueOrFn(opts.domain, new URL(clerkRequest.url), DOMAIN);
  const signInUrl = (opts == null ? void 0 : opts.signInUrl) || SIGN_IN_URL;
  if (isSatellite && !proxyUrl && !domain) {
    throw new Error(missingDomainAndProxy);
  }
  if (isSatellite && !isHttpOrHttps(signInUrl) && isDevelopmentFromSecretKey(opts.secretKey || SECRET_KEY)) {
    throw new Error(missingSignInUrlInDev);
  }
  return {
    proxyUrl,
    isSatellite,
    domain,
    signInUrl
  };
};
const redirectAdapter = (url) => {
  return NextResponse.redirect(url, { headers: { [constants.Headers.ClerkRedirectTo]: "true" } });
};
function assertKey(key, onError) {
  if (!key) {
    onError();
  }
  return key;
}
function createTokenSignature(token, key) {
  return hmacSHA1(token, key).toString();
}
function assertTokenSignature(token, key, signature) {
  if (!signature) {
    throw new Error(authSignatureInvalid);
  }
  const expectedSignature = createTokenSignature(token, key);
  if (expectedSignature !== signature) {
    throw new Error(authSignatureInvalid);
  }
}
export {
  apiEndpointUnauthorizedNextResponse,
  assertKey,
  assertTokenSignature,
  decorateRequest,
  getAuthKeyFromRequest,
  getAuthStatusFromRequest,
  getCookie,
  getCustomAttributeFromRequest,
  getHeader,
  handleMultiDomainAndProxy,
  injectSSRStateIntoObject,
  isCrossOrigin,
  redirectAdapter,
  setCustomAttributeOnRequest,
  setRequestHeadersOnNextResponse
};
//# sourceMappingURL=utils.js.map