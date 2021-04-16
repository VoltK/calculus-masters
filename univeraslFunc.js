const createBoard = () => {
    return JXG.JSXGraph.initBoard("jxgbox", {
        axis: true,
        boundingbox: [-10, 27, 10, -7],
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
const createPlot = (f) => {
    return board.create("functiongraph", [f], {
        strokeColor: "black",
        strokeWidth: 2,
    });
};

$(window).resize(function() {
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
// var nSlider = document.getElementById("n");
// var noutput = document.getElementById("nVal");
// noutput.innerHTML = nSlider.value;
// nSlider.value = n;
// nSlider.oninput = function () {
//   noutput.innerHTML = this.value;
//   n = this.value;
//   board.fullUpdate();
//   updateSum();
// };

const sliderChanger = (sliderId, displayId, tracker, graphSlider, board, param) => {
    var slider = document.getElementById(sliderId);
    var output = document.getElementById(displayId);
    output.innerHTML = slider.value;
    tracker = graphSlider.Value();
    slider.value = tracker;
    slider.oninput = function() {
        output.innerHTML = this.value;
        graphSlider.setValue(this.value);
        board.fullUpdate();
        param && param();
    };
};