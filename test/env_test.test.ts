import { assert, expect } from "chai";
import { describe, it } from "mocha";
import {
  tiMonth,
  fuelEnergySelector,
  electricalConsumption,
  costElectricalKM,
  combustionConsumption,
  fuelConsumption,
} from "../src/calculations/environment.ts";
import type { FuelInfo } from "../src/types/environmentTypes.ts";

describe("tiMonth test", () => {
  it("case 1", () => {
    expect(tiMonth(1.4)).to.equal(5);
  });
});

describe("fuelEnergySelector test collection", () => {
  it("Diesel case", () => {
    const expectedResult = {
      fuel_price: 11795,
      fuel_energy: 40.7,
      emision_factor: 74.01,
    };
    expect(fuelEnergySelector("diesel")).to.deep.equal(expectedResult);
    expect(fuelEnergySelector("Diesel")).to.deep.equal(expectedResult);
  });

  it("Gasoline case", () => {
    const expectedResult = {
      fuel_price: 16700,
      fuel_energy: 35.58,
      emision_factor: 69.25,
    };
    expect(fuelEnergySelector("gasoline")).to.deep.equal(expectedResult);
    expect(fuelEnergySelector("Gasoline")).to.deep.equal(expectedResult);
  });

  it("Prueba con otro combustible", () => {
    expect(() => fuelEnergySelector("GLP")).to.throw("Tipo de combustible no valido");
  });
});

describe("electricalConsumption test collection", () => {
  it("Result test", () => {
    assert.strictEqual(electricalConsumption(81.14, 200), 0.4507777777777778);
  });
});

describe("costElectricalKm test collection", () => {
  it("Result test", () => {
    const electricalConsumptionResult = electricalConsumption(81.14, 200);
    assert.strictEqual(costElectricalKM(electricalConsumptionResult, 238.25), 107.39780555555555);
  });
});

describe("combustionConsumption test collection", () => {
  it("Result test", () => {
    const electricalConsumptionResult = electricalConsumption(81.14, 200);
    assert.strictEqual(combustionConsumption(electricalConsumptionResult), 1.6695473251028805);
  });
});

describe("fuelConsumption test collection", () => {
  it("Case fuel energy gasoline", () => {
    const fuelEnergySelectorResult: FuelInfo = fuelEnergySelector("gasoline");
    const electricalConsumptionResult = electricalConsumption(81.14, 200);
    const combustionConsumptionResult = combustionConsumption(electricalConsumptionResult);
    assert.strictEqual(
      fuelConsumption(combustionConsumptionResult, fuelEnergySelectorResult["fuel_energy"]),
      0.04692375843459473
    );
  });
  it("Case fuel energy diesel", () => {
    const fuelEnergySelectorResult: FuelInfo = fuelEnergySelector("diesel");
    const electricalConsumptionResult = electricalConsumption(81.14, 200);
    const combustionConsumptionResult = combustionConsumption(electricalConsumptionResult);
    assert.strictEqual(
      fuelConsumption(combustionConsumptionResult, fuelEnergySelectorResult["fuel_energy"]),
      0.04102081879859657
    );
  });
});
