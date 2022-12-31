import { provinces } from "../helpers/provinces";

export const paragraph = "";

export const EventStatus = {
  COMPLETED: "event.completed",
  SOLDOUT: "event.sold-out",
  AVAILABLE: "event.available",
};
export const TicketStatus = {
  AVAILABLE: "ticket.available",
  SOLD_OUT: "ticket.sold-out",
  BEST_SELLER: "ticket.best-seller",
};
export const ROLE = {
  Customer: "ROLE_USER",
  Organizer: "ROLE_ORGANIZATION",
};
export const comparisonStatus = {
  EQUAL: "equal",
  MORE: "more",
  LESS: "less",
  DIFFERENT: "different",
};
const province = {
  HN: "Hanoi",
  HP: "Haiphong",
  SG: "Ho Chi Minh City",
  LD: "Lam Dong",
};
var provinceMapping = new Map();
var translateProvinceMap = new Map();
function mappingProvince() {
  for (let i = 0; i < provinces.length; i++) {
    provinceMapping.set(provinces[i].name, provinces[i].name);
    translateProvinceMap.set(provinces[i].name, provinces[i].name);
  }
  provinceMapping.set("Thành phố Hồ Chí Minh", "TP. Hồ Chí Minh");
  translateProvinceMap.set("Thành phố Hồ Chí Minh", "Ho Chi Minh City");
}

const PATTERNS = {
  OLD_EMAIL_PATTERN:
    /^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/,
  DOMAIN_PATTERN:
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/,
  IP_PATTERN:
    /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/,
  USERNAME_PATTERN: /^[A-Za-z0-9_.-]{6,64}$/,
  NAME_PATTERN: /^([^0-9]*)$/,
  PASSWORD_PATTERN: /^.{8,}$/,
  PASSWORD_UPPER: /^(?=.*[A-Z]).{8,}$/,
  PASSWORD_LOWER: /^(?=.*[a-z]).{8,}$/,
  PASSWORD_NUMBER: /^(?=.*\d).{8,}$/,
  DATE_PATTERN: /^(([01])\d)\/(([012])\d)\/((19|20)\d{2})$/,
  DATE_FORMAT: "DD/MM/YYYY",
  DATE_TIME_FORMAT: "DD/MM/YYYY HH:mm:ss",
  SECTION_PATTERN: /[A-E][1-9]-[1-9]|[A-E][1-9]/g,
  NUMBER_MAX_LENGTH_64: /^[0-9]{,64}$/,
  NUMBER_MAX_LENGTH_128: /^[0-9]{,128}$/,
  NUMBER_MAX_LENGTH_255: /^[0-9]{,255}$/,
  USER_GROUP_NAME: /^[a-zA-Z0-9_ -]*$/,
  BLANK_SPACES: /[^\s*]/g,
  RE_DIGIT: /^\d+$/,
};
const constants = {
  mappingProvince,
  translateProvinceMap,
  provinceMapping,
  province,
  EventStatus,
  comparisonStatus,
  PATTERNS,
  ROLE,
};
export default constants;
