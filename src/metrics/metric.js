const { create, all } = require("mathjs");

const config = {};
const math = create(all, config);

function getDerivative(tensor, coordinate, dimension = 4) {
  const dg = math.diag([1, 1, 1, 1]);
  const c = math.parse(coordinate);
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      dg[i][j] = math.derivative(tensor[i][j], c);
    }
  }
  return dg;
}

function derive(tensor, coordinates) {
  const dimension = coordinates.length;
  const derivativeMap = coordinates.reduce((components, coordinate) => {
    components[coordinate] = getDerivative(tensor, coordinate, dimension);
    return components;
  }, {});
  derivative = coordinates.map((coordinate) => derivativeMap[coordinate]);
  return { derivative, derivativeMap };
}

module.exports = class Metric {
  constructor(tensor, inverse, coordinates) {
    const ones = math.diag(["1", "1", "1", "1"].map((s) => math.parse(s)));
    this.tensor = tensor ? tensor : ones;
    this.inverse = inverse ? inverse : ones;
    this.coordinates = coordinates ? coordinates : ["t", "x", "y", "z"];
    const { derivative, derivativeMap } = derive(this.tensor, this.coordinates);
    this.derivative = derivative;
    this.derivativeMap = derivativeMap;
    this.g = this.tensor;
    this.h = this.inverse;
    this.dg = this.derivative;
  }
};
