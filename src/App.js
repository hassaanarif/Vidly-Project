import React, { Component } from 'react';
import Counters from './Components/counters.jsx';
import NavBar from './Components/navigationBar';

class Navigation extends Component {
    state = {
        array: [
            {id: 1, value: 0},
            {id: 2, value: 0},
            {id: 3, value: 0},
            {id: 4, value: 0}
        ]
    }

    handleDelete = argument => {
        const array = this.state.array.filter(index => index.id !== argument.id);
        this.setState({array})
    };


    handleReset = () => {
        const array = this.state.array.map(index => {index.value = 0; return index});
        this.setState({array});
    }

    handleIncrement = argument => {
        let array = [...this.state.array];
        let index = array.indexOf(argument);
        array[index] = {...argument};
        array[index].value++;
        this.setState({array});
    }

    handleDecrement = (argument) => {
        let array = [...this.state.array];
        let index = array.indexOf(argument);
        array[index] = {...argument};
        array[index].value--;
        this.setState({array});

    }

    render() {
        return (
            <React.Fragment>
            <NavBar totalCounters={this.state.array.filter(index => index.value > 0).length} />
            <Counters
                array={this.state.array}
                onReset={this.handleReset}
                onDelete={this.handleDelete}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement} />
            </React.Fragment>
        );
    }
}
 
export default Navigation;