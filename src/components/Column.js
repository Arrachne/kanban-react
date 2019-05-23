import React, { PureComponent } from 'react';
import Task from "./Task";
import ButtonCreateOffer from "./ButtonCreateOffer";
import FromCreateNewElement from "./FormCreateNewElement";

class Column extends PureComponent {
    state = {
        isFormHidden: true,
        newElemType: 'task'
    };

    // передать содержимое value родителю и скрыть форму для ввода
    handleClickAddTask = (value) => {
        this.props.onClickAddTask(this.props.colIndex, value);
        this.setState({
            isFormHidden: true,
        });
    };

    // передать id таска и id колонки, из которой начали двигать
    handleDragStart = (event, id) => {
        this.props.onDragStart(this.props.colIndex, event, id);
    };

    // передать id таска и id колонки, из которой начали двигать
    handleDragOver = (id) => {
        console.log('handleDragOver col', 'this.props.colIndex: ', this.props.colIndex, 'id: ', id);
        this.props.onDragOver(this.props.colIndex, id);
    };

    // передать id таска и id колонки, из которой начали двигать
    handleDragEnd = (event, id) => {
        console.log('handleDragEnd col', 'event: ', event, 'id: ', id);
        this.props.onDragEnd(event, id);
    };

    render() {
        var { name, taskList } = this.props;

        var tasks = taskList.map((task, index) =>
            <Task key={index} taskIndex={index} text={task} onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnd={this.handleDragEnd} />
        );

        return (
            <div className='column column-style' >
                <div className="col-name">
                    {name}
                </div>
                <div className="column-inner">
                    {tasks}
                </div>
                <ButtonCreateOffer isBtnHidden={!this.state.isFormHidden} onClick={this.handleClickOffer.bind(this)} newElemType={this.state.newElemType} />
                <FromCreateNewElement
                    isFormHidden={this.state.isFormHidden}
                    onClickAdd={this.handleClickAddTask}
                    onClickReject={this.handleClickOffer.bind(this)}
                    newElemType={this.state.newElemType}
                />
            </div>
        );
    };


    handleClickOffer = () => {
        this.setState({
            isFormHidden: !this.state.isFormHidden,
        });
    };

}

export default Column;