import Handlebars from "handlebars";

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
