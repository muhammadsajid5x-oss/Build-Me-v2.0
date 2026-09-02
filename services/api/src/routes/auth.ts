import { Router } from "express";

import {
  authenticate,
  authRateLimiter,
  authorize,
} from "../middleware/index.js";
import { PERMISSIONS } from "../permissions/index.js";

const router = Router();

router.get(
  "/me",
  authRateLimiter,
  authenticate,
  authorize(PERMISSIONS.AUTHENTICATED),
  (request, response) => {
    response.json({
      data: {
        user: request.user,
      },
    });
  },
);

export default router;
