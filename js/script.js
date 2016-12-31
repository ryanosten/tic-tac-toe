	$(document).ready(function(){
	//track state of board. 0 = box has not been claimed by a player. 1 = box claimed by 'o'. 2 = box claimed by 'x'.
	var masterBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	//store variable for winner view to append when someone wins da game
	var winView = '<div class="screen screen-win" id="finish">';
		winView +='<header>';
		winView += '<h1>Tic Tac Toe</h1>';
		winView += '<div class="player-name"></div>';
		winView += '<p class="message">Winner</p>';
		winView += '<a href="#" class="button">New game</a>';
		winView += '</header></div>';

	//keep track of player turns. 0 = 'o' and 1 = 'x'
	var turn = 1;

	//keep track of # of moves made
	var moves = 0;
	
	var aiGame = false;
	var aiScore = 0;
	var playerOneName;
	var playerTwoName;
	var clone_winner;

	var startGame = {
		
		gameType: function(){
			
			var playComputer = prompt('Do you want to play against the computer? Yes or no?');

			if (playComputer.toLowerCase() !== 'yes' && playComputer.toLowerCase() !== 'no'){
				
				alert('You must choose if you want to play against computer. Please respond Yes or No.');
				
				startGame.gameType();
			
			} else if (playComputer.toLowerCase() === 'yes'){
				
				startGame.aiGame();
			
			} else {
				
				startGame.humanGame();
			}
		},

		humanGame: function(){
			aiGame = false;
			playerOneName = prompt('Player One, please enter your name');
			playerTwoName = prompt('Player Two, please enter your name');
			
		},

		aiGame: function(){
			aiGame = true;
			playerOneName = prompt('Player One, please enter your name');
			playerTwoName = 'Tic Tac Bot';
		}
	}

	function aiGo(){
		//get the current boardstate
		var cloneBoard = [1,0,2,2,0,0,2,1,1];
		var scores_list = [];
		var moves = [];
		var currentMove;
		var max_score, min_score;
		var max_score_index, min_score_index
		var playerTurn = 2;

		var stateList =[];
		var newState;
		//create an array of possible new board states
		//var boardStates = [];


		for(i = 0; i < cloneBoard.length; i++){
			//create the boardstate
			newState = cloneBoard.slice(0);
			
			//if space is unclaimed
			if (newState[i] === 0){
				
				//make a move to the empty space
				newState[i] = 2;
				
				//store the new state after the move
				stateList.push(newState);				

				//store the current move
				currentMove = [i];
				
				//push the move to the moves list
				moves.push(currentMove);
				
				//check if its terminal
				//minimax(newState, 2);
				console.log('99 ran');
			}
		
		}		
		
		console.log(stateList);

		for(h = 0; h < stateList.length; h++){
				console.log('loop ran to get minimax on move ' + h);
				var minimax = miniMax(stateList[h], playerTurn);
				console.log('108 ran');
				console.log('minimax returned', minimax);
				scores_list.push(minimax);
				console.log('110 ran');
		}

		function miniMax(state, player){
			var playersTurn = player;
			var local_statelist = [];
			var local_scores = [];

			console.log('running minimax on ', state);
			//console.log(player);

			if (player % 2 === 0 && checkWin(state, true) === true){
					
					console.log('x wins, returned 10');
					return 10;


			} else if (player % 2 !== 0 && checkWin(state, true) === true){
					console.log('o wins, returned -10')
					return -10;

			} else {
					//in this state, game is not over, so let's create new states
					for(i = 0; i < state.length; i++){
						console.log("create new states and loop through");
						//store a new state
						newState = state.slice(0);
						//if space is is empty
						if (newState[i] === 0){
							
							//and if player 2 just went 
							if(player % 2 === 0){
								//make player 1 move
								newState[i] = 1;
							
							//if player 1 just went
							} else if (player % 2 !== 0) {
								//make player 2 move
								newState[i] = 2;
								//change player state to 2 because two just moved
							
							}
							console.log('newState is ', newState);
							 
							local_statelist.push(newState);
							console.log('local_statelist is ', local_statelist)
						}
					}

					//change playersTurn to player who just went to pass that into minimax
					playersTurn ++;

					for (j = 0; j < local_statelist.length; j++){
						console.log('run minimax on new states')
						var minimax = miniMax(local_statelist[j], playersTurn);
						console.log('push minimax to new local_scores');
						local_scores.push(minimax);
						console.log('local scores array is ', local_scores);
				}
				//scores_list.push(local_scores);
				//console.log(scores_list)
				//console.log(moves)
				
			}
		//check if state is terminal
			//if yes, return the utility and store it in an array
			//if no, check if its max or mins turn, if it is max turn, then return the maximum for all possible actions (maximum for being in state s and taking action a)
		}

	};




	function nextTurn(playerWent, playerGo){
		//remove class .active on player who just moved
		$(playerWent).removeClass('active');
		//add class active on player whose turn is next
		$(playerGo).addClass('active');
	};

	function whoWon(boxCheck){
			$('#start').after(winView);
			$('#board').hide();

			if(masterBoard[boxCheck] === 1){
				$('.screen-win').addClass('screen-win-one');
				$('.player-name').html(playerOneName);
			} else if (masterBoard[boxCheck] === 2) {
				$('.screen-win').addClass('screen-win-two');
				$('.player-name').html(playerTwoName);
			} else {
				$('.screen-win').addClass('screen-win-tie');
				$('.message').text("It's a tie!");
			}
		};


	function checkWin(whichBoard, aiSimulation){

			console.log('checking whoWon on', whichBoard);

			if(whichBoard[0] === whichBoard[1] && whichBoard[1] === whichBoard[2] && whichBoard[0] !== 0){
				
				console.log('there is a winner')
				if(aiSimulation === false){
					whoWon(0);
				}
				
				return true;
				
			} else if(whichBoard[3] === whichBoard[4] && whichBoard[4] === whichBoard[5] && whichBoard[3] !== 0) {

				console.log('there is a winner')

				if(aiSimulation === false){
					whoWon(3);
				}
				return true;

			} else if(whichBoard[6] === whichBoard[7] && whichBoard[7] === whichBoard[8] && whichBoard[6] !== 0) {
				
				console.log('there is a winner')

				if(aiSimulation === false){
					whoWon(6);
				}
				return true;

			} else if(whichBoard[0] === whichBoard[3] && whichBoard[3]=== whichBoard[6] && whichBoard[0] !== 0) {
				
				console.log('there is a winner')

				if(aiSimulation === false){
					whoWon(0);
				}
				return true;
			
			} else if(whichBoard[1] === whichBoard[4] && whichBoard[4] === whichBoard[7] && whichBoard[1] !== 0) {

				console.log('there is a winner')

				if(aiSimulation === false){
					whoWon(1);
				}
				return true;

			} else if(whichBoard[2] === whichBoard[5] && whichBoard[5] === whichBoard[8] && whichBoard[2] !== 0) {
				
				console.log('there is a winner')


				if(aiSimulation === false){
					whoWon(2);
				}
				return true;

			} else if(whichBoard[0] === whichBoard[4] && whichBoard[4] === whichBoard[8] && whichBoard[0] !== 0) {
				
				console.log('there is a winner')

				if(aiSimulation === false){
					whoWon(0);
				}
				return true;

			} else if(whichBoard[2] === whichBoard[4] && whichBoard[4] === whichBoard[6] && whichBoard[2] !== 0) {
				
				console.log('there is a winner')

				if(aiSimulation === false){
					whoWon(2);
				}
				return true;

				//clone still has an issue with ties
			} else if(aiSimulation === false && moves === 9){

				console.log('its a tie')

				whoWon(10);
				return true; 
			
			} 

			console.log('there is no winner');
	}
	
	function startNextGame(){
		$('.box').each(function(){
			$(this).removeClass('box-filled-1 box-filled-2');
			$(this).removeAttr('style');
		});

		$('#player1').addClass('active');
		$('#player2').removeClass('active');

		startGame.gameType();

		$('.screen-win').remove();
		$('#board').show();
		$('#playerOneName').html(playerOneName);
		$('#playerTwoName').html(playerTwoName);
		
		masterBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		turn = 1;
		moves = 0;
	}

	//click handler for start new game after first game completed. We add it here bc element binding to isn't added to DOM until 1st game ends.
	$(document).on('click', '#finish a.button', function(){
			startNextGame();
		});

	//click handler on 'start game' button. If clicked, then start game!
	$('.screen-start .button').on('click', function(){
		
		startGame.gameType();
		
		$('#playerOneName').html(playerOneName);
		$('#playerTwoName').html(playerTwoName);

		//hide the start screen
		$('.screen-start').hide();
			
		//remove the 'hide' class on board element to display the game board
		$('.board').removeClass('hide');

		//indicate in UI that first turn belongs to player 1
		$('#player1').addClass('active');
	
	});
	
	//mouseover handler for boxes
	$('.box').on('mouseover', function(){
		
		var boxHovered = $(this).index()

		//remove all hover state background images
		$('.box').css('background-image', '');
		
		//if turn variable is equal to 1, and box not claimed, then display 'o' svg on mouseover
		if(turn === 1 && masterBoard[boxHovered] === 0){
			$(this).css('background-image', 'url(img/o.svg)');
		
		//if turn variable is not equal to 1, and box not claimed, then display the x svg on mouseover
		} else if(turn === 2 && masterBoard[boxHovered] === 0) {
			$(this).css('background-image', 'url(img/x.svg)')
		}

	});

	//click handler for boxes
	$('.box').on('click', function(){
		
		//store index of box clicked
		var boxClicked = $(this).index();

		//if it is 'o' turn, and the boxClicked is not claimed then...
		if(turn === 1 && masterBoard[boxClicked] === 0){
			
			//change state of box array to indicate the state of the box clicked. 1 means that the box belongs to 'o'
			masterBoard[boxClicked] = 1;

			// add 'o' box-filled-1 class
			$(this).addClass('box-filled-1');
			
			//change turn indicator
			nextTurn('#player1', '#player2');

			//change turn to 'x' turn
			turn = 2;

			//increment the moves variable
			moves++;

			//check for a win or tie
			checkWin(masterBoard, false);

			//if game is against the ai, initiate the ai turn
			if(aiGame === true){
				aiGo();
				turn = 1;
			}
		
		//if it is 'x' turn, and box not claimed then...
		} else if(turn === 2 && masterBoard[boxClicked] === 0){
			
			//change state of board array to indicate the state of box clicked. 2 indicates that the box belongs to 'x'
			masterBoard[boxClicked] = 2;

			// add 'o' box-filled-1 class
			$(this).addClass('box-filled-2');
			
			//change turn indicator
			nextTurn('#player2', '#player1');

			//change turn to 'o' turn
			turn = 1;

			//increment the moves variable	
			moves++;

			//check for a win or tie
			checkWin(masterBoard, false);
		}
	});
});


