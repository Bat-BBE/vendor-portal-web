import {
  parseAsInteger,
  parseAsIsoDate,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";

export const filterParsers = {
  year: parseAsInteger.withDefault(new Date().getFullYear()),
  month: parseAsInteger,
  from: parseAsIsoDate,
  to: parseAsIsoDate,
  columns: parseAsArrayOf(parseAsString).withDefault([]),
  search: parseAsString.withDefault(""),
};
