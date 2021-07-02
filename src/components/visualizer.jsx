import React from 'react';
import './visualizer.css';

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];

        for (let i = 0; i < 100; i++) {
            let element = randomIntegerRange(5, 100);
            array.push(element);
        }

        this.setState({ array });
    }

    render() {
        const { array } = this.state;

        return (
            <>
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx}>
                        {value}
                    </div>
                ))}
            </>
        )
    }
}

// Returns random integer in range from <= x <= to
function randomIntegerRange(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}