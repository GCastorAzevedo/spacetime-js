// import Metric from "../metrics/metric";
const Metric = require("../metrics/metric");

const { create, all } = require("mathjs");

const config = {};
const math = create(all, config);

function sum(...expressions) {
  return expressions
    .map((expr) => `${expr}`)
    .filter((s) => s !== "")
    .map((s) => `(${s})`)
    .join(" + ");
}

function multiply(...expressions) {
  return expressions
    .map((expr) => `${expr}`)
    .filter((s) => s !== "")
    .map((s) => `(${s})`)
    .join("*");
}

function getEmptyTensor(dimension) {
  const dimensions = [...Array(dimension).keys()];
  return dimensions.map((i) => dimensions.map((i) => []));
}

// export default class ChristoffelSymbols {
module.exports = class Christoffel {
  constructor(metric, dimension = 4) {
    // this.metric = metric ? metric : new Metric();
    this.metric = new Metric();
    this.dimension = dimension;
    this.symbols = this.calculate(this.metric, this.dimension);
  }

  calculate(metric, dimension = 4) {
    const dimensions = [...Array(dimension).keys()];
    symbols = getEmptyTensor(dimension);
    const g = metric.g;
    const h = metric.h;
    const dg = metric.dg;
    for (let a of dimensions) {
      for (let b of dimensions) {
        for (let c of dimensions) {
          symbols[a][b][c] = math.simplify(
            math.parse(
              sum(
                ...dimensions.map((i) =>
                  multiply(
                    h[c][i],
                    sum(dg[b][i][a], dg[a][i][b], multiply("-1", dg[i][b][a]))
                  )
                )
              )
            )
          );
        }
      }
    }
    return symbols;
  }
};
