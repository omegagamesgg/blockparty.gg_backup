var gameState = {
  active: false,
  gameEndTime: null,
  nextGameTime: null
};

var getGameState = () => {
  var url = process.env.NODE_ENV === 'production' ? 'https://blockpartygg.herokuapp.com/' : 'http://localhost:5000/';
  var api = 'games/now';
  fetch(url + api).then(response => response.json()).then(data => {
    gameState.active = data.active;
    gameState.gameEndTime = new Date(data.gameEndTime);
    gameState.nextGameTime = new Date(data.nextGameTime);
    if(gameState.active && gameState.gameEndTime != null) {
      setTimeout(() => { getGameState(); }, gameState.gameEndTime.getTime() - Date.now());
    }
    else if(!gameState.active && gameState.nextGameTime != null) {
      setTimeout(() => { getGameState(); }, gameState.nextGameTime.getTime() - Date.now());
    }
  });
}

export {
  gameState,
  getGameState
}