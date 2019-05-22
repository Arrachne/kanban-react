import React, { Component } from 'react';
import Column from "./Column"
import ButtonCreateOffer from "./ButtonCreateOffer";
import FromCreateNewElement from "./FormCreateNewElement";

class App extends Component {
    state = {
        data: [
            {
                name: "To do",
                tasks: ["Take over the world"]
            },
            {
                name: "In progress",
                tasks: ["Learn JS", "Learn React"]
            }
        ],
        isFormHidden: true,
        newElemType: 'column',
        draggedTaskIndex: null,
        draggedColIndex: null,
    };

    render() {
        var columns = this.state.data.map((column, index) =>
            <Column
                key={index} colIndex={index} name={column.name} taskList={column.tasks}
                onClickAddTask={this.handleClickAddTask.bind(this)}
                onDragStart={this.handleDragStart.bind(this)}
            />
        );

        return (
            <div className='kanban' >
                {columns}
                <div className='column-style'>
                    <ButtonCreateOffer isBtnHidden={!this.state.isFormHidden} onClick={this.handleClickOffer.bind(this)} newElemType={this.state.newElemType} />
                    <FromCreateNewElement isFormHidden={this.state.isFormHidden} onClickAdd={this.handleClickAddColumn.bind(this)} onClickReject={this.handleClickOffer.bind(this, 'rejectBtn')} newElemType={this.state.newElemType} />
                </div>
            </div>
        );
    };

    // открыть / скрыть форму для ввода названия элемента
    handleClickOffer = () => {
        this.setState({
            isFormHidden: !this.state.isFormHidden,
        });
    };

    // добавить данные о новой колонке
    handleClickAddColumn = (value) => {
        var newData = this.state.data.slice();
        newData.push({ name: value, tasks: [] })
        this.setState({
            data: newData,
            isFormHidden: true,
        });
    };

    // добавить данные о новом таске в нужную колонку
    handleClickAddTask = (columnKey, value) => {
        var newData = this.state.data.slice();
        newData[columnKey].tasks.push(value)
        this.setState({
            data: newData,
        });
    };

    handleDragStart = (colIndex, event, taskIndex) => {
        this.draggedItem = this.state.data[colIndex].tasks[taskIndex];

        this.setState({
            draggedTaskIndex: taskIndex,
            draggedColIndex: colIndex,
        });
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", event.target);
        event.dataTransfer.setDragImage(event.target, event.target.offsetWidth / 2, event.target.offsetHeight / 2);
    };


    // ПЕРЕДАТЬ В ТАСК
    handleDragOver = (colIndex, taskIndex) => {
        // if the item is dragged over itself, ignore
        if ((this.state.draggedColIndex === colIndex) && (this.state.draggedTaskIndex === taskIndex)) {
            return;
        }

        // filter out the currently dragged item
        var newData = this.state.data.slice();

        // удалить элемент из колонки, из которой его достали
        this.state.newData[this.state.draggedColIndex].tasks.splice(taskIndex, 1);

        // добавить элемент в колонку, куда переместили
        this.state.newData[colIndex].tasks.splice(taskIndex, 0, this.draggedItem);

        this.setState({
            data: newData,
        });
    };

}

export default App;
