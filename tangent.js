const board = createBoard();
var q1,
  q2 = 0;
board.suspendUpdate();

var f = board.jc.snippet("x^3-4*x^2+4*x+16", true, "x", false);
var qSliderGraph = board.create(
  "slider",
  [
    [1, 4],
    [5, 4],
    [0, 0, 5],
  ],
  { visible: false }
);
var q2SliderGraph = board.create(
  "slider",
  [
    [1, 5],
    [5, 5],
    [-5, 0, 0],
  ],
  { visible: false }
);
var plot = createPlot(f);

var glider = board.create("glider", [0, 0, plot], {
  size: 5,
  name: "",
  strokeColor: "#662E9B",
  fillColor: "#662E9B",
});

var tanPoint = board.create(
  "point",
  [
    function () {
      return glider.X() + 0.0001;
    },
    function () {
      return f(glider.X() + 0.0001);
    },
  ],
  { size: 1, name: "p", size: 6 }
);

var tanPoint2 = board.create(
  "point",
  [
    function () {
      return glider.X() + qSliderGraph.Value();
    },
    function () {
      return f(glider.X() + qSliderGraph.Value());
    },
  ],
  {
    size: 2,
    name: "q1",
  }
);

var tanPoint3 = board.create(
  "point",
  [
    function () {
      return glider.X() + q2SliderGraph.Value();
    },
    function () {
      return f(glider.X() + q2SliderGraph.Value());
    },
  ],
  {
    size: 2,
    name: "q2",
  }
);
var line = board.create("line", [glider, tanPoint], {
  strokeColor: "#EE964B",
  dash: 2,
  strokeWidth: 3,
});

var line2 = board.create("line", [glider, tanPoint2], {
  strokeColor: "#63C7B2",
  dash: 2,
  strokeWidth: 3,
});

var line3 = board.create("line", [glider, tanPoint3], {
  strokeColor: "#EF9CDA",
  dash: 2,
  strokeWidth: 3,
});
board.unsuspendUpdate();

$(document).ready(() => {
  sliderChanger("q", "qVal", q1, qSliderGraph, board);
  sliderChanger("q2", "q2Val", q2, q2SliderGraph, board);
});
