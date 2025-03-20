import type { AuthenticateRequestOptions, AuthObject, ClerkRequest, RedirectFun } from '@clerk/backend/internal';
import type { NextMiddleware } from 'next/server';
import type { AuthProtect } from './protect';
import type { NextMiddlewareEvtParam, NextMiddlewareRequestParam, NextMiddlewareReturn } from './types';
export type ClerkMiddlewareAuthObject = AuthObject & {
    protect: AuthProtect;
    redirectToSignIn: RedirectFun<Response>;
};
export type ClerkMiddlewareAuth = () => ClerkMiddlewareAuthObject;
type ClerkMiddlewareHandler = (auth: ClerkMiddlewareAuth, request: NextMiddlewareRequestParam, event: NextMiddlewareEvtParam) => NextMiddlewareReturn;
export type ClerkMiddlewareOptions = AuthenticateRequestOptions & {
    debug?: boolean;
};
/**
 * Middleware for Next.js that handles authentication and authorization with Clerk.
 * For more details, please refer to the docs: https://clerk.com/docs/references/nextjs/clerk-middleware
 */
interface ClerkMiddleware {
    /**
     * @example
     * export default clerkMiddleware((auth, request, event) => { ... }, options);
     */
    (handler: ClerkMiddlewareHandler, options?: ClerkMiddlewareOptions): NextMiddleware;
    /**
     * @example
     * export default clerkMiddleware(options);
     */
    (options?: ClerkMiddlewareOptions): NextMiddleware;
    /**
     * @example
     * export default clerkMiddleware;
     */
    (request: NextMiddlewareRequestParam, event: NextMiddlewareEvtParam): NextMiddlewareReturn;
}
export declare const clerkMiddleware: ClerkMiddleware;
export declare const createAuthenticateRequestOptions: (clerkRequest: ClerkRequest, options: ClerkMiddlewareOptions) => {
    proxyUrl: string;
    isSatellite: boolean;
    domain: string;
    signInUrl: string;
    publishableKey?: string | undefined;
    signUpUrl?: string | undefined;
    afterSignInUrl?: string | undefined;
    afterSignUpUrl?: string | undefined;
    audience?: string | string[] | undefined;
    authorizedParties?: string[] | undefined;
    clockSkewInMs?: number | undefined;
    jwksCacheTtlInMs?: number | undefined;
    skipJwksCache?: boolean | undefined;
    secretKey?: string | undefined;
    apiUrl?: string | undefined;
    apiVersion?: string | undefined;
    jwtKey?: string | undefined;
    debug?: boolean | undefined;
};
export {};
//# sourceMappingURL=clerkMiddleware.d.ts.map