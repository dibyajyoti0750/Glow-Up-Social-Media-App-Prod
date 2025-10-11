import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "./wrapAsync.js";

export const protect = wrapAsync(async (req, res, next) => {
  const { userId } = await req.auth();
  if (!userId) throw new ExpressError(401, "Not authenticated");
  next();
});
