import { useState } from "react"
import Board from "./Board"
export default function Game() {

    // let [cells,setCells] = useState() 
    const [gameHistory, setGameHistory] = useState([new Array(9).fill(null)]);
    const [nextPlayerX, setNextPlayerX] = useState(true)
    // const [status,setStatus] = useState(`Next Player: X` )
    const [moveNumber, setMoveNumber] = useState(0)
    const winner = checkWin(gameHistory[moveNumber]);


    function handleClick(index) {
        // setGameHistory(gameHistory.slice(0,moveNumber+1))
        const currentInHistory = gameHistory.slice(0, moveNumber + 1);
        const current = currentInHistory[moveNumber];
        let cellsCopy = current.slice();
        if ( winner || cellsCopy[index]) {
            return;
        }
        cellsCopy[index] = nextPlayerX ? "X" : "O";

        setGameHistory(currentInHistory.concat([cellsCopy]))
        setMoveNumber(currentInHistory.length)
        setNextPlayerX(!nextPlayerX);
        

    }

    function historyMove(move) {
        setMoveNumber(move);
        setNextPlayerX(move % 2 === 0)
        
    }


    
    function history(){
    return    gameHistory.map((item, index) => {
            const status = index > 0 ? `Move: ${index}` : "Goto Start";
            return (
                <li key={index}>
                    <button onClick={() => historyMove(index)}>{status}</button>
                </li>
            )
                    
        })
    }



    return (
        <div className="game">
            <p>{winner ? "Winner: " + winner : "Next Player: " +(nextPlayerX ? "X" : "O")} </p>
            <div class="flex">
            <Board cells={gameHistory[moveNumber]}  handleClick={handleClick} />
            <div className="game-info">
                <ul>{history()}</ul>
            </div>
            </div>
        </div>

    )


    function checkWin(squares) {
        const indexsLookup = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < indexsLookup.length; i++) {
            const [a, b, c] = indexsLookup[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}