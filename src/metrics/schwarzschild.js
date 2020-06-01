// import Metric from "./metric";
const Metric = require("./metric");

const { create, all } = require("mathjs");

const config = {};
const math = create(all, config);

/* 
  t - time
  r - radius, r^2 = x^2 + y^2 + z^2
  o - theta
  p - phi
*/
const coordinates = ["t", "r", "o", "p"];

const tensor = math.diag([
  math.parse("-(1 - 2*G*M/(r*c^2))"),
  math.parse("(1 - 2*G*M/(r*c^2))^(-1)"),
  math.parse("r^2"),
  math.parse("r^2*sin(o)^2"),
]);

const inverse = math.diag([
  math.parse("-(1 - 2*G*M/(r*c^2))^(-1)"),
  math.parse("(1 - 2*G*M/(r*c^2))"),
  math.parse("1/r^2"),
  math.parse("1/(r^2*sin(o)^2)"),
]);

const schwarzschild = new Metric(tensor, inverse, coordinates);

// export { schwarzschild };
module.exports = schwarzschild;
