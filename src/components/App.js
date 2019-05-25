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
        draggedTaskText: null,
        blankSpotCol: null,
        blankSpotIndex: null,
        blankSpotHeight: null,
    };

    render() {
        var columns = this.state.data.map((column, index) =>
            <Column
                key={index} colIndex={index} name={column.name} taskList={column.tasks}
                isBlankSpotHere={index == this.state.blankSpotCol}
                blankSpotId={this.state.blankSpotIndex}
                blankSpotHeight={this.state.blankSpotHeight}
                onClickAddTask={this.handleClickAddTask}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDragEnd={this.handleDragEnd}
            />
        );

        return (
            <div className='kanban' >
                {columns}
                <div className='column-style'>
                    <ButtonCreateOffer isBtnHidden={!this.state.isFormHidden} onClick={this.handleClickOffer} newElemType={this.state.newElemType} />
                    <FromCreateNewElement isFormHidden={this.state.isFormHidden} onClickAdd={this.handleClickAddColumn} onClickReject={this.handleClickOffer} newElemType={this.state.newElemType} />
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
        var newData = [...this.state.data, { name: value, tasks: [] }];
        this.setState({
            data: newData,
            isFormHidden: true,
        });
    };

    // добавить данные о новом таске в нужную колонку
    handleClickAddTask = (columnKey, value) => {
        var newData = [...this.state.data];
        newData[columnKey].tasks.push(value);
        this.setState({
            data: newData,
        });
    };

    handleDragStart = (colIndex, event, taskIndex) => {
        // текст таска
        var draggedTaskText = this.state.data[colIndex].tasks[taskIndex];
        // вычислить высоту таска
        var marginTop = Number(window.getComputedStyle(event.target).getPropertyValue('margin-top').replace(/\D/g, ''));
        var blankSpotHeight = event.target.offsetHeight - 2 * marginTop;

        // запомнить колонку и место, откуда достали таск, его текст и высоту
        this.setState({
            draggedTaskText: draggedTaskText,
            draggedTaskIndex: taskIndex,
            draggedColIndex: colIndex,
            blankSpotHeight: blankSpotHeight,
        });

        // назначить эффект move для Chrome и Mozilla
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", event.target);
        event.dataTransfer.setDragImage(event.target, event.target.offsetWidth / 2, event.target.offsetHeight / 2);
    };

    handleDragOver = (colIndex, event) => {
        // целевой inner колонки
        var NodesUnderCursor = document.elementsFromPoint(event.pageX, event.pageY);
        var targetCol = NodesUnderCursor.find((elem) => elem.classList.contains("column"));
        var targetInnerCol = targetCol.querySelector('.column-inner');
        // где должен появиться пустой контейнер
        var blankSpotIndex = this.getBlankSpotIndex(targetInnerCol, event.pageY);

        // пока тянем таск над местом, где он был до этого, или откуда достали, ничего не делать
        if (((this.state.blankSpotCol === colIndex) && (this.state.blankSpotIndex === blankSpotIndex))
            || ((this.state.draggedColIndex === colIndex) && (this.state.draggedTaskIndex === blankSpotIndex))) {
            return;
        };

        var newData = [...this.state.data];
        // удалить старый пустой контейнер
        if (this.state.blankSpotCol != null) {
            newData[this.state.blankSpotCol].tasks.splice(this.state.blankSpotIndex, 1);
        };

        // вставить пустой контейнер на месте курсора        
        var column = newData[colIndex].tasks;
        column.splice(blankSpotIndex, 0, '');
        newData[colIndex].tasks = column;

        this.setState({
            data: newData,
            blankSpotCol: colIndex,
            blankSpotIndex: blankSpotIndex,
        });
    };

    handleDragLeave = () => {
        // удалить старый пустой контейнер
        if (this.state.blankSpotCol != null) {
            var newData = [...this.state.data];
            newData[this.state.blankSpotCol].tasks.splice(this.state.blankSpotIndex, 1);

            this.setState({
                data: newData,
                blankSpotCol: null,
                blankSpotIndex: null,
            });
        };
    };

    handleDragEnd = () => {
        // удалить старый пустой контейнер и вставить вместо него таск
        // если пустого контейнера нет, значит таск останется там, откуда его достали
        if (this.state.blankSpotCol != null) {
            var newData = [...this.state.data];
            var taskOldIndex = this.state.blankSpotIndex < this.state.draggedTaskIndex ? this.state.draggedTaskIndex + 1 : this.state.draggedTaskIndex;
            newData[this.state.blankSpotCol].tasks.splice(this.state.blankSpotIndex, 1, this.state.draggedTaskText);
            newData[this.state.draggedColIndex].tasks.splice(taskOldIndex, 1);

            // очистить данные о перетаскивании
            this.setState({
                data: newData,
                draggedTaskText: null,
                draggedTaskIndex: null,
                draggedColIndex: null,
                blankSpotCol: null,
                blankSpotIndex: null,
                blankSpotHeight: null,
            });
        };
    };

    getBlankSpotIndex = (inner, y) => {
        var a = Array.from(inner.children);
        var nextTaskIndex = a.findIndex((elem) => {
            var elemY = elem.offsetTop + elem.offsetHeight / 2;
            return elemY >= y;
        });
        return nextTaskIndex == -1 ? a.length - 1 : nextTaskIndex;
    };

}

export default App;
