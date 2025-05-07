import assert from "assert";
import { test, describe, it } from "node:test";
import { tiMonth, fuelEnergySelector } from "../calculations/environment.ts";

test("env_ipc", () => {
  assert.strictEqual(tiMonth(1.4), 5);
});

describe("fuelEnergySelector test collection", () => {
  it('Diesel case"', () => {
    const expectedResult = {
      fuel_price: 11795,
      fuel_energy: 40.7,
      emision_factor: 74.01,
    };
    assert.deepStrictEqual(fuelEnergySelector("diesel"), expectedResult);
    assert.deepStrictEqual(fuelEnergySelector("Diesel"), expectedResult);
  });
  it("Gasoline case", () => {
    const expectedResult = {
      fuel_price: 16700,
      fuel_energy: 35.58,
      emision_factor: 69.25,
    };
    assert.notEqual(fuelEnergySelector("gasoline"), expectedResult);
    assert.notEqual(fuelEnergySelector("Gasoline"), expectedResult);
  });
  it("not return empty object", () => {
    assert.notDeepEqual(fuelEnergySelector("Diesel"), {});
    assert.notDeepEqual(fuelEnergySelector("gasoline"), {});
  });
  it("Prueba con otro combustible", () => {
    assert.strictEqual(fuelEnergySelector("GLP"), "Tipo de combustible no valido");
  });
});
