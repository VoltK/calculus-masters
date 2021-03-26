var inputFunction = "sin(x)";

const board = JXG.JSXGraph.initBoard("jxgbox", {
  boundingbox: [-10, 10, 10, -10],
  axis: true,
  showCopyright: false,
  pan: {
    enabled: true,
    needShift: false,
  },
});

var f = board.jc.snippet("1/x", true, "x", false);

var plot = board.create("functiongraph", [f], {
  strokeColor: "black",
  strokeWidth: 2,
});

board.unsuspendUpdate();

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
