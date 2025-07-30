let board = [
    [' '],[' '],[' '],
    [' '],[' '],[' '],
    [' '],[' '],[' ']
];
let currentPlayer = 'X';
let hasWinner = false;
let tie = false;
let moves = 0;
let xWin = 0;
let xLose = 0;
let oWin = 0;
let oLose = 0;

function printBoard(){

    //   console.log(`

    //   Current player: ${player}

    //   Tic Tac Toe

    //   ${board[0]} | ${board[1]} | ${board[2]}
    //  -----------
    //   ${board[3]} | ${board[4]} | ${board[5]}
    //  -----------
    //   ${board[6]} | ${board[7]} | ${board[8]}
    //   `);

  let boardHTML = '';
  for(let i = 1; i <= board.length; i++){
    boardHTML += `
    <div class="col"><div class="box"><div class="box-content box-${i}" data-box="${i-1}"></div></div></div>
    `;
  }

  document.querySelector('.row')
    .innerHTML = boardHTML;

}

function printPlayers(){
  document.querySelector('.players')
      .innerHTML = `
    <h6>Player X Wins: ${xWin} Lose: ${xLose}</h6>
    <h6 class="mb-5">Player O Wins: ${oWin} Lose: ${oLose}</h6>
    `;
}

function printPlayerTurnHeader(move){
  if(move > 8){
    document.querySelector('.playerTurn-header')
    .innerHTML = `
    <h4>Tied!</h4>
  `;
  }else{
    document.querySelector('.playerTurn-header')
    .innerHTML = `
    <h4>Player: ${currentPlayer} turn</h4>
  `;
  }
}

function printWinner(player){
    document.querySelector('.playerTurn-header')
    .innerHTML = `
    <h4>Player ${player} wins!</h4>
  `;
}

printPlayers();
printBoard();
printPlayerTurnHeader(moves);

function checkWinner(board, player) {
    const winCombos = [
        [0,1,2], //Row
        [3,4,5],
        [6,7,8],
    
        [0,3,6], //Column
        [1,4,7],
        [2,5,8],
    
        [0,4,8], //Diagonal
        [2,4,6]
    ];

    let win = false;

    winCombos.forEach((combo) => {
     const [a,b,c] = combo;
     if(board[a] === player && board[b] === player && board[c] === player){
        win = true;
     }
    });

    return win;
  }

// function makeMove(board, position, player){
//   // makeMove(board, position, player)
//   // if (board[position] == ' ') {
//   //   board[position] = player;
//   //   return true;
//   // } else {
//   //   console.log("Invalid move! Try again.");
//   //   return false;
//   // }
// }

// while(moves < 9){
//   printBoard(currentPlayer);
// let move = Number(prompt('Enter a move (0 - 8): '));
//   // if(currentPlayer === ''){
//   //   currentPlayer = player1;
//   // }
//   if(makeMove(board, move, currentPlayer)){

//     moves++;

//     if(checkWinner(board, currentPlayer)){

//       printBoard(currentPlayer);

//       console.log(`Player ${currentPlayer} wins!`);
//       break;
//     }

//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

//   }

//   if(moves === 9){
//     printBoard(currentPlayer);
//     console.log('Its a draw!');
//   }
// }

document.querySelectorAll('.box-content')
    .forEach((element) => {
      element.addEventListener('click', () => {
        if (element.innerHTML === '' && !hasWinner && moves < 9 && !tie){
          moves++;
          element.innerHTML = currentPlayer;
          let position = element.getAttribute('data-box');

          board[position] = currentPlayer;
         
          if(checkWinner(board, currentPlayer)){
            hasWinner = true;

            if(currentPlayer === 'X'){
              xWin++;
              oLose++;
              printPlayers();
            }
            else{
              xLose++;
              oWin++;
              printPlayers();
            }

            printWinner(currentPlayer);
            console.log(`PLayer ${currentPlayer} win!`);
            console.log(board);
          }
          else if(moves > 8){
            tie = true;
            console.log("Tie!");
            printPlayerTurnHeader(moves);
          }
          else{
            
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            printPlayerTurnHeader(moves);
          }
          
          
        }
        else{
          console.log("Invalid move! Try again.");
        }
      });
});

// function gamePlay(move){
//   while(moves < 9){

//       if(makeMove(board, move, currentPlayer)){
    
//         moves++;
    
//         if(checkWinner(board, currentPlayer)){
    
//           printBoard(currentPlayer);
    
//           console.log(`Player ${currentPlayer} wins!`);
//           break;
//         }
    
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//       }
//       if(moves === 8){
//         printBoard(currentPlayer);
//         console.log('Its a draw!');
//       }
//     }
// }

function resetGame(){
  const boxContents = document.querySelectorAll('.box-content')
  boxContents.forEach((element) => {
    element.innerHTML = '';
    currentPlayer = 'X';
  });
  hasWinner = false;
  tie = false;
  board = [
    [' '],[' '],[' '],
    [' '],[' '],[' '],
    [' '],[' '],[' ']
];
  moves = 0;
  printPlayerTurnHeader(moves);
  console.log('cleared');
}

