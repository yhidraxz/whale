import express from "express";
import { createSubNumber, fetchSubNumber } from "./subNumbers.js";

const router = express.Router();

router.post("/", createSubNumber);

router.get("/", fetchSubNumber);

export default router;
