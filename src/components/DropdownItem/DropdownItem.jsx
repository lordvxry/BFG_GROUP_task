import React from 'react';
import "./dropdownItem.css"

const DropdownItem = (props) => {
    const {
        view, owner: {
            display_name,
            reputation
        },
        active,
    } = props

    return (
        <div>
            {active ? (<div className="DropdownItem-container" >
                    <div>
                        Имя автора вопроса: {display_name}
                    </div>
                    <div>
                        Рейтинг автора вопроса: {reputation}
                    </div>
                    <div>
                        Количество просмотров: {view}
                    </div>
                </div>)
                :
                (<div/>)}
        </div>
    );
};

export default DropdownItem;