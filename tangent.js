const board = createBoard();
var q = 0;
board.suspendUpdate();




var f = board.jc.snippet('function(x) { return x * x * x - 4 * x * x + 4 * x + 16; }', false, "x", false);

var qSliderGraph = board.create(
    "slider", [
        [1, 4],
        [5, 4],
        [0, 0, 5],
    ], { visible: false }
);
var plot = createPlot(f);

var glider = board.create("glider", [0, 0, plot], { size: 5, name: "" });

var tanPoint = board.create(
    "point", [
        function() {
            return glider.X() + 0.0001;
        },
        function() {
            return f(glider.X() + 0.0001);
        },
    ], { size: 1, name: "p" }
);

var tanPoint2 = board.create(
    "point", [
        function() {
            return glider.X() + qSliderGraph.Value();
        },
        function() {
            return f(glider.X() + qSliderGraph.Value());
        },
    ], { size: 3, name: "q" }
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

$(document).ready(() => {
    sliderChanger("q", "qVal", q, qSliderGraph, board);
});