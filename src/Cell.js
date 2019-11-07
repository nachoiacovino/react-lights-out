import React, {Component} from 'react'
import "./Cell.css"

class Cell extends Component {

  handleClick = e => {
    this.props.flipCellsAroundMe();
  }

  render() {
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");

    return (
        <div className={classes} onClick={this.handleClick} />
    )
  }
}

export default Cell