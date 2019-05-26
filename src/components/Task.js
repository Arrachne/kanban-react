import React, { PureComponent } from 'react';

class Task extends PureComponent {
    state = {
        isDragging: false
    }

    // передать родителю таск, который тянем
    handleDragStart = (event) => {
        this.props.onDragStart(event, this.props.taskIndex);
        this.setState({
            isDragging: true
        })
    };

    handleDragEnd = (event) => {
        this.setState({
            isDragging: false
        });
        this.props.onDragEnd(event, this.props.taskIndex);
    };

    render() {
        var text = this.props.text;
        var dragging = this.state.isDragging ? ' dragging' : '';
        var blankSpot = this.props.isBlankSpot ? ' blank-spot' : '';
        var blankSpotHeight = this.props.isBlankSpot ? this.props.blankSpotHeight : 'auto';
        return (
            <div className={'task' + dragging + blankSpot} style={{ height: blankSpotHeight }} draggable
                onDragStart={this.handleDragStart}
                onDragLeave={this.props.onDragLeave}
                onDragEnd={this.handleDragEnd}
            >
                {text}
            </div>
        );
    }
};

export default Task;