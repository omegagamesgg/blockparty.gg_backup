var gameState = {
  active: false,
  gameId: null,
  gameType: null,
  startTime: null,
  nextGameTime: new Date(Date.now() + timeToFirstGame)
};

var timeToFirstGame = 5000;
var nextGameId = 0;
var nextGameDelay = 5000;

var logGameState = () => {
  console.log(`gameState = { active: ${gameState.active}, gameId: ${gameState.gameId}, gameType: ${gameState.gameType}, startTime: ${gameState.startTime}, nextGameTime: ${gameState.nextGameTime} }`);
};

// Initialize the game state
var initialize = () => {
  console.log('initializing game state');
  setTimeout(() => { startNextGame() }, timeToFirstGame);

  logGameState();
};

var startNextGame = () => {
  gameState.active = true;
  gameState.gameId = nextGameId++;
  gameState.gameType = "clickyRace";
  gameState.startTime = gameState.nextGameTime;
  gameState.nextGameTime = null;
  logGameState();
  setTimeout(() => { endGame(); }, 5000);
};

var endGame = () => {
  gameState.active = false;
  gameState.gameId = null;
  gameState.gameType = null;
  gameState.startTime = null;
  gameState.nextGameTime = new Date(Date.now() + nextGameDelay);
  logGameState();
  setTimeout(() => { startNextGame(); }, nextGameDelay);
}

exports.gameState = gameState;
exports.initialize = initialize;
exports.endGame = endGame;