import compression from "compression";
import express from "express";
import lusca from "lusca";

import InMemoryGeniallyRepository from "../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import * as geniallyController from "./controllers/genially";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
app.get("/", healthController.check);
app.post("/genially", geniallyController.create);
app.delete("/genially/:geniallyId", geniallyController.remove);
app.put("/genially/:geniallyId/rename", geniallyController.rename);

export default app;
export const repository = new InMemoryGeniallyRepository();
