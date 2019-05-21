import React, {Component} from 'react';
import Buttons from "./Buttons"


class FromCreateNewElement extends Component {
    // добавить  hidden к add-element
    state = {
        rowsCount : 2,
        entityTypeGenitive : 'карточки'
    }

    render(props) {
        return (
            <div className="add-element">
                <div class="new-element">
                    <textarea class="elementName" name="element-name" rows={this.state.rowsCount} placeholder={'Введите название ' + this.state.entityTypeGenitive}></textarea>
                </div>
                <Buttons />
            </div>
        )
    }
}

export default FromCreateNewElement;