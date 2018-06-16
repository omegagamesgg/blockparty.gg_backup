# Welcome to the party!

www.blockparty.gg

Block Party is a persistent, connected world of online games played on the web and phone. Players create an identity for themselves that competes and cooperates across games, gaining prestige and achievements that are tracked across the entire world.

# Product Roadmap
Our initial goal is to carry out a technical spike on the infrastructure required to support the online service and web client necessary to prove out the core engagement loop. Afterwards, focus will be on iterating on the core prototype to discover a mechanic that is fun, usable, viable, and sustainable. Once product-market fit is validated with a core audience, we will focus on growing the playerbase and scaling the service to accommodate broader engagement (mobile clients will be added here or possibly in th previous phase). As we reach scale, we will focus on monetizing the product to drive further growth.

# Engineering
Block Party is currently made up of three major components:
* The front-end client providing the user experience of the world's lobby and game. It's currently a React website. Games will be written in Phaser. Mobile clients will tentatively be written in React Native to maximize code sharing.
* The back-end server providing the game server logic and serving the web client. It's a Node.JS / Express web app hosted on Heroku.
* The data persistence and communication layer storing game and user authentication state. It's a Firebase project. Firebase's Real-time Database will be used for state synchronization between clients and server.

# Design
Block Party is designed to be an engaging, accessible experience that anyone can jump in and out of with ease. The lobby should feel like an active hub of activity where players can talk about recent and upcoming games, arrange plans, and otherwise connect with others. Games should be easy to learn yet have plenty of room for depth of mastery, thrilling to play over the cours of a few minutes, and fundamentally multiplayer experiences. Inspiration should be drawn from games like Mario Party, Wordament, HQ Trivia, Tetris Attack, Puzzle Fighter, Smash Bros, Candy Crush, Clash Royale, etc. Global leaderboards should provide a sense of accomplishment and goals that keeps plays returning to the game. Other metagame systems like leveling, currency, unlockable content, avatar personalization, clans/guilds/clubs should create further stickiness that keeps players coming back.

# Business
Block Party will need to be able to operate sustainably and provide room for monetization once product-market fit and scale are achieved. For now, we will focus on "finding the fun", but we will give consideration to elements of the world and games that may lend to monetization. For instance, we will experiment with advertising breaks in between games. We will look for opportunities to offer sponsored prizes for leaderboard achievements. We will experiement with paid unlockable cosmetic content. Additionally, as we enter later stages of growth, we will look for opportunites to onboard 3rd party developers to create games and share in-game revenue.
