import React, { PureComponent } from 'react';

class Task extends PureComponent {
    state = {
        isDragging: false
    }


    // передать таск, который тянем
    handleDragStart = (event) => {
        this.props.onDragStart(event, this.props.taskIndex);
        this.setState({
            isDragging: true
        })
    };

    // передать таск, над которым тянем
    handleDragOver = () => {
        this.props.onDragOver(this.props.taskIndex);
    };

    handleDragEnd = (event) => {
        this.setState({
            isDragging: false
        });
        this.props.onDragEnd(event, this.props.taskIndex);
    };


    render() {
        var text = this.props.text;
        var dragging = this.state.isDragging ? 'dragging' : '';
        return (
            <div className={'task ' + dragging} draggable onDragStart={this.handleDragStart} onDragOver = {this.handleDragOver} onDrop = {this.handleDragEnd}>
                {text}
            </div>
        );
    }
};

export default Task;