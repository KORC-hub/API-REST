import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
import response from "../../utils/httpResponse.ts";

const router = Router();

router.get("/env_test", (req, res) => {
  try {
    response.sucess(res, "Env test");
  } catch (error) {
    response.error(res);
  }
});

router.get("/report", (req, res) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const reportPath = path.join(__dirname, "../test-report/report.html");
  console.log(reportPath);
  res.sendFile(reportPath);
});

export default router;
