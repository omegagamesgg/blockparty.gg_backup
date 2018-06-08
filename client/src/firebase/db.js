import { db } from './firebase';

// Player API

export const doCreatePlayer = (id, playername, email) =>
  db.ref(`players/${id}`).set({ playername, email });

export const onceGetPlayers = () =>
  db.ref('players').once('value');