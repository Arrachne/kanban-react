import React, { PureComponent } from 'react';
import Column from "./Column"
import ButtonCreateOffer from "./ButtonCreateOffer";
import FromCreateNewElement from "./FormCreateNewElement";

class App extends PureComponent {
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
        isDragging: false,
        draggedTaskIndex: null,
        draggedColIndex: null,
        draggetTaskText: null,
    };

    render() {
        var columns = this.state.data.map((column, index) =>
            <Column
                key={index} colIndex={index} name={column.name} taskList={column.tasks}
                onClickAddTask={this.handleClickAddTask}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
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
        newData[columnKey].tasks.push(value)
        this.setState({
            data: newData,
        });
    };

    handleDragStart = (colIndex, event, taskIndex) => {
        // запомнить колонку и место, откуда достали таск, и его текст
        if (!this.state.isDragging) {
            var draggedItem = this.state.data[colIndex].tasks[taskIndex];
            this.setState({
                isDragging: true,
                draggetTaskText: draggedItem,
                draggedTaskIndex: taskIndex,
                draggedColIndex: colIndex,
            });
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/html", event.target);
            event.dataTransfer.setDragImage(event.target, event.target.offsetWidth / 2, event.target.offsetHeight / 2);
        };
    };


    handleDragOver = (colIndex, taskIndex) => {
        console.log('handleDragOver app', 'colIndex: ', colIndex, 'taskIndex: ', taskIndex);
        // пока тянем таск над местом, где он был, ничего не делать
        if ((this.state.draggedColIndex === colIndex) && (this.state.draggedTaskIndex === taskIndex)) {
            return;
        }

        var newData = [...this.state.data];

        // удалить элемент из колонки, из которой его достали
        newData[this.state.draggedColIndex].tasks.splice(this.state.draggedTaskIndex, 1);

        // добавить элемент в колонку, куда переместили
        newData[colIndex].tasks.splice(taskIndex, 0, this.state.draggetTaskText);

        this.setState({
            data: newData,
        });
    };


    // ПЕРЕДАТЬ В ТАСК 
    handleDragEnd = () => {
        if (this.state.isDragging) {
            this.setState({
                isDragging: false,
                draggetTaskText: null,
                draggedTaskIndex: null,
                draggedColIndex: null,
            });
        }
    };

}

export default App;
