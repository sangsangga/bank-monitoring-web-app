class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }

  strategy() {
    return this.strategy;
  }
  calculate(data) {
    return this.strategy.doCalculation(data);
  }
}

class Strategy {
  doCalculation(data) {}
}

class NPL extends Strategy {
  doCalculation(kreditKols) {
    return (
      ((kreditKols[2] + kreditKols[3] + kreditKols[4]) /
        (kreditKols[0] +
          kreditKols[1] +
          kreditKols[2] +
          kreditKols[3] +
          kreditKols[4])) *
      100
    );
  }
}

class ROE extends Strategy {
  doCalculation(data) {
    return (data[0] / data[1]) * 100;
  }
}

class ROA extends Strategy {
  doCalculation(data) {
    return (data[0] / data[1]) * 100;
  }
}

class CAR extends Strategy {
  doCalculation(data) {
    return (data[0] / data[1]) * 100;
  }
}

class BOPO extends Strategy {
  doCalculation(data) {
    return (data[0] / data[1]) * 100;
  }
}

module.exports = { NPL, ROA, ROE, CAR, Context, BOPO };
