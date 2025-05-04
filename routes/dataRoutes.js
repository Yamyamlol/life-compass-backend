import express from "express";
import { getFitnessHistory, upsertFitnessEntry } from "../controllers/dataController.js";

const dataRouter = express.Router();

dataRouter.post("/push", upsertFitnessEntry);
dataRouter.get("/get", getFitnessHistory);

export default dataRouter;
