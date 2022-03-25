import { camelCase } from "lodash";

export const camelizeKeys = <Response, Param>(obj: Param) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[camelCase(key)] = obj[key];
    return acc;
  }, {}) as Response;
