import React, { Component } from 'react';

class ButtonCreateOffer extends Component {
    state = {
        isOpen: true,
    };

    render() {
        const { isBtnHidden, onClick, newElemType } = this.props;
        var hidden = isBtnHidden ? ' hidden' : '';
        var entityType = newElemType === 'task' ? 'карточку' : 'колонку';

        return (
            <div className={"add-element-offer " + hidden}>
                <button className={"add-element-offer-btn add-" + newElemType} onClick={onClick}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M14.1412 6.64122H8.35878V0.858779C8.35878 0.400763 7.95802 0 7.5 0C7.04198 0 6.64122 0.400763 6.64122 0.858779V6.64122H0.858779C0.400763 6.64122 0 7.04198 0 7.5C0 7.95801 0.400763 8.35878 0.858779 8.35878H6.64122V14.1412C6.64122 14.5992 7.04198 15 7.5 15C7.95802 15 8.35878 14.5992 8.35878 14.1412V8.35878H14.1412C14.5992 8.35878 15 7.95801 15 7.5C15 7.04198 14.5992 6.64122 14.1412 6.64122Z"
                            fill="#6B808C" />
                    </svg>
                    Добавить еще одну {entityType}
                </button>
            </div>
        );
    };
};

export default ButtonCreateOffer;