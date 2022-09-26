// Wrapper for the VATSIM APIs to get live data from the servers.

import { Status, V3ResponseData } from "./models.ts";

const STATUS_URL = "https://status.vatsim.net/status.json";

/**
 * Object type used for communicating with the APIs.
 */
export interface Vatsim {
  v3Url: string;
  transceiversUrl: string;
}

/**
 * Return a new object containing selected V3 and transceivers URLs.
 *
 * ```ts
 * const vatsim = await getInstance();
 * ```
 */
export async function getInstance(): Promise<Vatsim> {
  const response = await fetch(STATUS_URL);
  if (response.status !== 200) {
    throw new Error(
      `Got status ${response.status} from the VATSIM status endpoint`,
    );
  }
  const status: Status = (await response.json());
  const data = status.data;
  const v3Url = data.v3[Math.floor(Math.random() * data.v3.length)];
  const transceiversUrl = data
    .transceivers[Math.floor(Math.random() * data.transceivers.length)];
  return { v3Url, transceiversUrl };
}

/**
 * Query the stored V3 endpoint.
 *
 * ```ts
 * const vatsim = await getInstance();
 * const data = await vatsim.getV3Data();
 * ```
 */
export async function getV3Data(vatsim: Vatsim): Promise<V3ResponseData> {
  const response = await fetch(vatsim.v3Url);
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}

/**
 * Query the stored transceivers endpoint.
 *
 * ```ts
 * const vatsim = await getInstance();
 * const data = await vatsim.getTransceiversData();
 * ```
 */
export async function getTransceiversData(
  vatsim: Vatsim,
): Promise<V3ResponseData> {
  const response = await fetch(vatsim.transceiversUrl);
  if (response.status >= 400) {
    throw new Error(`Got status code ${response.status} from endpoint`);
  }
  return response.json();
}
