import React, {Component} from 'react';


class FromCreateNewElement extends Component {
    // добавить  hidden к add-element
    state = {
        rowsCount : 2,
        entityTypeGenitive : 'карточки'
    }

    render(props) {
        const { isFormHidden, onClick } = this.props
        var hidden = isFormHidden ? ' hidden' : ''
        return (
            <div className={"add-element " + hidden}>
                <div className="new-element">
                    <textarea className="elementName" name="element-name" rows={this.state.rowsCount} placeholder={'Введите название ' + this.state.entityTypeGenitive}></textarea>
                </div>
                
                <div className="buttons ">
					<button className="add-element-confirm add-task-confirm">Добавить карточку</button>
					<button className="add-element-reject" onClick = {onClick}>
						<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd"
								d="M7.5 6.71875L14.2188 0L15 0.78125L8.28125 7.5L15 14.2188L14.2188 15L7.5 8.28125L0.78125 15L0 14.2188L6.71875 7.5L0 0.78125L0.78125 0L7.5 6.71875Z"
								fill="#6B808C" />
						</svg>
					</button>
				</div>
            </div>
        )
    }
}

export default FromCreateNewElement;