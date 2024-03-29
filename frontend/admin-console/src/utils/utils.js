/* eslint-disable no-useless-concat */
/* eslint-disable array-callback-return */
import cloneDeep from "lodash/cloneDeep";
import forOwn from "lodash/forOwn";
import isEqual from "lodash/isEqual";
import memoize from "lodash/memoize";
import xorWith from "lodash/xorWith";
import { DateTime, Duration } from "luxon";
import moment from "moment";
import constants from "./constants";
const { PATTERNS } = constants;
const timeFormat = "HH:mm";
export const LOCALE = "en-US";
export const CURRENCY = "USD";
export const TIMEZONE_IANA = "Asia/Kolkata";
export const LUXON_FORMAT = {
  DATE: "dd/LL/y",
  TIME: "hh:mm a",
  DATE_TIME: "dd/LL/y hh:mm a",
  DURATION: "hh:mm:ss",
};
export const REGEX = {
  NUMERIC: {
    STRICT: /^[+-]?[\d]+[.]?[\d]*$/gm,
    LOOSE: /^[+-]?[\d]*[.]?[\d]*$/gm,
  },
};
export const FRACTION_LENGTH = 2;

export const runInDevelopment = (callback) =>
  [undefined, "", "development"].includes(process.env.REACT_APP_ENV) &&
  callback();

export const logInfo = (...args) =>
  runInDevelopment(() => console.info(...args)); // eslint-disable-line no-console
export const logWarn = (...args) =>
  runInDevelopment(() => console.warn(...args)); // eslint-disable-line no-console
export const logError = (...args) =>
  runInDevelopment(() => console.error(...args)); // eslint-disable-line no-console
export const logTable = (...args) =>
  runInDevelopment(() => console.table(...args)); // eslint-disable-line no-console

export const typeOf = (input, type) =>
  input?.constructor?.name === (type ?? null);

export const catchError = (func, onError) => {
  const handleError = (error) => {
    logWarn(error);
    return onError?.(error);
  };
  try {
    const output = func?.();
    if (!typeOf(output, "Promise")) return output;
    return output?.catch?.(handleError);
  } catch (error) {
    handleError(error);
  }
};

export const isArray = (input) => typeOf(input, "Array");

export const isObject = (input) => typeOf(input, "Object");

export const isBoolean = (input) => typeOf(input, "Boolean");

export const isString = (input) => typeOf(input, "String");

export const isShallowEqual = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (let key of obj1Keys) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};
// check if object contains array

export const containsObject = (obj, list) => {
  const isFound = list.some((element) => {
    if (element.id === obj.id) {
      return true;
    }

    return false;
  });
  isFound();
};

export const isNumber = (input) =>
  typeOf(input, "Number") && !Number.isNaN(input) && Number.isFinite(input);

export const isNumeric = (input, strict = false) =>
  new RegExp(strict ? REGEX.NUMERIC.STRICT : REGEX.NUMERIC.LOOSE).test(input);

export const isAlphaNumeric = (input) =>
  new RegExp(REGEX.ALPHA_NUMERIC).test(input);

export const isFunction = (input) => typeOf(input, "Function");

export const callFunction = (func, ...args) =>
  isFunction(func) && func(...args);

export const forEach = (instance, callback) =>
  Array.prototype.forEach.call(instance, callback);

export const isHTMLElement = (input) => input instanceof HTMLElement;

export const isEmpty = (input, options) => {
  options = { isEmpty: [], isNotEmpty: [], ...options };

  if (options.isEmpty?.includes?.(input)) return true;
  if (options.isNotEmpty?.includes?.(input)) return false;
  if ([undefined, null].includes(input)) return true;

  if (input?.constructor?.name === "Array") return !input.length;
  if (input?.constructor?.name === "Number") return Number.isNaN(input);
  if (input?.constructor?.name === "Object") return !Object.keys(input).length;
  if (input?.constructor?.name === "String") return !input.trim().length;

  return false;
};

export const isNotEmpty = (...args) => !isEmpty(...args);

