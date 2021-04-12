const board = createBoard();

board.suspendUpdate();

var f = board.jc.snippet("sin(x)", true, "x", false);

var plot = createPlot(f);

var glider = board.create("glider", [0, 0, plot], { size: 5, name: "" });

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
  { size: 1, name: "P" }
);

var tanPoint2 = board.create(
  "point",
  [
    function () {
      return glider.X() + 3;
    },
    function () {
      return f(glider.X() + 3);
    },
  ],
  { size: 1, name: "Q1" }
);

var line = board.create("line", [glider, tanPoint], {
  strokeColor: "#ff0000",
  dash: 2,
});

var line2 = board.create("line", [glider, tanPoint2], {
  strokeColor: "#0000ff",
  dash: 2,
});
board.unsuspendUpdate();
