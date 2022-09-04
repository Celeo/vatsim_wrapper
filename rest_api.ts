// VATSIM's public & authenticated REST APIs on https://api.vatsim.net/
// along with some other pages.
//
// These functions are not grouped into a struct, as the URLs that
// they call are static - not dependent on a preceding call - unlike
// those used to get live data from the network.

import {
  AtcSessionEntry,
  ConnectionEntry,
  Facility,
  PaginatedResponse,
  RatingsTimeData,
  Region,
  RestFlightPlans,
  UserRatingsSimple,
} from "./models.ts";

/**
 * Get the URL for viewing a user's stats on stats.vatsim.net.
 *
 * This function just returns the URL; the caller is responsible
 * for either giving it to a user or opening it in a browser.
 *
 * ```ts
 * const url = getStatusUrl(1234567890);
 * ```
 */
export function getStatusUrl(cid: number): string {
  return `https://stats.vatsim.net/stats/${cid}`;
}

/**
 * Get a simple view of a user's ratings on the network.
 *
 * ```ts
 * const ratings = await getUserRatings(1234567890);
 * ```
 */
export async function getUserRatings(cid: number): Promise<UserRatingsSimple> {
  const response = await fetch(`https://api.vatsim.net/api/ratings/${cid}/`);
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}

/**
 * Get the amount of time the user has spent as various positions on the network.
 *
 * ```ts
 * const times = await getRatingsTimes(1234567890);
 * ```
 */
export async function getRatingsTimes(cid: number): Promise<RatingsTimeData> {
  const response = await fetch(
    `https://api.vatsim.net/api/ratings/${cid}/rating_times`,
  );
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}

/**
 * Get a list of all the user's previous connections.
 *
 * A page number can optionally be specified.
 *
 * ```ts
 * const connections = await getConnections(1234567890, null);
 * const connections = await getConnections(1234567890, 3);
 * ```
 */
export async function getConnections(
  cid: number,
  page?: number,
): Promise<PaginatedResponse<ConnectionEntry>> {
  let url = `https://api.vatsim.net/api/ratings/${cid}/connections`;
  if (page !== undefined) {
    url += `?page=${page}`;
  }
  const response = await fetch(url);
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}

/**
 * Get a user's ATC sessions.
 *
 * A page number can optionally be specified.
 *
 * A position specifier can optionally be specified. For information on what can be
 * included, see [this post](https://forums.vatsim.net/topic/20-info-on-vatsim-api/#comment-164075).
 *
 * ```ts
 * const connection = await getAtcSessions(1234567890);
 * let connections = await getAtcSessions(
 *   1234567890,
 *   2,
 *   "SAN_TWR",
 *   "2020-01-02"
 * )
 * ```
 */
export async function getAtcSessions(
  cid: number,
  page?: number,
  specifier?: string,
  start?: string,
  date?: string,
): Promise<PaginatedResponse<AtcSessionEntry>> {
  const searchParams = new URLSearchParams({});
  if (page !== undefined) {
    searchParams.append("page", `${page}`);
  }
  if (specifier !== undefined) {
    searchParams.append("specifier", specifier);
  }
  if (start !== undefined) {
    searchParams.append("start", start);
  }
  if (date !== undefined) {
    searchParams.append("date", date);
  }
  const url =
    `https://api.vatsim.net/api/ratings/${cid}/atcsessions/?${searchParams}`;
  const response = await fetch(url);
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}

/**
 * Get a list of all the user's previous flight plans.
 *
 * A page number can optionally be specified.
 *
 * Note that the structs returned by this function contain different
 * fields from flight plans returned by the V3 live API.
 *
 * ```ts
 * const plans = await getFlightPlans(1234567890);
 * const plans = await getFlightPlans(1234567890, 3);
 * ```
 */
export async function getFlightPlans(
  cid: number,
  page?: number,
): Promise<PaginatedResponse<RestFlightPlans>> {
  let url = `https://api.vatsim.net/api/ratings/${cid}/flight_plans`;
  if (page !== undefined) {
    url += `?page=${page}`;
  }
  const response = await fetch(url);
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}

/**
 * Get the VATSIM regions.
 *
 * ```ts
 * const regions = await getRegions();
 * ```
 */
export async function getRegions(): Promise<Array<Region>> {
  const response = await fetch("https://api.vatsim.net/api/regions/");
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}

/**
 * Get facilities currently staffed by ATC.
 *
 * ```ts
 * const facilities = await getFacilities();
 * ```
 */
export async function getOnlineFacilities(): Promise<Array<Facility>> {
  const response = await fetch("https://api.vatsim.net/api/facilities/");
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}

/**
 * Get a facility's historical staffing data.
 *
 * A page number and start and end dates are optional.
 *
 * ```ts
 * const connections = await getFacilityHistory("SAN_TWR");
 * const connections = await getFacilityHistory("SAN_TWR", 2, "2022-02-01");
 * ```
 */
export async function getFacilityHistory(
  specifier: string,
  page?: number,
  start?: string,
  date?: string,
): Promise<PaginatedResponse<AtcSessionEntry>> {
  const searchParams = new URLSearchParams({});
  if (page !== undefined) {
    searchParams.append("page", `${page}`);
  }
  if (start !== undefined) {
    searchParams.append("start", start);
  }
  if (date !== undefined) {
    searchParams.append("date", date);
  }
  const url =
    `https://api.vatsim.net/api/facilities/${specifier}?${searchParams}`;
  const response = await fetch(url);
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}
