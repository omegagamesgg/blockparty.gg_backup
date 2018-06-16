import { db } from './firebase';

// Player API

export const doCreatePlayer = (id, playername, email) =>
  db.ref(`players/${id}`).set({ playername, email });

export const onceGetPlayerById = (id) =>
  db.ref(`players/${id}`).once('value');

// Chat Messages API

export const getRecentMessages = () =>
  db.ref('chatMessages').orderByKey().limitToLast(100);

export const doCreateMessage = (sender, message) =>
  db.ref('chatMessages').push({ sender, message });

// Next Game Time API

export const getNextGameTime = () =>
  db.ref('nextGameTime');

// Game State API

export const getGameState = () =>
  db.ref('gameState');

export const getGamePlayerState = (id) =>
  db.ref(`gameState/${id}`);

export const setGamePlayerState = (id, x, y) =>
  db.ref(`gameState/${id}`).set({ x, y });