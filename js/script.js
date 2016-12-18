	$(document).ready(function(){
	//track state of board. 0 = box has not been claimed by a player. 1 = box claimed by 'o'. 2 = box claimed by 'x'.
	var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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
	var playerOneName;
	var playerTwoName;

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

	function nextTurn(playerWent, playerGo){
		//remove class .active on player who just moved
		$(playerWent).removeClass('active');
		//add class active on player whose turn is next
		$(playerGo).addClass('active');
	};

	function whoWon(boxCheck){
		$('#start').after(winView);
		$('#board').hide();

		if(board[boxCheck] === 1){
		$('.screen-win').addClass('screen-win-one');
		$('.player-name').html(playerOneName);
		} else if (board[boxCheck] === 2) {
		$('.screen-win').addClass('screen-win-two');
		$('.player-name').html(playerTwoName);
		} else {
			$('.screen-win').addClass('screen-win-tie');
			$('.message').text("It's a tie!");

		}
	};

	function checkWin(){

			if(board[0] === board[1] && board[1] === board[2] && board[0] !== 0){
				
				whoWon(0);
				
			} else if(board[3] === board[4] && board[4] === board[5] && board[3] !== 0) {
				
				whoWon(3);

			} else if(board[6] === board[7] && board[7] === board[8] && board[6] !== 0) {
				
				whoWon(6);

			} else if(board[0] === board[3] && board[3]=== board[6] && board[0] !== 0) {
				
				whoWon(0);
			
			} else if(board[1] === board[4] && board[4] === board[7] && board[1] !== 0) {
				
				whoWon(1);

			} else if(board[2] === board[5] && board[5] === board[8] && board[2] !== 0) {
				
				whoWon(2);

			} else if(board[0] === board[4] && board[4] === board[8] && board[0] !== 0) {
				
				whoWon(0);

			} else if(board[2] === board[4] && board[4] === board[6] && board[2] !== 0) {
				
				whoWon(2);

			} else if(moves === 9){
				
				whoWon(10); 
			
			} else {
				
				return false;
			
			}
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
		
		board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		turn = 1;
		moves = 0;
	}
	
	function miniMax(){
		
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
		if(turn === 1 && board[boxHovered] === 0){
			$(this).css('background-image', 'url(img/o.svg)');
		
		//if turn variable is not equal to 1, and box not claimed, then display the x svg on mouseover
		} else if(turn === 2 && board[boxHovered] === 0) {
			$(this).css('background-image', 'url(img/x.svg)')
		}

	});

	//click handler for boxes
	$('.box').on('click', function(){
		
		//store index of box clicked
		var boxClicked = $(this).index();

		//if it is 'o' turn, and the boxClicked is not claimed then...
		if(turn === 1 && board[boxClicked] === 0){
			
			//change state of box array to indicate the state of the box clicked. 1 means that the box belongs to 'o'
			board[boxClicked] = 1;

			// add 'o' box-filled-1 class
			$(this).addClass('box-filled-1');
			
			//change turn indicator
			nextTurn('#player1', '#player2');

			//change turn to 'x' turn
			turn = 2;

			//increment the moves variable
			moves++;

			//check for a win or tie
			checkWin();
		
		//if it is 'x' turn, and box not claimed then...
		} else if(turn === 2 && board[boxClicked] === 0){
			
			//change state of board array to indicate the state of box clicked. 2 indicates that the box belongs to 'x'
			board[boxClicked] = 2;

			// add 'o' box-filled-1 class
			$(this).addClass('box-filled-2');
			
			//change turn indicator
			nextTurn('#player2', '#player1');

			//change turn to 'o' turn
			turn = 1;

			//increment the moves variable	
			moves++;

			//check for a win or tie
			checkWin();
		}
	});
});


