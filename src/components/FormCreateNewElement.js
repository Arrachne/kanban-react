import React, { Component } from 'react';


class FromCreateNewElement extends Component {
    state = {
        rowsCount: 2,
        value: ''
    };

    // обновлять содержимое textarea при вводе с клавиатуры
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    // передать содержимое textarea родителю и очистить его
    handleConfirmClick = () => {
        this.props.onClickAdd(this.state.value);
        this.setState({
            value: ''
        });
    }

    // скрыть форму и очистить содержимое textarea
    handleRejectClick = () => {
        this.props.onClickReject();
        this.setState({
            value: ''
        });
    };

    handleEnterKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.handleConfirmClick();
          }
    };

    render() {
        const { isFormHidden, newElemType } = this.props;
        var hidden = isFormHidden ? ' hidden' : '';
        var entityType = newElemType === 'task' ? 'карточку' : 'колонку';
        var entityTypeGenitive = newElemType === 'task' ? 'карточки' : 'колонки';
        var rowsCount = newElemType === 'task' ? 2 : 1;


        return (
            <div className={"add-element " + hidden}>
                <div className="new-element">
                    <textarea className="elementName" name="element-name" onKeyUp = {this.handleEnterKeyUp} rows={rowsCount} placeholder={'Введите название ' + entityTypeGenitive}
                        value={this.state.value} onChange={this.handleChange}>
                    </textarea>
                </div>

                <div className="buttons ">
                    <button className="add-element-confirm add-task-confirm" onClick={this.handleConfirmClick}>Добавить {entityType}</button>
                    <button className="add-element-reject" onClick={this.handleRejectClick}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M7.5 6.71875L14.2188 0L15 0.78125L8.28125 7.5L15 14.2188L14.2188 15L7.5 8.28125L0.78125 15L0 14.2188L6.71875 7.5L0 0.78125L0.78125 0L7.5 6.71875Z"
                                fill="#6B808C" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

}

export default FromCreateNewElement;