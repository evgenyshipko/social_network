import { ru } from "date-fns/locale";
import { format } from "date-fns";

export const formatDate = (
  date: Date | number,
  formatString = "yyyy-MM-dd",
  options = { locale: ru }
): string => format(date, formatString, options);
