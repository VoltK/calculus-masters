var inputFunction = "1/x";
var l = 1;
const createBoard = () => {
  return JXG.JSXGraph.initBoard("jxgbox", {
    axis: true,
    boundingbox: [-10, 7, 10, -7],
    showCopyright: false,
    pan: {
      enabled: true,
      needShift: false,
    },
    zoom: {
      factorX: 1.25,
      factorY: 1.25,
      wheel: true,
      needShift: true,
      min: 0.001,
      max: 1000.0,
      pinchHorizontal: true,
      pinchVertical: true,
      pinchSensitivity: 7,
    },
  });
};
const board = createBoard();
const createPlot = (f) => {
  return board.create("functiongraph", [f], {
    strokeColor: "black",
    strokeWidth: 2,
  });
};
var f = board.jc.snippet(inputFunction, true, "x", false);
var plot = createPlot(f);
var point = board.create("point", [l, l], { name: "", fixed: true });

const updateGraph = () => {
  f = board.jc.snippet(inputFunction, true, "x", false);
  board.removeObject(plot);
  plot = createPlot(f);
  board.fullUpdate();
};

const limit = () => {
  $("#limit").text(` Limit = ${plot.Y(Number(l))}`);
  board.removeObject(point);
  var x = plot.Y(Number(l)) == Infinity ? Number(l) : plot.Y(Number(l));
  point = board.create("point", [x, Number(l)], { name: "", fixed: true });
};

$(document).ready(function () {
  var mjDisplayBox, mjOutBox;

  MathJax.Hub.Queue(function () {
    mjDisplayBox = MathJax.Hub.getAllJax("math-display")[0];
    mjOutBox = MathJax.Hub.getAllJax("math-output")[0];
  });

  $("#math-input").on("keyup", function (evt) {
    console.log(evt);
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

$(window).resize(function () {
  if ($(this).width() <= 1000) {
    $("#jxgbox").css("height", "60vh");
  } else $("#jxgbox").css("height", "90vh");
  $(".JXG_navigation_button").toArray()[1].click();
});

$(document).keydown((e) => {
  switch (e.key) {
    case "ArrowLeft":
      $(".JXG_navigation_button").toArray()[3].click();
      break;
    case "ArrowRight":
      $(".JXG_navigation_button").toArray()[6].click();
      break;
    case "ArrowUp":
      $(".JXG_navigation_button").toArray()[5].click();
      break;
    case "ArrowDown":
      $(".JXG_navigation_button").toArray()[4].click();
      break;
  }
});
