import type { AuthenticateRequestOptions, ClerkRequest, RequestState } from '@clerk/backend/internal';
import { constants } from '@clerk/backend/internal';
import { NextResponse } from 'next/server';
import type { RequestLike } from './types';
export declare function setCustomAttributeOnRequest(req: RequestLike, key: string, value: string): void;
export declare function getCustomAttributeFromRequest(req: RequestLike, key: string): string | null | undefined;
export declare function getAuthKeyFromRequest(req: RequestLike, key: keyof typeof constants.Attributes): string | null | undefined;
export declare function getAuthStatusFromRequest(req: RequestLike): string | null | undefined;
export declare function getHeader(req: RequestLike, name: string): string | null | undefined;
export declare function getCookie(req: RequestLike, name: string): string | undefined;
export declare const setRequestHeadersOnNextResponse: (res: NextResponse | Response, req: Request, newHeaders: Record<string, string>) => void;
export declare const injectSSRStateIntoObject: <O, T>(obj: O, authObject: T) => O & {
    __clerk_ssr_state: T;
};
export declare function decorateRequest(req: ClerkRequest, res: Response, requestState: RequestState, secretKey: string): Response;
export declare const apiEndpointUnauthorizedNextResponse: () => NextResponse<null>;
export declare const isCrossOrigin: (from: string | URL, to: string | URL) => boolean;
export declare const handleMultiDomainAndProxy: (clerkRequest: ClerkRequest, opts: AuthenticateRequestOptions) => {
    proxyUrl: string;
    isSatellite: boolean;
    domain: string;
    signInUrl: string;
};
export declare const redirectAdapter: (url: string | URL) => NextResponse<unknown>;
export declare function assertKey(key: string, onError: () => never): string;
/**
 * Assert that the provided token generates a matching signature.
 */
export declare function assertTokenSignature(token: string, key: string, signature?: string | null): void;
//# sourceMappingURL=utils.d.ts.map