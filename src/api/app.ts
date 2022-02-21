import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as geniallyController from "./controllers/genially";
import * as healthController from "./controllers/health";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 10000);
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
app.get("/genially/count", geniallyController.count);

export default app;
