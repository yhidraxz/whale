import express from "express";
import { createUser } from "./userController.js";

const router = express.Router();

router.post("/", createUser);

export default router;
