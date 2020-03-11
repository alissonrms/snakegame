# Snakegame
Snake game created with JavaScript and canvas. 

# Objectives
Learn the JavaScript language and concepts about software architecture, separation of concerns for example

# Code structure
The code is divided into 3 fragments: game.js, renderer.js and keyboardListener.js.
Each JavaScript code represents a development layer and its respective responsibilities.

Game layer: Save the game state and business rules
Renderer layer: Render the game state
Keyboard Listener layer: Listen to all keyboard inputs

To achieve a completely decoupled code, the Observer design pattern and modular JavaScript programming were used.

# Notes
You will need an http server to run the game on localhost, because modular programming was used.
If you try to run on google chrome without the http server, you will encounter the following error: "Access to script at 'file: /// E: /Documents/SnakeGame/game.js' from origin 'null' has been blocked by CORS policy".

An easy solution, if you have node.js installed, run the following commands at the command prompt (Windows):

  $ npm install http-server -g
  
  $ http-server game_directory (Ex: $ http-server E:\Documents\SnakeGame)

