import React from 'react';
import Task from "./Task" 
import ButtonCreateOffer from "./ButtonCreateOffer" 
import FromCreateNewElement from "./FromCreateNewElement"

function Column() {
    return (
        <div className='column'>
            <div className="col-name">
                TO DO
            </div>
            <div className="column-inner">
                <Task text='1'/>
                <Task text='2'/>
                <Task text='3'/>
            </div>
            <ButtonCreateOffer />
            <FromCreateNewElement />
        </div>
    );
}

export default Column;