export const pruneEmpty = (obj, options) => {
  const prune = (current) => {
    forOwn(current, (value, key) => {
      if (
        isEmpty(value, options) ||
        ((isObject(value) || isArray(value)) && isEmpty(prune(value), options))
      )
        delete current[key];
    });
    if (isArray(current)) current = current.filter(isNotEmpty);
    return current;
  };
  return prune(cloneDeep(obj));
};

export const isArrayEqual = (list1, list2) =>
  isEmpty(xorWith(list1, list2, isEqual));

export const returnIfNotEmpty = (value, replaceWith) =>
  isEmpty(value) ? replaceWith : value;

export const hasKey = (object, key) =>
  isObject(object) && !isEmpty(object) && Object.keys(object).includes(key);

export const withDefaults = (object, defaults) => ({ ...defaults, ...object });

export const getCurrentTime = () => DateTime.local().setZone(TIMEZONE_IANA);

export const formatDateTime = memoize(
  (isoDate, format = LUXON_FORMAT.DATE_TIME) => {
    const dateTime = DateTime.fromISO(isoDate);
    return dateTime?.isValid ? dateTime.toFormat(format) : undefined;
  },
  (...args) => JSON.stringify(args)
);

export const formatDate = (isoDate, format = LUXON_FORMAT.DATE) =>
  formatDateTime(isoDate, format);

export const formatTime = (isoDate, format = LUXON_FORMAT.TIME) =>
  formatDateTime(isoDate, format);

export const formatDuration = (duration, format = LUXON_FORMAT.DURATION) =>
  Duration.isDuration(duration) && duration?.isValid
    ? duration.toFormat(format)
    : undefined;

export const getDateTimeDiff = (startISO, endISO) =>
  DateTime.fromISO(endISO).diff(DateTime.fromISO(startISO));

export const getFormattedDateTimeDiff = (
  startISO,
  endISO,
  format = LUXON_FORMAT.DURATION
) => formatDuration(getDateTimeDiff(startISO, endISO), format);

export const formatNumber = (input, options = {}) => {
  if (!isNumber(Number(input))) return input;
  const { locale, trimFractions, ...rest } = {
    locale: LOCALE,
    trimFractions: false,
    ...options,
  };
  const fractionLength = trimFractions
    ? rest?.fractionLength
    : `${input}`.split(".")?.[1]?.length;
  const defaults = {
    maximumFractionDigits: fractionLength,
    minimumFractionDigits: fractionLength,
  };
  return new Intl.NumberFormat(locale, { ...defaults, ...rest }).format(input);
};
export function getThreeFirstLetters(word) {
  return word.substring(0, 3);
}
export function removeSlash(string) {
  const [day, month, year] = string.split("/");
  return `${day}${month}${year}`;
}
export function generateId(name, date) {
  return (
    getThreeFirstLetters(toNonAccentVietnamese(name)) +
    removeSlash(date) +
    Math.floor(Math.random() * 10000)
  ).toUpperCase();
}
export const formatCurrency = (number, options = {}) => {
  const { locale, ...rest } = {
    locale: LOCALE,
    currency: CURRENCY,
    ...options,
  };
  return new Intl.NumberFormat(locale, { style: "currency", ...rest }).format(
    number
  );
};

export const formatDecimal = (input, fractionLength = FRACTION_LENGTH) =>
  formatNumber(input, { trimFractions: true, fractionLength });

export const parseDecimal = (input, fractionLength = FRACTION_LENGTH) =>
  Number(parseFloat(input).toFixed(fractionLength));

export const formatFloat = (input, fractionLength = FRACTION_LENGTH) =>
  parseFloat(input).toFixed(fractionLength);

export const formatInlineList = (value, options = {}) => {
  if (!isString(value)) return value;
  const { separator, allowAppend } = {
    separator: ",",
    allowAppend: false,
    ...options,
  };
  const valueList = `${value}`.replace(/[\s,]+/gm, separator).split(separator);
  return valueList
    .filter(
      (value, index) =>
        !isEmpty(value) ||
        (allowAppend && index && valueList?.length === index + 1)
    )
    .join(separator);
};

