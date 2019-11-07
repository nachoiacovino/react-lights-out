import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25
  }

  state = {
    hasWon: false,
    board: this.createBoard()
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  createBoard() {
    let board = []

    for (let y = 0; y < this.props.nRows; y++) {
      let row = []
      for (let x = 0; x < this.props.nCols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }

    return board
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround = coord => {
    console.log("hello", coord)
    let {nCols, nRows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number)

    const flipCell = (y, x) => {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x]
      }
    }

    flipCell(y,x)
    flipCell(y,x-1)
    flipCell(y,x+1)
    flipCell(y-1,x)
    flipCell(y+1,x)

    let hasWon = board.every(row => row.every(cell => !cell))

    this.setState({board, hasWon})
  }

  makeTable = _ => {
    let tblBoard = []
    for(let y = 0; y < this.props.nRows; y++) {
      let row = []
      for (let x = 0; x < this.props.nCols; x++) {
        let coord = `${y}-${x}`
        row.push(<Cell key={coord} isLit={this.state.board[y][x]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />)
      }
      tblBoard.push(row)
    }
    return tblBoard
  }

  render() {
    return (  
        <div>
          {this.state.hasWon ? (
            <div class="Board-container">
              <div className="Board-title Board-winner">
                <div className="neon-orange">You</div>
                <div className="neon-blue">Win</div>
              </div>
            </div>
          ) :
          <div class="Board-container">
            <div className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out</div>
            </div>
            <div className="Board">
              {this.makeTable()}
            </div>
          </div>
        }
        </div>
    )
  }
}

export default Board
