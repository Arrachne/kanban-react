import React, { PureComponent } from 'react';

class Task extends PureComponent {

    // передать таск, который тянем
    handleDragStart = (event) => {
        this.props.onDragStart(event, this.props.taskIndex);
    };

    // передать таск, над которым тянем
    handleDragOver = () => {
        this.props.onDragStart(this.props.taskIndex);
    };

    render() {
        var text = this.props.text;
        return (
            <div className='task' draggable onDragStart={this.handleDragStart} onDragOver = {this.handleDragOver} onDragEnd = {this.props.onDragEnd}>
                {text}
            </div>
        );
    }
};

export default Task;