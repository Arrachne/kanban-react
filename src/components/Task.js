import React, { Component } from 'react';

class Task extends Component {

    // передать содержимое textarea родителю и очистить его
    handleDragStart = (event) => {
        this.props.onDragStart(event, this.props.taskIndex);
    }

    render() {
        var text = this.props.text;
        return (
            <div className='task' draggable onDragStart={this.handleDragStart}>
                {text}
            </div>
        );
    }
};

export default Task;