export const sortEntriesByKey = (desc = false) => {
  const n = { less: desc ? 1 : -1, more: desc ? -1 : 1 };
  return (curr, next) =>
    curr?.[0] < next?.[0] ? n.less : curr?.[0] > next?.[0] ? n.more : 0;
};

export const sortArrayByKey = (key = "id", desc = false) => {
  if (!isString(key)) return undefined;
  const n = { less: desc ? 1 : -1, more: desc ? -1 : 1 };
  return (curr, next) =>
    curr?.[key] < next?.[key] ? n.less : curr?.[key] > next?.[key] ? n.more : 0;
};

export const reduceUnique = (key) => {
  return (a = [], c) => {
    const indexFound = a.findIndex((item) =>
      key === undefined ? item === c : item[key] === c[key]
    );
    if (indexFound === -1) a.push(c);
    return a;
  };
};

export const padArray = (list, length, fillWith) => {
  return list.concat(Array(length).fill(fillWith)).slice(0, length);
};

export const reduceTotal = (list, key) => {
  if (!isArray(list) || isEmpty(list)) return 0;
  const numList =
    key === undefined
      ? list.map(Number)
      : list.map((item) => Number(item?.[key]));
  return numList.filter(isNumber).reduce((pv, cv) => (pv += cv), 0);
};

export const classNames = (list) => list.filter(isString).join(" ");

export const upperFirst = (input, locale = LOCALE) =>
  isString(input)
    ? input.replace(/(^[a-z])/, (match) => match.toLocaleUpperCase(locale))
    : input;

export const lowerFirst = (input, locale = LOCALE) =>
  isString(input)
    ? input.replace(/(^[a-z])/, (match) => match.toLocaleLowerCase(locale))
    : input;

export const upperCase = (input, locale = LOCALE) =>
  isString(input) ? input.toLocaleUpperCase(locale) : input;

export const lowerCase = (input, locale = LOCALE) =>
  isString(input) ? input.toLocaleLowerCase(locale) : input;

export const titleCase = (input, locale = LOCALE) =>
  catchError(
    () =>
      isString(input)
        ? input
            .split(/([ :–—-])/)
            .map((current, index, list) => {
              return (
                // Check for small words
                current.search(
                  /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i
                ) > -1 &&
                  // Skip first and last word
                  index !== 0 &&
                  index !== list.length - 1 &&
                  // Ignore title end and subtitle start
                  list[index - 3] !== ":" &&
                  list[index + 1] !== ":" &&
                  // Ignore small words that start a hyphenated phrase
                  (list[index + 1] !== "-" ||
                    (list[index - 1] === "-" && list[index + 1] === "-"))
                  ? current.toLocaleLowerCase(locale)
                  : current.substr(1).search(/[A-Z]|\../) > -1 // Ignore intentional capitalization
                  ? current
                  : list[index + 1] === ":" && list[index + 2] !== "" // Ignore URLs
                  ? current
                  : current.replace(/([A-Za-z0-9\u00C0-\u00FF])/, (match) =>
                      match.toLocaleUpperCase(locale)
                    ) // Capitalize the first letter
              );
            })
            .join("")
        : input,
    () => ""
  );

export const objectToQueryString = (object) =>
  catchError(
    () =>
      `?${Object.entries(object)
        .map(
          ([key, value]) =>
            `${key}=${
              !isEmpty(value) && isFunction(value?.toString)
                ? value.toString()
                : ""
            }`
        )
        .join("&")}`,
    () => ""
  );

export const queryStringToObject = (search = window.location.search) =>
  catchError(
    () => {
      const urlParams = new URLSearchParams(search);
      return Object.fromEntries(urlParams.entries());
    },
    () => {}
  );
/**
 * @param {Array} data - An array of objects of data.
 * @param {string} key - Key of object in the array. Key's value has date format (DD/MM/YYYY).
 * @param {string} type - Type of order. Default is ascending. There are 2 types: descending, ascending.
 */
