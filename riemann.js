var inputFunction = "sin(x)";
var n = 10;
var start, end;

const board = createBoard();

const createRiemann = (f) => {
  return board.create(
    "riemannsum",
    [
      f,
      function () {
        return n;
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

var f = board.jc.snippet(inputFunction, true, "x", false);

var plot = createPlot(f);

var riemann = createRiemann(f);

const updateGraph = () => {
  f = board.jc.snippet(inputFunction, true, "x", false);
  board.removeObject(riemann);
  board.removeObject(plot);
  plot = createPlot(f);
  riemann = createRiemann(f);
  board.fullUpdate();
};

const updateSum = () => {
  $("#sum").text(` Sum = 
    ${JXG.Math.Numerics.riemannsum(f, n, "left", a.Value(), b.Value()).toFixed(
      4
    )}`);
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
  var nSlider = document.getElementById("n");
  var noutput = document.getElementById("nVal");
  noutput.innerHTML = nSlider.value;
  nSlider.value = n;
  nSlider.oninput = function () {
    noutput.innerHTML = this.value;
    n = this.value;
    board.fullUpdate();
    updateSum();
  };

  var sSlider = document.getElementById("start");
  var sOutput = document.getElementById("sVal");
  sOutput.innerHTML = sSlider.value;
  start = a.Value();
  sSlider.value = start;
  sSlider.oninput = function () {
    sOutput.innerHTML = this.value;
    a.setValue(this.value);
    board.fullUpdate();
    updateSum();
  };

  var eSlider = document.getElementById("end");
  var eOutput = document.getElementById("eVal");
  eOutput.innerHTML = eSlider.value;
  end = b.Value();
  eSlider.value = end;
  eSlider.oninput = function () {
    eOutput.innerHTML = this.value;
    b.setValue(this.value);
    board.fullUpdate();
    updateSum();
  };
};
