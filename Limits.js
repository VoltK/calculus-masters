var eq = ["-x^3-4*x^2+4*x+16", "tan(x)", "x+5"];
var ef = 0;
var piece;
var l = 0;

const board = createBoard();

var f = board.jc.snippet(eq[ef], true, "x", false);

var plot = createPlot(f);

var point = board.create("point", [l, l], { name: "", fixed: true, size: 5 });

const updateGraph = () => {
  f = board.jc.snippet(eq[ef], true, "x", false);
  board.removeObject(plot);
  if (ef > 1) {
    pieceWise();
  } else {
    board.removeObject(piece);
    plot = createPlot(f);
    $("#math-display2").css("display", "none");
    $("#math-display3").css("display", "none");
    $("#math-display1").css("display", "block");
  }

  board.fullUpdate();
};

const limit = () => {
  board.removeObject(point);
  if (ef > 1) {
    var y = 0;
    if (Number(l) >= 2) y = plot.Y(Number(l));
    else if (Number(l) < 2) y = piece.Y(Number(l));
    point = board.create("point", [Number(l), y], {
      name: "",
      fixed: true,
    });
    $("#limit").text(` Limit = ${Number(l) == 2 ? "DNE" : y}`);
  } else {
    point = board.create("point", [Number(l), plot.Y(Number(l))], {
      name: "",
      fixed: true,
    });
    $("#limit").text(
      ` Limit = ${plot.Y(Number(l)) == Infinity ? "DNE" : plot.Y(Number(l))}`
    );
  }
};

$(document).ready(function () {
  var lSlider = document.getElementById("l");
  var loutput = document.getElementById("lVal");
  loutput.innerHTML = lSlider.value;
  lSlider.value = l;
  lSlider.oninput = function () {
    loutput.innerHTML = this.value;
    l = this.value;
    limit();
  };
  limit();
});

const updateFunction = (test) => {
  ef = Number(test.value - 1);
  console.log(ef);
  updateGraph();
  limit();
  updateLatex();
};

const updateLatex = () => {
  var mjDisplayBox = MathJax.Hub.getAllJax("math-display")[0];
  try {
    var tree = MathLex.parse(eq[ef]),
      latex = MathLex.render(tree, "latex");
    MathJax.Hub.Queue(["Text", mjDisplayBox, latex]);
  } catch (err) {
    console.log(err);
  }
};

const pieceWise = () => {
  plot = board.create(
    "functiongraph",
    [
      function (x) {
        return x + 5;
      },
      2,
      99999,
    ],
    {
      strokeColor: "black",
      strokeWidth: 2,
    }
  );
  piece = board.create(
    "functiongraph",
    [
      function (x) {
        return -(1 / 2) * x + 3;
      },
      1,
      -99999,
    ],
    {
      strokeColor: "red",
      strokeWidth: 2,
    }
  );
  $("#math-display1").css("display", "none");
  $("#math-display2").css("display", "block");
  $("#math-display3").css("display", "block");
};
