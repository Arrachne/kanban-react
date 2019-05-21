import React, { Component } from 'react';
import Column from "./Column"

class App extends Component {
    state = {
        data: [
            {
                name: "To do",
                tasks: ["Save the world"]
            },
            {
                name: "In progress",
                tasks: ["Learn js", "Learn React"]
            },
            {
                name: "",
                tasks: []
            }
        ]
    }

    render() {
        var columns = this.state.data.map((column, index) => 
            <Column key = {index} name={column.name} taskList={column.tasks} />
        )

        return (
            <div className='kanban' >
                {columns}
            </div>
        );
    }
}

export default App;
