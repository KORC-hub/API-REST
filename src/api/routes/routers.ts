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

export default router;
