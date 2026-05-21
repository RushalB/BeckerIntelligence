import express from "express";
import assetsRouter from "./routes/assets";
import personsRouter from "./routes/persons";

import path from "path";

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.use("/design_system", express.static(path.join(__dirname, "../design_system")));

app.use("/assets", assetsRouter);
app.use("/persons", personsRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
);

export default app;
