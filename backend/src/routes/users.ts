import express from "express";

import {
    createUser,
    getAuthenticatedUser,
    login,
    logout,
} from "../controllers/users";
import { requireAuth } from "../middleware";

const router = express.Router();

router.get("/", requireAuth, getAuthenticatedUser);
router.post("/signup", createUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;
