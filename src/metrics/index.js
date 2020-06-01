// import Metric from "./metric";
const Metric = require("./metric");

const { create, all } = require("mathjs");

const config = {};
const math = create(all, config);

const s = require("./schwarzschild");

function sum(...expressions) {
  return expressions
    .map((expr) => `${expr}`)
    .filter((s) => s !== "")
    .map((s) => `(${s})`)
    .join(" + ");
}

function subtract(...expressions) {
  return expressions
    .map((expr) => `${expr}`)
    .filter((s) => s !== "")
    .map((s) => `(${s})`)
    .join(" - ");
}

function multiply(...expressions) {
  return expressions
    .map((expr) => `${expr}`)
    .filter((s) => s !== "")
    .map((s) => `(${s})`)
    .join("*");
}

//  h[a][i] * g[i][b][c];
const [a, b, c] = [0, 0, 0];
const g = s.g;
const h = s.h;
const dg = s.dg;
const i = 0;
const dimension = 4;
const dimensions = [...Array(dimension).keys()];
console.log(
  sum(
    ...dimensions.map((i) =>
      multiply(
        h[c][i],
        sum(dg[b][i][a], dg[a][i][b], multiply("-1", dg[i][b][a]))
      )
    )
  )
);
