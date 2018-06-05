var gameInstance = null;
var gameContainer = null;
var gameCanvas = null;

function handleResize() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  if(gameCanvas != null) {
    var canvasSize = getCanvasSize();
    gameCanvas.width = canvasSize.width;
    gameCanvas.height = canvasSize.height;
  }

  gameContainer.style.height = windowHeight + "px";
}

document.addEventListener("DOMContentLoaded", function(event) {
  gameContainer = document.body.querySelector("#Game");
  window.addEventListener("resize", handleResize);
  handleResize();
});

function handleRuntimeInitialized() {
  gameCanvas = gameInstance.container.querySelector("canvas");
  gameCanvas.style.width = null;
  gameCanvas.style.height = null;
  handleResize();
}

function getCanvasSize() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  return {
    width: windowWidth,
    height: windowHeight
  };
}

function instantiateUnity() {
  var canvasSize = getCanvasSize();

  gameInstance = UnityLoader.instantiate("Game", "Build/Latest.json", {
    width: canvasSize.width,
    height: canvasSize.height,
    margin: 0,
    onProgress: () => {},
    Module: { onRuntimeInitialized: handleRuntimeInitialized }});
}

instantiateUnity();