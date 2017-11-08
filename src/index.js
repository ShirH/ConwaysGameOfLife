import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            intervalId: 0
        };
    }

    onClick() { //on start or pause click
        if (!this.state.isPlaying) {
            this.startGame();
        } else {
            this.cancelGame();
        }
    }

    startGame() {
        let intervalId = setInterval(this.board.animate.bind(this.board), 500); //start animation
        this.setState({isPlaying: true, intervalId});
    }

    cancelGame() {
        this.setState({isPlaying: false});
        clearInterval(this.state.intervalId); //cancel animation
    }

    onClearClick() {
        this.board.initBoard();
        this.setState({isPlaying: false});
        clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <div>
                <h3>Conway's Game of Life</h3>
                <div class="btn-group">
                    <button type="submit" className="btn btn-lg btn-secondary"
                            onClick={this.onClick.bind(this)}>
                        {this.state.isPlaying ? "Pause" : "Play"}
                    </button>
                    <button type="submit" className="btn btn-lg btn-secondary" onClick={this.onClearClick.bind(this)}>
                        Clean
                    </button>
                </div>
                <hr/>
                <Board className="" isPlaying={this.state.isPlaying} ref={instance => {
                    this.board = instance;
                }}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>
    , document.querySelector('.container'));
