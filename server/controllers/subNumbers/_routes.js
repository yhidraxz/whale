import express from "express";
import { createSubNumber, fetchNumbers } from "./subNumbers.js";

const router = express.Router();

router.post("/", createSubNumber);

router.get("/", fetchNumbers);

export default router;
