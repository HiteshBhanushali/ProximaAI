import { clerkClient } from "../../server/clerkClient";
import { auth } from "./auth";
async function currentUser() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  return clerkClient.users.getUser(userId);
}
export {
  currentUser
};
//# sourceMappingURL=currentUser.js.map