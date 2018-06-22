import { database } from './firebase';

// Player API

export const createPlayer = (id, name) =>
  database.ref(`players/${id}`).set({ name });

export const getPlayer = (id) =>
  database.ref(`players/${id}`).once('value');

export const updatePlayer = (id, name) =>
  database.ref(`players/${id}`).set({ name });

// Chat Messages API

export const createChatMessage = (senderId, message) =>
  database.ref('chatMessages').push({ senderId, message });

export const getRecentChatMessages = () =>
  database.ref('chatMessages').orderByKey().limitToLast(100);

// Next Game Time API

export const getNextGameTime = () =>
  database.ref('nextGameTime');

// Game State API

export const getGameState = () =>
  database.ref('gameState');

export const getGamePlayerState = (id) =>
  database.ref(`gameState/${id}`);

export const setGamePlayerState = (id, x, y) =>
  database.ref(`gameState/${id}`).set({ x, y });

export const getClickyRaceGameState = () =>
  database.ref('games/clickyRace/gameState');