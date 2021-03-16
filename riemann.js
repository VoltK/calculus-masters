var inputFunction = "sin(x)";
var n = 10;
var start;
var end;

const board = JXG.JSXGraph.initBoard("jxgbox", {
  axis: true,
  boundingbox: [-10, 7, 10, -7],
  showCopyright: false,
  pan: {
    enabled: true,
    needShift: false,
  },
});
var f = board.jc.snippet(inputFunction, true, "x", false);

var a = board.create(
  "slider",
  [
    [1, 4],
    [5, 4],
    [-10, -3, 0],
  ],
  { visible: false }
);
var b = board.create(
  "slider",
  [
    [1, 3],
    [5, 3],
    [0, 2 * Math.PI, 10],
  ],
  { visible: false }
);
var plot = board.create(
  "functiongraph",
  [
    f,
    function () {
      return a.Value();
    },
    function () {
      return b.Value();
    },
  ],
  { strokeColor: "black", strokeWidth: 2 }
);

var os = board.create(
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
    function () {
      return document.getElementById("sumtype").value;
    },
  ],
  { fillColor: "red", fillOpacity: 0.3, strokeColor: "black" }
);

var updateGraph = function () {
  f = board.jc.snippet(inputFunction, true, "x", false);
  board.removeObject(os);
  board.removeObject(plot);
  plot = board.create(
    "functiongraph",
    [
      f,
      function () {
        return a.Value();
      },
      function () {
        return b.Value();
      },
    ],
    { strokeColor: "black", strokeWidth: 2 }
  );
  os = board.create(
    "riemannsum",
    [
      f,
      function () {
        return n;
      },
      function () {
        return document.getElementById("sumtype").value;
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

  board.fullUpdate();
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
});

$(window).resize(function () {
  $(".JXG_navigation_button").toArray()[1].click();
});

$(window).on("wheel", function (e) {
  var delta = e.originalEvent.deltaY;
  if (delta > 0) {
    $(".JXG_navigation_button").toArray()[0].click();
  } else {
    $(".JXG_navigation_button").toArray()[2].click();
  }

  return false;
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

var nSlider = document.getElementById("n");
var noutput = document.getElementById("nVal");
noutput.innerHTML = nSlider.value;
nSlider.value = n;
nSlider.oninput = function () {
  noutput.innerHTML = this.value;
  n = this.value;
  board.update();
};

var sSlider = document.getElementById("start");
var sOutput = document.getElementById("sVal");
sOutput.innerHTML = sSlider.value;
sSlider.value = a.Value();
start = a.Value();
sSlider.oninput = function () {
  sOutput.innerHTML = this.value;
  a.setValue(this.value);
  board.fullUpdate();
};

var eSlider = document.getElementById("end");
var eOutput = document.getElementById("eVal");
eOutput.innerHTML = eSlider.value;
eSlider.value = b.Value();
end = b.Value();
eSlider.oninput = function () {
  eOutput.innerHTML = this.value;
  b.setValue(this.value);
  board.fullUpdate();
};
