/* eslint-disable import/no-duplicates */
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (
  date: Date | number,
  formatString = "yyyy-MM-dd",
  options = { locale: ru }
): string => format(date, formatString, options);
