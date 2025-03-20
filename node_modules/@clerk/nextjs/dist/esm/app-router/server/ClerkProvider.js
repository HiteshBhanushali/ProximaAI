import React from "react";
import { mergeNextClerkPropsWithEnv } from "../../utils/mergeNextClerkPropsWithEnv";
import { ClientClerkProvider } from "../client/ClerkProvider";
import { initialState } from "./auth";
function ClerkProvider(props) {
  var _a;
  const { children, ...rest } = props;
  const state = (_a = initialState()) == null ? void 0 : _a.__clerk_ssr_state;
  return /* @__PURE__ */ React.createElement(
    ClientClerkProvider,
    {
      ...mergeNextClerkPropsWithEnv(rest),
      initialState: state
    },
    children
  );
}
export {
  ClerkProvider
};
//# sourceMappingURL=ClerkProvider.js.map