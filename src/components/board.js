import React, {Component} from 'react';

const BOARD_HEIGHT = 50;
const BOARD_WIDTH = 50;

export default class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cells: [],
            isPlaying: this.props.isPlaying
        };
    }

    componentWillMount() {
        this.initBoard();
    }

    initBoard() { //clear all cells
        let cells = this.state.cells;
        for (let i = 0; i < BOARD_HEIGHT; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                if (!cells[i]) {
                    cells[i] = [];
                }
                cells[i][j] = false;
            }
        }
        this.setState({cells});
    }

    componentWillReceiveProps(props) { //update state by props
        let cells = this.state.cells;
        this.setState({
            cells,
            isPlaying: props.isPlaying
        })
    }

    animate() { //one iteration of the animation
        let cells = this.state.cells;
        for (let i = 0; i < BOARD_HEIGHT; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                let neighbours = this.countAllNeighbours(i, j);
                let isActive = cells[i][j];
                if (isActive && ((neighbours > 3) || (neighbours < 2) )) {
                    cells[i][j] = false;
                }
                else if (!isActive && neighbours == 3) {
                    cells[i][j] = true;
                }
            }
        }
        this.setState({cells});
    }

    countAllNeighbours(i, j) { //check all the active cells near the current cell
        let counter = 0;
        if (this.state.cells[i - 1] && this.state.cells[i - 1][j]) { // up
            counter++;
        }
        if (this.state.cells[i + 1] && this.state.cells[i + 1][j]) { //down
            counter++;
        }
        if (this.state.cells[i + 1] && this.state.cells[i + 1][j - 1]) { //down left
            counter++;
        }
        if (this.state.cells[i + 1] && this.state.cells[i + 1][j + 1]) { //down right
            counter++;
        }
        if (this.state.cells[i] && this.state.cells[i][j + 1]) { // right
            counter++;
        }
        if (this.state.cells[i] && this.state.cells[i][j - 1]) { //left
            counter++;
        }
        if (this.state.cells[i - 1] && this.state.cells[i - 1][j + 1]) { // up right
            counter++;
        }
        if (this.state.cells[i - 1] && this.state.cells[i - 1][j - 1]) { // up left
            counter++;
        }
        return counter;
    }

    onCellClick(i, j) {
        if (!this.state.isPlaying) {
            let cells = this.state.cells;
            cells[i][j] = !cells[i][j];
            this.setState({cells});
        }
    }

    render() {
        return (
            <table>
                <tbody>
                {
                    this.state.cells.map((row, i) => {
                        return (
                            <tr key={i}>
                                {
                                    row.map((cell, j) => {
                                        return <td
                                            key={i + ";" + j}
                                            className={this.state.cells[i][j] ? "active-cell" : "not-active-cell"}
                                            onClick={this.onCellClick.bind(this, i, j)}></td>;
                                    })
                                }
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>);
    }
}