export const orderByDate = (data, key, type = "asc") => {
  data.sort((a, b) => {
    a = moment(a[key], PATTERNS.DATE_FORMAT);
    b = moment(b[key], PATTERNS.DATE_FORMAT);
    if (a > b) return -1;
    if (a < b) return 1;
  });
  if (type === "desc") {
    return data;
  } else {
    return data.reverse();
  }
};
export const filterByDate = (type, list, customDate) => {
  const dateFormat = PATTERNS.DATE_FORMAT;
  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");
  const tomorrow = moment().add(1, "days");
  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");
  if (list && type === "tomorrow")
    return list.filter(
      (event) => moment(event.startingDate, dateFormat) === tomorrow
    );
  if (list && type === "this-week")
    return list.filter(
      (event) =>
        moment(event.startingDate, dateFormat) >= startOfWeek &&
        moment(event.startingDate, dateFormat) <= endOfWeek
    );
  if (list && type === "this-month")
    return list.filter(
      (event) =>
        moment(event.startingDate, dateFormat) >= startOfMonth &&
        moment(event.startingDate, dateFormat) <= endOfMonth
    );
  if (list && type === "date-range") {
    const start = moment(customDate.start, dateFormat);
    const end = moment(customDate.end, dateFormat);
    if (start && end) {
      return list.filter(
        (event) =>
          moment(event.startingDate, dateFormat) >= start &&
          moment(event.endingDate, dateFormat) <= end
      );
    }
  }

  return list;
};
export const checkImageURL = (url) => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};
export const displayDate = (date) => {
  return moment(date, PATTERNS.DATE_FORMAT).format("dddd, DD MMMM, YYYY");
};
/**
 * Display time in format HH:MM
 * @param {string} time -
 */
export const displayTime = (time) => {
  return moment(time, timeFormat).format("LT");
};
export const toSlug = (str) => {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, "-");

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, "");

  // return
  return str;
};
export default function fakeDelay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export function filterData(dateType, dateRange, list) {
  return list && dateType === "date-range"
    ? filterByDate(dateType, list, {
        start: dateRange.start,
        end: dateRange.end,
        isAvailable: dateRange.isAvailable,
      })
    : filterByDate(dateType, list);
}
/**
 * Convert number to currency format
 */
export const formatter = (currency) => {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  } else {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
};
export function toNonAccentVietnamese(str) {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}
export function addFileExtension(filename) {
  const extension = ".xlsx";
  return filename + extension;
}
export function convertToCommaSeparatedString(array) {
  return array.join(", ");
}

export function removeSpecialSymbolsExceptDot(text) {
  // Create a regular expression pattern to match any special symbol except the dot
  const nonAccentedText = toNonAccentVietnamese(text);
  const pattern = /[^a-zA-Z0-9.]/g;

  // Use the replace() function with the pattern to remove the characters
  const result = nonAccentedText.replace(pattern, "");

  return result;
}
export function CommaFormatted(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const convertMongodbTimeToString = (date) => {
  var language = localStorage.getItem("i18nextLng");
  let dateStr = moment(date);
  if (language === "en") {
    moment.locale("en");
    return moment(dateStr).format("DD/MM/YYYY hh:mm:ss a");
  } else {
    moment.locale("vi");
    return moment(dateStr).format("DD/MM/YYYY HH:mm:ss");
  }
};
export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}
export const reverseArray = (array) => {
  return [...array].reverse();
};
export function Greeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 12 && currentHour >= 4) {
    return "goodMorning";
  } else if (currentHour < 18) {
    return "goodAfternoon";
  } else {
    return "goodEvening";
  }
}

export function getCurrentDatetime() {
  var now = new Date();
  return now
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "");
}
export const displayFeedbackTime = (time) => {
  const now = moment();
  const date = moment(time);

  const diff = now.diff(date, "days");
  return diff >= 1 ? date.calendar() : date.fromNow();
};
