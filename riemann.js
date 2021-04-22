var inputFunction = "sin(x)";
var nOfRect = 10;
var start, end;

const board = createBoard();

const createRiemann = (f) => {
  return board.create(
    "riemannsum",
    [
      f,
      function () {
        return n.Value();
      },
      function () {
        return "left";
      },
      function () {
        return a.Value();
      },
      function () {
        return b.Value();
      },
    ],
    { fillColor: "red", fillOpacity: 0.3, strokeColor: "black" }
  );
};

var a = board.create(
  "slider",
  [
    [1, 4],
    [5, 4],
    [-100, -3, 0],
  ],
  { visible: false }
);

var b = board.create(
  "slider",
  [
    [1, 3],
    [5, 3],
    [0, 2 * Math.PI, 100],
  ],
  { visible: false }
);
var n = board.create(
  "slider",
  [
    [1, 3],
    [5, 3],
    [0, 10, 400],
  ],
  { visible: false }
);
var f = board.jc.snippet(inputFunction, true, "x", false);

var plot = createPlot(f);

var riemann = createRiemann(f);

const updateGraph = () => {
  try {
    f = board.jc.snippet(inputFunction, true, "x", false);
  } catch {}

  board.removeObject(riemann);
  board.removeObject(plot);
  plot = createPlot(f);
  riemann = createRiemann(f);
  board.fullUpdate();
};

const updateSum = () => {
  $("#sum").text(` Sum = 
    ${JXG.Math.Numerics.riemannsum(f, n.Value(), "left", a.Value(), b.Value()).toFixed(4)}`);
};

$(document).ready(function () {
  var mjDisplayBox, mjOutBox;
  MathJax.Hub.Queue(function () {
    mjDisplayBox = MathJax.Hub.getAllJax("math-display")[0];
    mjOutBox = MathJax.Hub.getAllJax("math-output")[0];
  });
  $("#math-input").on("keyup", function (evt) {
    var math = $(this).val();
    inputFunction = math;

    updateGraph();
    $(this).css("color", "black");
    if (math.length > 0) {
      try {
        var tree = MathLex.parse(math),
          latex = MathLex.render(tree, "latex");
        MathJax.Hub.Queue(["Text", mjDisplayBox, latex]);
      } catch (err) {
        $(this).css("color", "red");
      }
    } else {
      MathJax.Hub.Queue(["Text", mjDisplayBox, ""]);
      MathJax.Hub.Queue(["Text", mjOutBox, ""]);
    }
  });
  $("#math-input").val(inputFunction);
  updateSum();
  sliders();
});

const sliders = () => {
  sliderChanger("n", "nVal", nOfRect, n, board, updateSum);

  sliderChanger("start", "sVal", start, a, board, updateSum);

  sliderChanger("end", "eVal", end, b, board, updateSum);
};
