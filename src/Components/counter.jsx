import React, { Component } from 'react';


class Counter extends Component {
    render() {
        return (
            <div>
                <span className={this.setAttribute()}>{this.formatCount()}</span>

                <button 
                className="button" 
                onClick={() => this.props.onIncrement(this.props.index)} >
                +
                </button>

                <button 
                className="button" 
                onClick={() => this.props.onDecrement(this.props.index)} 
                disabled={this.props.index.value === 0 ? 'disabled' : ''} >
                -
                </button>

                <button 
                className='deleteButton' 
                onClick={() => this.props.onDelete(this.props.index)} >
                Delete
                </button>
            </div>
        );
    }


    setAttribute = () => {
        return this.props.index.value === 0 ? 'zeroCounter' : 'counter'; 
    }



    formatCount = () => {
        return this.props.index.value === 0 ? 'Zero' : this.props.index.value;
    }
}
 
export default Counter;