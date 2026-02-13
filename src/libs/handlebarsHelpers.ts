import Handlebars from "handlebars";

import { formatDate, formatTime } from "./dateUtils";

Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

Handlebars.registerHelper("not", function (value) {
  return !value;
});

Handlebars.registerHelper("gt", function (a, b) {
  return a > b;
});

Handlebars.registerHelper("lt", function (a, b) {
  return a < b;
});

Handlebars.registerHelper("formatDate", function (dateString) {
  if (!dateString) return "";
  return formatDate(dateString);
});

Handlebars.registerHelper("formatTime", function (dateString) {
  if (!dateString) return "";
  return formatTime(dateString);
});
