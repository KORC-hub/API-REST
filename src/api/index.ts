import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routers.ts";

const app = express();

app.use(bodyParser.json());

app.use("/api", routes);

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001/");
});
