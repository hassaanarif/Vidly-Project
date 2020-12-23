import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {

    render() {
        return (
            <div>
                <button onClick={this.props.onReset} className='button' style={{backgroundColor: 'blue', borderColor: 'blue'}}>Reset</button>
                {this.props.array.map(iterator => (
                    <Counter
                        key={iterator.id}
                        onDelete={this.props.onDelete}
                        index={iterator}
                        onIncrement={this.props.onIncrement}
                        onDecrement={this.props.onDecrement} />
                ))}    
            </div>
        );
    }
}

export default Counters;