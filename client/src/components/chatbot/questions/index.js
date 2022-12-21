import AskCheckUp from "./AskCheckup";
import ContactType from "./ContactType";
import DisponibilitiesClassic from "./DisponibilitiesClassic";
import DisponibilitiesOffRoad from "./DisponibilitiesOffRoad";
import DisponibilitiesRoad from "./DisponibilitiesRoad";
import DisponibilitiesSport from "./DisponibilitiesSport";
import EndContactEmail from "./EndContactEmail";
import EndContactPhone from "./EndContactPhone";
import EndDisponibilities from "./EndDisponibilities";
import EntryPoint from "./EntryPoint";
import NoDisponibilities from "./NoDisponibilities";
import VehicleDistance from "./VehicleDistance";
import VehicleLastCheck from "./VehicleLastCheck";
import VehicleUsageType from "./VehicleUsageType";
import VehicleYear from "./VehicleYear";

export const ENTRY_POINT = "ENTRY_POINT";
export const VEHICLE_YEAR = "VEHICLE_YEAR";
export const VEHICLE_LAST_CHECK = "VEHICLE_LAST_CHECK";
export const VEHICLE_USAGE_TYPE = "VEHICLE_USAGE_TYPE";
export const VEHICLE_DISTANCE = "VEHICLE_DISTANCE";
export const END_CONTACT_EMAIL = "END_CONTACT_EMAIL";
export const END_CONTACT_PHONE = "END_CONTACT_PHONE";
export const END_DISPONIBILITIES = "END_DISPONIBILITIES";
export const NO_DISPONIBILITIES = "NO_DISPONIBILITIES";
export const CONTACT_TYPE = "CONTACT_TYPE";
export const ASK_CHECKUP = "ASK_CHECKUP";
export const DISPONIBILITIES_CLASSIC = "DISPONIBILITIES_CLASSIC";
export const DISPONIBILITIES_ROAD = "DISPONIBILITIES_ROAD";
export const DISPONIBILITIES_OFFROAD = "DISPONIBILITIES_OFFROAD";
export const DISPONIBILITIES_SPORT = "DISPONIBILITIES_SPORT";

export default {
  [ENTRY_POINT]: EntryPoint,
  [VEHICLE_YEAR]: VehicleYear,
  [VEHICLE_LAST_CHECK]: VehicleLastCheck,
  [VEHICLE_USAGE_TYPE]: VehicleUsageType,
  [VEHICLE_DISTANCE]: VehicleDistance,
  [END_CONTACT_EMAIL]: EndContactEmail,
  [END_CONTACT_PHONE]: EndContactPhone,
  [CONTACT_TYPE]: ContactType,
  [ASK_CHECKUP]: AskCheckUp,
  [DISPONIBILITIES_CLASSIC]: DisponibilitiesClassic,
  [DISPONIBILITIES_ROAD]: DisponibilitiesRoad,
  [DISPONIBILITIES_OFFROAD]: DisponibilitiesOffRoad,
  [DISPONIBILITIES_SPORT]: DisponibilitiesSport,
  [END_DISPONIBILITIES]: EndDisponibilities,
  [NO_DISPONIBILITIES]: NoDisponibilities,
};
