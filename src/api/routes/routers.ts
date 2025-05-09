import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
import response from "../../utils/httpResponse.ts";
import {
  tiMonth,
  fuelEnergySelector,
  electricalConsumption,
  costElectricalKM,
  combustionConsumption,
  fuelConsumption,
} from "../../calculations/environment.ts";

const router = Router();

router.get("/env_test/:fuel", (req, res) => {
  try {
    const fuel = req.params.fuel;
    const fuelEnergySelectorResult = fuelEnergySelector(fuel);
    const electricalConsumptionResult = electricalConsumption(81.14, 200);
    const combustionConsumptionResult = combustionConsumption(electricalConsumptionResult);
    const list = {
      fuelEnergySelector: fuelEnergySelectorResult,
      electricalConsumption: electricalConsumptionResult,
      cost_electrical_km: costElectricalKM(electricalConsumptionResult, 238.25),
      combustionConsumption: combustionConsumptionResult,
      fuelConsumption: fuelConsumption(
        combustionConsumptionResult,
        fuelEnergySelectorResult["fuel_energy"]
      ),
    };
    response.success(res, list, 200);
  } catch (error) {
    response.error(res,error.message);
  }
});

router.get("/report", (req, res) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const reportPath = path.join(__dirname, "../test-report/report.html");
  console.log(reportPath);
  res.sendFile(reportPath);
});

export default router;
