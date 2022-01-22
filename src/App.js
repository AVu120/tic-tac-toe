import './App.css';
import {useEffect, useState} from 'react';

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const emptyGameState = Array.from({length: 9}).fill(null);

const Cross = () => <span className="cross">&#10060;</span>;
const Circle = () => <span className="circle">&#9675;</span>

function App() {
  const [gameState, setGameState] = useState(emptyGameState);
  const [playerTurn, setPlayerTurn] = useState("cross");
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  const pickCell = (pickedIndex) => {
    if (!isGameOver)  {
    if (gameState[pickedIndex]) return alert("You must pick an empty cell!")
    setGameState(currentGameState => {
      const updatedGameState = currentGameState.map((cell,index) => index === pickedIndex ? playerTurn : cell)
      return updatedGameState;
    })
  }
  }

  const checkWinner = () => {
      const winner = winningCombinations.find(combination => {
        return combination.every(index => gameState[index]) && gameState[combination[0]] === gameState[combination[1]] && gameState[combination[1]] === gameState[combination[2]]
      })

      if (winner) {
      setWinner(playerTurn);
      return setIsGameOver(true);
      }

      if (gameState.every(cell => cell)) {
        return setIsGameOver(true);
      }

      setPlayerTurn(currentPlayerTurn => currentPlayerTurn === "cross" ? "circle" : "cross");
  }  

  const restartGame = () => {
    setIsGameOver(false);
    setGameState(emptyGameState);
    setPlayerTurn("cross");
    setWinner("");
  }

  useEffect(() => {
    checkWinner();
  }, [gameState]);

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      {isGameOver ? winner? <p>Congratulations!!! The game was won by {playerTurn === "cross" ? <Cross/> : <Circle/>}.</p> : <p>The game is tied!</p>:<p><span>It is currently </span>{playerTurn === "cross" ? <Cross/> : <Circle/>}<span> 's turn!</span></p>}
      <section>
        {gameState.map((cellContent, cellIndex) => 
          <td className={isGameOver ? "gameOver" : "gameActive"}onClick={() => pickCell(cellIndex)}>{cellContent ? 
            cellContent === "cross" ? <Cross/> : <Circle/>
            : ""}</td>
        )}
      </section>
      {isGameOver && <button onClick={() => restartGame()}>Play again</button>}
    </div>
  );
}

export default App;
