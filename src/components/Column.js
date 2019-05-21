import React, { Component } from 'react';
import Task from "./Task"
import ButtonCreateOffer from "./ButtonCreateOffer"
import FromCreateNewElement from "./FromCreateNewElement"

class Column extends Component {    
    state = {
        isFormHidden: true,
        newElementType: ''
    }

    render() {
        var { name, taskList } = this.props

        var tasks = taskList.map((task, index) =>
            <Task key={index} text={task} />
        )

        var head = (<div className="col-name">
            {name}
        </div>
        )
        var inner = (<div className="column-inner">
                        {tasks}
                    </div>
        )

        // тип эл-та, который должна создать форма
        // taskList[0] показывает, явл-ся ли колонка активной. но на самом деле надо отдельный атрибут в app
        var newElemType = taskList[0] ? 'task' : 'column'

        return (
            <div className='column' >
                {name ? head : ''}
                {taskList[0] ? inner : ''}
                <ButtonCreateOffer isBtnHidden={!this.state.isFormHidden} onClick={this.handleClick.bind(this, 'createOfferBtn')} newElemType = {newElemType} />
                <FromCreateNewElement isFormHidden={this.state.isFormHidden} onClick={this.handleClick.bind(this, 'rejectBtn')} newElemType = {newElemType}/>
            </div>
        )
    }


    handleClick = (btn) => {
        console.log(btn, ' pressed')
        this.setState({
            isFormHidden: !this.state.isFormHidden,
        })
    }

}

export default Column;