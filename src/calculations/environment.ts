import type { FuelInfo } from "../types/environmentTypes.ts";

const tiMonth = (ipc: number): number => {
  const ti = (1 + ipc / 100) ** (1 / 12) - 1;
  console.log(ti);
  return ti;
};

const fuelEnergySelector = (data: string): FuelInfo => {
  let fuel_info: FuelInfo = {
    fuel_price: 0,
    fuel_energy: 0,
    emision_factor: 0,
  };

  data = data.toLowerCase();

  if (data === "diesel") {
    fuel_info["fuel_price"] = 11795; //scraping['diesel_price']
    fuel_info["fuel_energy"] = 40.7; //('diesel_energy')
    fuel_info["emision_factor"] = 74.01; //('emision_factor_diesel')
    return fuel_info;
  }

  if (data === "gasoline") {
    fuel_info["fuel_price"] = 16700; //scraping['fuel_price']
    fuel_info["fuel_energy"] = 35.58; //('gasoline_energy')
    fuel_info["emision_factor"] = 69.25; //('emision_factor_gasoline')
    return fuel_info;
  }

  throw new Error("Tipo de combustible no valido");
};

//  kWh/km
const electricalConsumption = (nominal_energy: number, autonomy_nominal: number): number => {
  const electrical_consumption = nominal_energy / (autonomy_nominal * 0.9);
  return electrical_consumption;
};

//  $/Km
const costElectricalKM = (electrical_consumption: number, energy_price: number): number => {
  const cost_electrical_km = energy_price * electrical_consumption;

  return cost_electrical_km;
};

const combustionConsumption = (electrical_consumption: number): number => {
  const combustion_consumption = electrical_consumption / 0.27;

  return combustion_consumption;
};

const fuelConsumption = (combustion_consumption: number, fuel_energy: number): number => {
  const fuel_consumption = combustion_consumption / fuel_energy;

  return fuel_consumption;
};

export {
  tiMonth,
  fuelEnergySelector,
  electricalConsumption,
  costElectricalKM,
  combustionConsumption,
  fuelConsumption,
};
