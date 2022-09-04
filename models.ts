export interface StatusData {
  v3: Array<string>;
  transceivers: Array<string>;
  servers: Array<string>;
  servers_sweatbox: Array<string>;
  servers_all: Array<string>;
}

export interface Status {
  data: StatusData;
  user: Array<string>;
  metar: Array<string>;
}

export interface FlightPlan {
  flight_rules: string;
  aircraft: string;
  aircraft_faa: string;
  aircraft_short: string;
  departure: string;
  arrival: string;
  alternate: string;
  cruise_tas: string;
  altitude: string;
  deptime: string;
  enroute_time: string;
  fuel_time: string;
  remarks: string;
  route: string;
  revision_id: number;
  assigned_transponder: string;
}

export interface Pilot {
  cid: number;
  name: string;
  callsign: string;
  server: string;
  pilot_rating: number;
  latitude: number;
  longitude: number;
  altitude: number;
  groundspeed: number;
  transponder: string;
  heading: number;
  qnh_i_hg: number;
  qnh_mb: number;
  flight_plan: FlightPlan | null;
  logon_time: string;
  last_updated: string;
}

export interface Controller {
  cid: number;
  name: string;
  callsign: string;
  frequency: string;
  facility: number;
  rating: number;
  server: string;
  visual_range: number;
  text_atis: Array<string> | null;
  last_updated: string;
  logon_time: string;
}

export interface GeneralData {
  version: number;
  reload: number;
  update: string;
  update_timestamp: string;
  connected_clients: number;
  unique_users: number;
}

export interface Atis {
  cid: number;
  name: string;
  callsign: string;
  frequency: string;
  facility: number;
  rating: number;
  server: string;
  visual_range: number;
  atis_code: string | null;
  text_atis: Array<string> | null;
  last_updated: string;
  logon_time: string;
}

export interface Server {
  ident: string;
  hostname_or_ip: string;
  location: string;
  name: string;
  clients_connection_allowed: number;
  client_connections_allowed: boolean;
  is_sweatbox: boolean;
}

export interface ReferenceItem {
  id: number;
  short: string;
  long: string;
}

export interface ReferenceNameItem {
  id: number;
  short_name: string;
  long_name: string;
}

export interface V3ResponseData {
  general: GeneralData;
  pilots: Array<Pilot>;
  controllers: Array<Controller>;
  atis: Array<Atis>;
  servers: Array<Server>;
  facilities: Array<ReferenceItem>;
  ratings: Array<ReferenceItem>;
  pilot_ratings: Array<ReferenceNameItem>;
}

export interface TransceiverEntry {
  id: number;
  frequency: number;
  latDeg: number;
  lonDeg: number;
  heightMslM: number;
  heightAglM: number;
}

export interface TransceiverResponseEntry {
  callsign: string;
  transceivers: Array<TransceiverEntry>;
}

export interface UserRatingsSimple {
  id: string;
  rating: number;
  pilot_rating: number;
  susp_date: string | null;
  reg_date: string;
  region: string;
  division: string;
  subdivision: string;
  lastratingchange: string;
}

export interface RatingsTimeData {
  id: number;
  atc: number;
  pilot: number;
  s1: number;
  s2: number;
  s3: number;
  c1: number;
  c2: number;
  c3: number;
  i1: number;
  i2: number;
  i3: number;
  sup: number;
  adm: number;
}

export interface ConnectionEntry {
  id: number;
  vatsim_id: string;
  type: number;
  rating: number;
  callsign: string;
  start: string;
  end: string | null;
  server: string;
}

/**
 * A paginated response wrapper.
 *
 * Includes a count of items, potential links to next/previous
 * pages, and a list of results.
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
}

export interface AtcSessionEntry {
  connection_id: number;
  start: string;
  end: string;
  server: string;
  vatsim_id: string;
  type: number;
  rating: number;
  callsign: string;
  minutes_on_callsign: string;
  total_minutes_on_callsign: number;
  total_aircraft_tracked: number;
  total_aircraft_seen: number;
  total_flights_amended: number;
  total_handoffs_initiated: number;
  total_handoffs_received: number;
  total_handoffs_refused: number;
  total_squawks_assigned: number;
  total_cruisealts_modified: number;
  total_tempalts_modified: number;
  total_scratchpadmods: number;
  aircrafttracked: number;
  aircraftseen: number;
  flightsamended: number;
  handoffsinitiated: number;
  handoffsreceived: number;
  handoffsrefused: number;
  squawksassigned: number;
  cruisealtsmodified: number;
  tempaltsmodified: number;
  scratchpadmods: number;
}

export interface RestFlightPlans {
  id: number;
  connection_id: number;
  vatsim_id: string;
  flight_type: string;
  callsign: string;
  aircraft: string;
  cruisespeed: string;
  dep: string;
  arr: string;
  alt: string;
  altitude: string;
  rmks: string;
  route: string;
  deptime: string;
  hrsenroute: number;
  minenroute: number;
  hrsfuel: number;
  minsfuel: number;
  filed: string;
  assignedsquawk: string;
  modifiedbycid: string;
  modifiedbycallsign: string;
}

export interface Region {
  id: string;
  name: string;
  director: string;
}

export interface Facility {
  id: string;
  start: string;
  callsign: string;
  rating: number;
}
