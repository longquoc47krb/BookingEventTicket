export const paragraph = "";

export const TicketStatus = {
  SOLDOUT: "ticket.soldout",
  AVAILABLE: "ticket.available",
  DISABLE: "ticket.disabled",
};
export const comparisonStatus = {
  EQUAL: "equal",
  MORE: "more",
  LESS: "less",
  DIFFERENT: "different",
};
const provinceMapping = new Map();
provinceMapping.set("SG", "TP. Hồ Chí Minh");
provinceMapping.set("HN", "Hà Nội");
provinceMapping.set("HP", "Hải Phòng");
provinceMapping.set("DN", "Đà Nẵng");
provinceMapping.set("35", "Lâm Đồng");
provinceMapping.set("13", "Quảng Ninh");
provinceMapping.set("34", "Khánh Hòa");
provinceMapping.set("26", "Thừa Thiên Huế");
provinceMapping.set("33", "Đắk Lắk");
provinceMapping.set("CT", "Cần Thơ");

export const ROLE = {
  Customer: "ROLE_USER",
  Organizer: "ROLE_ORGANIZATION",
};
const PATTERNS = {
  OLD_EMAIL_PATTERN:
    /^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/,
  EMAIL_PATTERN:
    /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  DOMAIN_PATTERN:
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/,
  IP_PATTERN:
    /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/,
  USERNAME_PATTERN: /^[A-Za-z0-9_.-]{6,64}$/,
  PASSWORD_PATTERN: /^.{8,}$/,
  PASSWORD_UPPER: /^(?=.*[A-Z]).{8,}$/,
  PASSWORD_LOWER: /^(?=.*[a-z]).{8,}$/,
  PASSWORD_NUMBER: /^(?=.*\d).{8,}$/,
  DATE_PATTERN: /^(([01])\d)\/(([012])\d)\/((19|20)\d{2})$/,
  DATE_FORMAT: "DD/MM/YYYY",
  TIME_FORMAT: "HH:mm",
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
  provinceMapping,
  TicketStatus,
  comparisonStatus,
  PATTERNS,
  ROLE,
};
export default constants;
