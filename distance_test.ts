import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { haversineDistance } from "./distance.ts";
import { getAirportsMap } from "./airport_data.ts";

Deno.test("haversineDistance", () => {
  const KSAN = getAirportsMap()["KSAN"];
  const KLAX = getAirportsMap()["KLAX"];
  const distance = haversineDistance(KSAN[0], KSAN[1], KLAX[0], KLAX[1]);
  assertEquals(distance, 95);
});
