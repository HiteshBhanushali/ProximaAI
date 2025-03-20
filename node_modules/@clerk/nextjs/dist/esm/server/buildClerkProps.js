import {
  AuthStatus,
  makeAuthObjectSerializable,
  signedInAuthObject,
  signedOutAuthObject,
  stripPrivateDataFromObject
} from "@clerk/backend/internal";
import { decodeJwt } from "@clerk/backend/jwt";
import { API_URL, API_VERSION, SECRET_KEY } from "./constants";
import { getAuthKeyFromRequest, injectSSRStateIntoObject } from "./utils";
const buildClerkProps = (req, initState = {}) => {
  const authStatus = getAuthKeyFromRequest(req, "AuthStatus");
  const authToken = getAuthKeyFromRequest(req, "AuthToken");
  const authMessage = getAuthKeyFromRequest(req, "AuthMessage");
  const authReason = getAuthKeyFromRequest(req, "AuthReason");
  const options = {
    secretKey: SECRET_KEY,
    apiUrl: API_URL,
    apiVersion: API_VERSION,
    authStatus,
    authMessage,
    authReason
  };
  let authObject;
  if (!authStatus || authStatus !== AuthStatus.SignedIn) {
    authObject = signedOutAuthObject(options);
  } else {
    const jwt = decodeJwt(authToken);
    authObject = signedInAuthObject({ ...options, sessionToken: jwt.raw.text }, jwt.payload);
  }
  const sanitizedAuthObject = makeAuthObjectSerializable(stripPrivateDataFromObject({ ...authObject, ...initState }));
  return injectSSRStateIntoObject({}, sanitizedAuthObject);
};
export {
  buildClerkProps
};
//# sourceMappingURL=buildClerkProps.js.map