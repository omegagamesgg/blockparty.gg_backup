var pregameDuration = 5000;
var gameDuration = 120000;
var postgameDuration = 30000;
var gameState = {
  active: false,
  gameEndTime: null,
  nextGameTime: new Date(Date.now() + pregameDuration)
};

var logGameState = () => {
  console.log(`gameState = { active: ${gameState.active}, gameEndTime: ${gameState.gameEndTime}, nextGameTime: ${gameState.nextGameTime} }`);
};

// Initialize the game state
var initialize = () => {
  console.log('initializing game state');
  setTimeout(() => { startNextGame() }, pregameDuration);

  logGameState();
};

var startNextGame = () => {
  gameState.active = true;
  gameState.gameEndTime = new Date(Date.now() + gameDuration);
  gameState.nextGameTime = null;
  logGameState();
  setTimeout(() => { endGame(); }, gameDuration);
};

var endGame = () => {
  gameState.active = false;
  gameState.gameEndTime = null;
  gameState.nextGameTime = new Date(Date.now() + postgameDuration);
  logGameState();
  setTimeout(() => { startNextGame(); }, postgameDuration);
}

exports.gameState = gameState;
exports.initialize = initialize;
exports.endGame = endGame;