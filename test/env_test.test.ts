import { assert, expect } from "chai";
import { describe, it } from "mocha";
import { tiMonth, fuelEnergySelector } from "../src/calculations/environment.ts";

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
    expect(fuelEnergySelector("GLP")).to.equal("Tipo de combustible no valido");
  });
});
