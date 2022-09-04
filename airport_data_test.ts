import { assert } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { AIRPORTS, getAirportsMap } from "./airport_data.ts";

Deno.test("AIRPORTS", () => {
  assert(AIRPORTS.length > 1);
});

Deno.test("getAirportsMap", () => {
  assert(getAirportsMap()["KSAN"] !== undefined);
});
