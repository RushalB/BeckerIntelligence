import express from "express";
import assetsRouter from "../src/routes/assets";
import personsRouter from "../src/routes/persons";

// Slim Express app for Vercel serverless — static files are served by Vercel CDN
const app = express();
app.use(express.json());
app.use("/assets", assetsRouter);
app.use("/persons", personsRouter);

export default app;
